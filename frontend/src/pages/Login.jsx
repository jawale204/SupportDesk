import { FaSignInAlt } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
function Login() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const { email, password } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please log in to get support</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              className="form-control"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              className="form-control"
              placeholder="Enter password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Login user
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
