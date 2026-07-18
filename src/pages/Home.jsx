import {} from "react";

function Home() {
  return (
    <main>
      <section id="hero">
        <div>
          <h1>Book local experiences, by the hour.</h1>
          <p>
            Yoga classes, photo studios, coworking desks, cooking sessions —
            find a slot that fits your schedule.
          </p>

          <form action="listings.html" method="get" id="search-form">
            <fieldset>
              <legend>Search listings</legend>

              <label for="search-query">What are you looking for?</label>
              <input
                type="text"
                id="search-query"
                name="q"
                placeholder="e.g. yoga studio, photography"
              />

              <label for="search-location">Location</label>
              <input
                type="text"
                id="search-location"
                name="location"
                placeholder="City or neighborhood"
              />

              <label for="search-category">Category</label>
              <select id="search-category" name="category">
                <option value="">All categories</option>
                <option value="fitness">Fitness & Wellness</option>
                <option value="creative">Photography & Creative</option>
                <option value="workspace">Coworking & Workspace</option>
                <option value="learning">Classes & Tutoring</option>
              </select>

              <button type="submit">Search</button>
            </fieldset>
          </form>
        </div>

        <div class="schedule-strip" aria-hidden="true">
          <h2>Today · Downtown</h2>
          <ul>
            <li>
              <span class="time">6:00</span>
              <span class="block open">Open</span>
            </li>
            <li>
              <span class="time">7:00</span>
              <span class="block available">Sunrise Yoga</span>
            </li>
            <li>
              <span class="time">8:00</span>
              <span class="block booked">Booked</span>
            </li>
            <li>
              <span class="time">9:00</span>
              <span class="block available">Photo Studio</span>
            </li>
            <li>
              <span class="time">10:00</span>
              <span class="block open">Open</span>
            </li>
            <li>
              <span class="time">11:00</span>
              <span class="block available">Coworking Desk</span>
            </li>
            <li>
              <span class="time">12:00</span>
              <span class="block booked">Booked</span>
            </li>
            <li>
              <span class="time">1:00</span>
              <span class="block open">Open</span>
            </li>
            <li>
              <span class="time">2:00</span>
              <span class="block available">Cooking Class</span>
            </li>
          </ul>
        </div>
      </section>

      <section id="categories" aria-labelledby="categories-heading">
        <h2 id="categories-heading">Browse by category</h2>
        <ul>
          <li>
            <a href="listings.html?category=fitness">Fitness & Wellness</a>
          </li>
          <li>
            <a href="listings.html?category=creative">Photography & Creative</a>
          </li>
          <li>
            <a href="listings.html?category=workspace">Coworking & Workspace</a>
          </li>
          <li>
            <a href="listings.html?category=learning">Classes & Tutoring</a>
          </li>
        </ul>
      </section>

      <section id="featured-listings" aria-labelledby="featured-heading">
        <h2 id="featured-heading">Featured this week</h2>

        <article class="listing-card">
          <img
            src="https://picsum.photos/seed/yoga1/400/250"
            alt="Sunlit yoga studio with wooden floors"
          />
          <h3>
            <a href="listing-detail.html?id=1">Sunrise Yoga Studio</a>
          </h3>
          <p class="listing-meta">Fitness & Wellness · Downtown</p>
          <p class="listing-price">From $18 / session</p>
        </article>

        <article class="listing-card">
          <img
            src="https://picsum.photos/seed/studio1/400/250"
            alt="Photography studio with softbox lighting"
          />
          <h3>
            <a href="listing-detail.html?id=2">Lightbox Photo Studio</a>
          </h3>
          <p class="listing-meta">Photography & Creative · Riverside</p>
          <p class="listing-price">From $45 / hour</p>
        </article>

        <article class="listing-card">
          <img
            src="https://picsum.photos/seed/desk1/400/250"
            alt="Modern coworking desk near a window"
          />
          <h3>
            <a href="listing-detail.html?id=3">Northside Coworking Desk</a>
          </h3>
          <p class="listing-meta">Coworking & Workspace · Northside</p>
          <p class="listing-price">From $10 / hour</p>
        </article>

        <p>
          <a href="listings.html">See all listings →</a>
        </p>
      </section>

      <section id="how-it-works" aria-labelledby="how-heading">
        <h2 id="how-heading">How SlotHive works</h2>
        <ol>
          <li>
            <h3>Search</h3>
            <p>
              Find a space or experience near you, filtered by category and
              availability.
            </p>
          </li>
          <li>
            <h3>Book a slot</h3>
            <p>
              Pick an open time slot and reserve it instantly — no
              back-and-forth messaging.
            </p>
          </li>
          <li>
            <h3>Show up</h3>
            <p>
              Get a confirmation with all the details. Payment is handled
              securely online.
            </p>
          </li>
        </ol>
      </section>

      <section id="host-cta" aria-labelledby="host-cta-heading">
        <h2 id="host-cta-heading">Have a space or skill to share?</h2>
        <p>
          List your studio, desk, or class on SlotHive and start taking bookings
          today.
        </p>
        <a href="signup.html?role=host">Start hosting</a>
      </section>
    </main>
  );
}

export default Home;
