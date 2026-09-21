import { useEffect, useState } from "react"
import { api } from "../../services/api"

function Feedback() {
  const [feedbackList, setFeedbackList] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchFeedback = async () => {
    try {
      const result = await api.get("/admin/feedback")

      if (result.success) {
        setFeedbackList(result.feedback || [])
      } else {
        console.error(result.message)
      }
    } catch (error) {
      console.error("Fetch feedback error:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFeedback()
  }, [])

  if (loading) {
    return (
      <div className="admin-feedback-page">
        <div className="admin-feedback-header">
          <h1>Customer Feedback</h1>
          <p>Loading feedback...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-feedback-page">

      <div className="admin-feedback-header">
        <h1>Customer Feedback</h1>
        <p>View feedback submitted by users</p>
      </div>

      <div className="admin-feedback-list">

        {feedbackList.length === 0 ? (

          <div className="admin-feedback-card">
            <h3>No Feedback Yet</h3>
            <p>No feedback has been submitted by users.</p>
          </div>

        ) : (

          feedbackList.map((feedback) => (

            <div
              className="admin-feedback-card"
              key={feedback._id}
            >

              <div className="admin-feedback-top">

                <h3>
                  {feedback.userId?.name || "User"}
                </h3>

                <span className="admin-feedback-date">
                  {new Date(feedback.createdAt).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </span>

              </div>

              <div className="admin-feedback-rating">
                {"★".repeat(feedback.rating)}
                {"☆".repeat(5 - feedback.rating)}
              </div>

              <p>
                {feedback.comment}
              </p>

            </div>

          ))

        )}

      </div>

    </div>
  )
}

export default Feedback