import { FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { register, login, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const navigate = useNavigate();
  const { user, isLoading, isSuccess, message, isError } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      navigate("/");
    }

    dispatch(reset());
    return () => {};
  }, [isError, message, dispatch, isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("passwords do not match");
    } else {
      const user = {
        name,
        email,
        password,
      };
      dispatch(register(user));
    }
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
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              className="form-control"
              placeholder="Enter your name"
              onChange={handleChange}
              required
              maxLength={10}
              minLength={5}
            />
          </div>
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
              maxLength={12}
              minLength={6}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password2"
              name="password2"
              value={password2}
              className="form-control"
              placeholder="Confirm password"
              onChange={handleChange}
              required
              maxLength={12}
              minLength={6}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Create user
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
