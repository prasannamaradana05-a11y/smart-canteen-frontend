import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { api } from "../../services/api"

function Feedback() {
  const { user } = useAuth()
  const location = useLocation()

  const order = location.state?.order

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (rating === 0) {
      alert("Please select a rating.")
      return
    }

    if (!user?.id) {
      alert("Please login before submitting feedback.")
      return
    }

    if (!order?._id) {
      alert("Order information is missing.")
      return
    }

    try {
      setSubmitting(true)

      const result = await api.post("/feedback", {
        userId: user.id,
        orderId: order._id,
        rating: rating,
        comment: comment,
      })

      if (!result.success) {
        alert(result.message || "Failed to submit feedback.")
        return
      }

      setSubmitted(true)
      setComment("")
      setRating(0)

    } catch (error) {
      console.error("Submit feedback error:", error)
      alert("Unable to connect to the backend.")
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="feedback-page">
        <div className="feedback-card feedback-success-card">
          <div className="feedback-success-icon">✓</div>

          <h1>Thank You!</h1>

          <p>
            Your feedback has been submitted successfully.
          </p>

          <p className="feedback-success-subtext">
            Your feedback helps us improve the Smart Canteen experience.
          </p>

          <div className="feedback-success-actions">
            <Link
              to="/orders"
              className="feedback-btn primary-feedback-btn"
            >
              My Orders
            </Link>

            <Link
              to="/menu"
              className="feedback-btn secondary-feedback-btn"
            >
              Back to Menu
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="feedback-page">

      <div className="feedback-header">
        <h1>Feedback</h1>
        <p>We would love to hear about your canteen experience</p>
      </div>

      <div className="feedback-card">

        <form onSubmit={handleSubmit}>

          <div className="feedback-section">
            <h2>How was your experience?</h2>

            <div className="rating-container">

              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className={`rating-star ${
                    rating >= star ? "selected" : ""
                  }`}
                  onClick={() => setRating(star)}
                >
                  ★
                </button>
              ))}

            </div>

            <p className="rating-text">
              {rating === 0
                ? "Select a rating"
                : `${rating} out of 5`}
            </p>
          </div>

          <div className="feedback-section">

            <label htmlFor="comment">
              Your Feedback
            </label>

            <textarea
              id="comment"
              placeholder="Tell us what you liked or what we can improve..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="6"
              required
              minLength="5"
              maxLength="500"
            />

          </div>

          <button
            type="submit"
            className="feedback-submit-btn"
            disabled={submitting}
          >
            {submitting
              ? "Submitting Feedback..."
              : "Submit Feedback"}
          </button>

        </form>

      </div>

    </div>
  )
}

export default Feedback