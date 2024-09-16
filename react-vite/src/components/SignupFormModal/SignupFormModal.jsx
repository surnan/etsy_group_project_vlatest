import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous errors
    setErrors({});

    // Check for password length
    if (password.length < 6) {
      return setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 6 characters long",
      }));
    }

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Confirm Password field must be the same as the Password field",
      }));
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      {errors.server && <p className="error-message">{errors.server}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="signup-items">
          <label>
            Email
            <input
              type="text"
              className="signup-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="signup-items">
          <label>
            Username
            <input
              type="text"
              className="signup-box"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          {errors.username && <p className="error-message">{errors.username}</p>}
        </div>
        <div className="signup-items">
          <label>
            Password
            <input
              type="password"
              className="signup-box"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <div className="signup-items">
          <label>
            Confirm Password
            <input
              type="password"
              className="signup-box"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword}</p>
          )}
        </div>
        <button type="submit" id="signup-button">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;
