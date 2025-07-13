// src/pages/ResetPassword.jsx
import React, { useState } from "react";
import {
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth } from "../../fireBase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const handleReset = (e) => {
    e.preventDefault();

    if (!email) {
      toast.warn("Iltimos, email manzilini kiriting!", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success(
          "Agar bu email ro'yxatdan o'tgan bo‘lsa, parol tiklash havolasi yuborildi!",
          {
            position: "top-center",
            autoClose: 3000,
          }
        );
        setEmail("");
      })
      .catch((error) => {
        console.error("Reset error:", error);
        toast.error("Xatolik yuz berdi. Email noto‘g‘ri yoki mavjud emas.", {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };

  return (
    <section className="reset-password">
      <form onSubmit={handleReset} className="reset-form">
        <h2>Reset Password</h2>
        <p>Enter your registered email:</p>
        <div className="form-group">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="reset-btn">
          Send
        </button>
      </form>
      <ToastContainer />
    </section>
  );
};

export default ResetPassword;
