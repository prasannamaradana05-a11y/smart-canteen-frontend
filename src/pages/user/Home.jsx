import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="home-page">

      {/* =========================
          HERO SECTION
      ========================= */}
      <section className="home-hero">

        <div className="hero-content">

          <span className="hero-badge">
            🍽️ Smart • Fast • Convenient
          </span>

          <h1>
            Good Food,
            <br />
            <span>Better Mood.</span>
          </h1>

          <p>
            Order your favorite meals from the canteen,
            skip the queue, and enjoy a faster dining experience.
          </p>

          <div className="hero-buttons">

            <Link to="/menu" className="hero-menu-btn">
              Explore Menu →
            </Link>

            <Link to="/orders" className="hero-orders-btn">
              Track Order
            </Link>

          </div>

          <div className="hero-trust">
            <span>✓ Fresh Food</span>
            <span>✓ Easy Ordering</span>
            <span>✓ No Long Queues</span>
          </div>

        </div>

        {/* Realistic Food Image */}

        <div className="hero-food">

          <div className="hero-image-wrapper">

            <img
              src="/images/masala-dosa.jpg"
              alt="Fresh Masala Dosa"
              className="hero-food-image"
            />

          </div>

          <div className="floating-card card-one">
            <span className="floating-icon">⭐</span>
            <div>
              <strong>4.8 Rating</strong>
              <small>Loved by students</small>
            </div>
          </div>

          <div className="floating-card card-two">
            <span className="floating-icon">⚡</span>
            <div>
              <strong>Quick Ordering</strong>
              <small>Skip the queue</small>
            </div>
          </div>

        </div>

      </section>


      {/* =========================
          BENEFITS
      ========================= */}
      <section className="benefits-section">

        <div className="section-heading">
          <span className="section-label">WHY SMART CANTEEN?</span>

          <h2>
            Everything You Need,
            <br />
            <span>All in One Place.</span>
          </h2>

          <p>
            A simple and convenient way to order and track your
            favorite canteen meals.
          </p>
        </div>

        <div className="benefits-grid">

          <div className="benefit-card">
            <div className="benefit-icon">⚡</div>
            <h3>Fast Ordering</h3>
            <p>
              Order your food quickly without waiting in long queues.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">🛒</div>
            <h3>Easy Cart</h3>
            <p>
              Add your favorite food and manage quantities with ease.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">📍</div>
            <h3>Track Orders</h3>
            <p>
              Follow your order from preparation to completion.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">💳</div>
            <h3>Simple Checkout</h3>
            <p>
              Review your order and complete checkout easily.
            </p>
          </div>

        </div>

      </section>


      {/* =========================
          POPULAR FOOD
      ========================= */}
      <section className="popular-section">

        <div className="popular-heading">

          <div>
            <span className="section-label">POPULAR CHOICES</span>

            <h2>Our Popular Food</h2>

            <p>
              Some of the favorites from our canteen menu.
            </p>
          </div>

          <Link to="/menu" className="view-menu-link">
            View Full Menu →
          </Link>

        </div>

        <div className="popular-grid">

          <div className="popular-card">

            <img
              src="/images/masala-dosa.jpg"
              alt="Masala Dosa"
              className="popular-image"
            />

            <div className="popular-info">
              <div className="popular-title-row">
                <h3>Masala Dosa</h3>
                <span>⭐ 4.7</span>
              </div>

              <p>Crispy dosa served with delicious potato masala.</p>

              <div className="popular-bottom">
                <strong>₹60</strong>

                <Link to="/menu">
                  View →
                </Link>
              </div>
            </div>

          </div>


          <div className="popular-card">

            <img
              src="/images/veg-biryani.jpg"
              alt="Veg Biryani"
              className="popular-image"
            />

            <div className="popular-info">
              <div className="popular-title-row">
                <h3>Veg Biryani</h3>
                <span>⭐ 4.6</span>
              </div>

              <p>Flavorful rice cooked with fresh vegetables and spices.</p>

              <div className="popular-bottom">
                <strong>₹100</strong>

                <Link to="/menu">
                  View →
                </Link>
              </div>
            </div>

          </div>


          <div className="popular-card">

            <img
              src="/images/chicken-biryani.jpg"
              alt="Chicken Biryani"
              className="popular-image"
            />

            <div className="popular-info">
              <div className="popular-title-row">
                <h3>Chicken Biryani</h3>
                <span>⭐ 4.8</span>
              </div>

              <p>Rich and aromatic biryani made with tender chicken.</p>

              <div className="popular-bottom">
                <strong>₹140</strong>

                <Link to="/menu">
                  View →
                </Link>
              </div>
            </div>

          </div>


          <div className="popular-card">

            <img
              src="/images/french-fries.jpg"
              alt="French Fries"
              className="popular-image"
            />

            <div className="popular-info">
              <div className="popular-title-row">
                <h3>French Fries</h3>
                <span>⭐ 4.5</span>
              </div>

              <p>Crispy golden fries, perfect for a quick snack.</p>

              <div className="popular-bottom">
                <strong>₹60</strong>

                <Link to="/menu">
                  View →
                </Link>
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* =========================
          HOW IT WORKS
      ========================= */}
      <section className="how-section">

        <div className="section-heading">

          <span className="section-label">HOW IT WORKS</span>

          <h2>
            Order Food in
            <br />
            <span>4 Simple Steps.</span>
          </h2>

          <p>
            From choosing your meal to collecting it,
            everything is simple.
          </p>

        </div>

        <div className="steps-grid">

          <div className="step-card">
            <div className="step-number">01</div>
            <h3>Choose Food</h3>
            <p>
              Browse the menu and select your favorite food.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">02</div>
            <h3>Add to Cart</h3>
            <p>
              Select quantity and review your cart.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">03</div>
            <h3>Checkout</h3>
            <p>
              Review your order and place it easily.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">04</div>
            <h3>Track & Collect</h3>
            <p>
              Track your order and collect your food when ready.
            </p>
          </div>

        </div>

      </section>


      {/* =========================
          FINAL CTA
      ========================= */}
      <section className="home-cta">

        <div>
          <span className="section-label">READY TO ORDER?</span>

          <h2>
            Hungry? Your Favorite Food
            <br />
            Is Just a Few Clicks Away.
          </h2>

          <p>
            Skip the queue and enjoy a smarter canteen experience.
          </p>
        </div>

        <Link to="/menu" className="cta-btn">
          Order Now →
        </Link>

      </section>

    </div>
  )
}

export default Home