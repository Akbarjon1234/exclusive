import { useState, useEffect } from "react";
import "./MyProfile.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("userProfile")) || null;
    if (saved) {
      setFormData({
        ...saved,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setInitialData(saved);
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const isEmpty = (value) => !value || value.trim() === "";

  const handleCancel = (e) => {
    e.preventDefault();
    if (initialData) {
      setFormData({
        ...initialData,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      toast.info("O‘zgarishlar bekor qilindi", { position: "top-center" });
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    // Formani tekshirish
    if (
      isEmpty(formData.firstName) ||
      isEmpty(formData.lastName) ||
      isEmpty(formData.email) ||
      isEmpty(formData.address)
    ) {
      toast.error("Iltimos, barcha maydonlarni to‘ldiring!", {
        position: "top-center",
      });
      return;
    }

    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmNewPassword
    ) {
      toast.error("Yangi parollar mos emas!", { position: "top-center" });
      return;
    }

    const profileToSave = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      address: formData.address,
    };

    localStorage.setItem("userProfile", JSON.stringify(profileToSave));
    setInitialData(profileToSave);

    toast.success("Ma’lumotlaringiz saqlandi!", { position: "top-center" });

    setFormData((prev) => ({
      ...profileToSave,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    }));
  };

  return (
    <section className="myprofile">
      <ToastContainer />
      <form>
        <h3>Edit Your Profile</h3>
        <div className="form-container">
          {[
            { id: "firstName", label: "First Name" },
            { id: "lastName", label: "Last Name" },
            { id: "email", label: "Email" },
            { id: "address", label: "Address" },
          ].map((field) => (
            <div className="form-group" key={field.id}>
              <label htmlFor={field.id}>{field.label}</label>
              <input
                type={field.id === "email" ? "email" : "text"}
                id={field.id}
                value={formData[field.id]}
                onChange={handleChange}
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                required
              />
            </div>
          ))}

          <div className="form-group password-change">
            <label htmlFor="currentPassword">Password Changes</label>
            <input
              type="password"
              id="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Current Password"
            />
            <input
              type="password"
              id="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="New Password"
            />
            <input
              type="password"
              id="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              placeholder="Confirm New Password"
            />
          </div>
        </div>

        <div className="form-btns">
          <button className="cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button className="save" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </form>
    </section>
  );
};

export default MyProfile;
