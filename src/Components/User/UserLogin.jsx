import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

export default function LoginPage({ setLogin }) {
  const [form, setForm] = useState({ username: "", password: "", role: "user" });
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  function setField(field, value) {
    setForm({ ...form, [field]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);

    const { username, password, role } = form;

    // Simple hardcoded login logic
    if (username === "user" && password === "123" && role === "user") {
      setLogin(true);
      navigate("/user-dashboard");
    } else if (username === "hoteladmin" && password === "123" && role === "hoteladmin") {
      setLogin(true);
      navigate("/hoteladmin-dashboard");
    } else if (username === "admin" && password === "123" && role === "admin") {
      setLogin(true);
      navigate("/admin-dashboard");
    } else {
      alert("Invalid credentials or role");
    }
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

        <div className="mb-3">
          <input
            type="text"
            className={`form-control ${validated && !form.username ? "is-invalid" : ""}`}
            placeholder="Username"
            name="username"
            value={form.username}
            onChange={(e) => setField("username", e.target.value)}
            required
          />
          <div className="invalid-feedback">Username is required</div>
        </div>

        <div className="mb-3">
          <input
            type="password"
            className={`form-control ${validated && !form.password ? "is-invalid" : ""}`}
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={(e) => setField("password", e.target.value)}
            required
          />
          <div className="invalid-feedback">Password is required</div>
        </div>

        {/* Optional role selector */}
        {/* <div className="mb-3">
          <select
            className="form-select"
            value={form.role}
            onChange={(e) => setField("role", e.target.value)}
          >
            <option value="user">User</option>
            <option value="hoteladmin">Hotel Admin</option>
            <option value="admin">Admin</option>
          </select>
        </div> */}

        <button type="submit" className="btn btn-danger w-100">
          Login
        </button>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <label>
            <input type="checkbox" name="remember" className="me-2" />
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
