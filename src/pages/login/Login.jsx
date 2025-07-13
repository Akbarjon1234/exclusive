import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../fireBase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      localStorage.setItem("user", JSON.stringify(user));

      toast.success(`Xush kelibsiz, ${user.email}!`, {
        position: "top-center",
        autoClose: 2500,
      });

      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (err) {
      toast.error("Login xatosi: Email yoki parol noto‘g‘ri.", {
        position: "top-center",
        autoClose: 3000,
      });
      console.error("Login error:", err);
    }
  };

  return (
    <section className="login">
      <div className="login-img">
        <img src="./src/assets/signup.png" alt="Login image" />
      </div>

      <form className="login-form" onSubmit={handleLogin}>
        <h2>Log in to Exclusive</h2>
        <p>Enter your details below</p>

        <div className="form-group">
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder=" " // <-- SHART!
          />
          <label htmlFor="email">Email or Phone Number</label>
        </div>

        <div className="form-group">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" "
            required
          />
          <label htmlFor="password">Password</label>

          <span
            className="toggle-eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="form-btns">
          <button className="login-btn" type="submit">
            Log in
          </button>
          <Link to="/reset-password" className="forgot-link">
            Forget Password?
          </Link>
        </div>

        <p className="signup-link">
          Don't you have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>

      {/* 🔔 ToastContainer ni formdan tashqariga joylashtiring */}
      <ToastContainer />
    </section>
  );
};

export default Login;
