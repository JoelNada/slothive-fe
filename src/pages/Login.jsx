import {} from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <main>
      <section id="auth-form">
        <h1>Log in to SlotHive</h1>

        <form action="dashboard.html" method="post" id="login-form">
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
            autoComplete="current-password"
          />

          <p>
            <Link to="#">Forgot your password?</Link>
          </p>

          <button type="submit">Log In</button>
        </form>

        <p>
          New to SlotHive? <Link href="signup.html">Create an account</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
