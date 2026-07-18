import {} from "react";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <main>
      <section id="auth-form">
        <h1>Create your SlotHive account</h1>

        <form action="dashboard.html" method="post" id="signup-form">
          <label for="full-name">Full name</label>
          <input
            type="text"
            id="full-name"
            name="full_name"
            required
            autoComplete="name"
          />

          <label for="email">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
          />

          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            autoComplete="new-password"
            minLength="8"
          />

          <label for="confirm-password">Confirm password</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm_password"
            required
            autoComplete="new-password"
            minLength="8"
          />

          <fieldset>
            <legend>I'm signing up as a...</legend>
            <input
              type="radio"
              id="role-customer"
              name="role"
              value="customer"
              checked
            />
            <label for="role-customer">
              Customer — I want to book experiences
            </label>

            <input type="radio" id="role-host" name="role" value="host" />
            <label for="role-host">
              Host — I want to list a space or class
            </label>
          </fieldset>

          <label for="terms">
            <input type="checkbox" id="terms" name="terms" required />I agree to
            the <a href="#">Terms of Service</a> and{" "}
            <a href="#">Privacy Policy</a>
          </label>

          <button type="submit">Create Account</button>
        </form>

        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </section>
    </main>
  );
}

export default Signup;
