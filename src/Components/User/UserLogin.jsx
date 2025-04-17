import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import userService from "../../service/userService";

export default function LoginPage({ setLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState(""); // ⬅️ For success or error message
  const [messageType, setMessageType] = useState(""); // success / danger
  const navigate = useNavigate();

  function setField(field, value) {
    setForm({ ...form, [field]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);

    const { email, password } = form;

    userService.userLogin({ email, password })
      .then((response) => {
        if (response.data !== "Login Failed Invalid Credentials") {
          setLogin(true);
          localStorage.setItem("role", response.data); // Save role if needed
          setMessageType("success");
          setMessage("Login Successful as " + response.data);
          setTimeout(() => navigate("/dashboard"), 1500); // Delay redirect for user to see message
        } else {
          setMessageType("danger");
          setMessage("Invalid credentials");
        }
      })
      .catch((error) => {
        console.error(error);
        setMessageType("danger");
        setMessage("An error occurred during login");
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form
        onSubmit={handleSubmit}
        noValidate
        className={`p-5 rounded shadow bg-white w-100`}
        style={{ maxWidth: "450px", border: "1px solid #ddd" }}
      >
        <h2 className="text-center mb-4 text-dark">Login</h2>

        {message && (
          <div className={`alert alert-${messageType}`} role="alert">
            {message}
          </div>
        )}

        <div className="mb-3">
          <input
            type="email"
            className={`form-control ${validated && !form.email ? "is-invalid" : ""}`}
            placeholder="Email"
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            required
          />
          <div className="invalid-feedback">Email is required</div>
        </div>

        <div className="mb-3">
          <input
            type="password"
            className={`form-control ${validated && !form.password ? "is-invalid" : ""}`}
            placeholder="Password"
            value={form.password}
            onChange={(e) => setField("password", e.target.value)}
            required
          />
          <div className="invalid-feedback">Password is required</div>
        </div>

        <button type="submit" className="btn btn-danger w-100">
          Login
        </button>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <label>
            <input type="checkbox" className="me-2" />
            Remember Me
          </label>
          <NavLink to="/forgotpassword" className="text-primary">
            Forgot Password?
          </NavLink>
        </div>

        <p className="text-center mt-3">
          Don't have an account?{" "}
          <NavLink to="/userregister" className="text-primary">
            Register
          </NavLink>
        </p>
      </form>
    </div>
  );
}
