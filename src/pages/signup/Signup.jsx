import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, provider, db } from "../../fireBase";
import signupImg from "/assets/signup.png";
import googleIcon from "/assets/icon-google.png";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👁‍🗨 iconlar

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    emailOrPhone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // 👁 toggle

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const isValidEmail = (str) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
  const isValidPhone = (str) => /^\+?\d{9,12}$/.test(str);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let emailToUse = formData.emailOrPhone.trim();

      if (!isValidEmail(emailToUse) && isValidPhone(emailToUse)) {
        emailToUse = emailToUse.replace(/\D/g, "") + "@phone.fake";
      } else if (!isValidEmail(emailToUse)) {
        alert("Iltimos, haqiqiy email yoki telefon raqam kiriting.");
        return;
      }

      const { user } = await createUserWithEmailAndPassword(
        auth,
        emailToUse,
        formData.password
      );

      await updateProfile(user, { displayName: formData.name });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: formData.name,
        email: emailToUse,
        role: "user",
        createdAt: new Date(),
      });

      navigate("/");
    } catch (error) {
      alert("Xatolik: " + error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName || "No name",
          email: user.email,
          role: "user",
          createdAt: new Date(),
        });
      }

      navigate("/");
    } catch (error) {
      alert("Google orqali kirishda xatolik: " + error.message);
    }
  };

  return (
    <section className="signup">
      <div className="signup-img">
        <img src={signupImg} alt="Sign Up" />
      </div>

      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create an account</h2>
        <p>Enter your details below</p>

        <div className="form-group">
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label htmlFor="name">Name</label>
        </div>

        <div className="form-group">
          <input
            type="text"
            id="emailOrPhone"
            value={formData.emailOrPhone}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label htmlFor="emailOrPhone">Email yoki telefon raqam</label>
        </div>

        <div className="form-group password-group">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label htmlFor="password">Password</label>

          <span
            className="password-toggle"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button className="create" type="submit">
          Create Account
        </button>

        <button
          type="button"
          className="google-btn"
          onClick={handleGoogleSignUp}
        >
          <img src={googleIcon} alt="Google icon" />
          <span>Sign up with Google</span>
        </button>

        <p className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </section>
  );
};

export default Signup;
