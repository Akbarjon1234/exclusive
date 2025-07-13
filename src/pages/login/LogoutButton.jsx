import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./LogOut.css"

const LogoutButton = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Tizimdan chiqdingiz!", {
      position: "top-center",
      autoClose: 2000,
    });
    setShowModal(false);
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <>
      <button className="logout-btn" onClick={() => setShowModal(true)}>
        Log out
      </button>

      {showModal && (
        <div className="modal-backdrop">
          <div className="logout-modal">
            <p>Haqiqatan ham tizimdan chiqmoqchimisiz?</p>
            <div className="modal-actions">
              <button className="confirm-btn" onClick={handleLogout}>
                Ha, chiqaman
              </button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Yo‘q, qolaman
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutButton;
