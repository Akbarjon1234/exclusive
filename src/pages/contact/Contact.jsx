import "./Contact.css";
import { useEffect, useState } from "react";
import { IoCallOutline } from "react-icons/io5";
import { FaRegEnvelope } from "react-icons/fa6";

// 🔐 Bot token va Chat ID (o‘zingiznikini qo‘ying)
const BOT_TOKEN = "8168298669:AAHWvbEq-8NaL1An6hvuF0Fs6bSc6ydbh4I";
const CHAT_ID = "8021902374";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = formData;

    // 🔔 Bo‘sh joylarni tekshiradi
    if (!name || !email || !phone || !message) {
      alert("Iltimos, barcha maydonlarni to‘ldiring.");
      return;
    }

    // 📩 Telegramga yuboriladigan matn
    const text = `
📝 <b>Yangi xabar:</b>
👤 Ismi: ${name}
📧 Email: ${email}
📞 Telefon: ${phone}
💬 Xabar: ${message}
`;

    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: "HTML",
        }),
      });

      alert("✅ Xabaringiz muvaffaqiyatli yuborildi!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Telegram xatolik:", error);
      alert("❌ Xabar yuborishda xatolik yuz berdi.");
    }
  };

  return (
    <div className="container contact">
      <div className="contact-connect">
        <div className="call">
          <div className="call-header">
            <div className="icon">
              <IoCallOutline />
            </div>
            <h3>Call To Us</h3>
          </div>
          <p>We are available 24/7, 7 days a week.</p>
          <a href="tel:1122">Phone: +8801611112222</a>
        </div>

        <div className="line"></div>

        <div className="write">
          <div className="write-header">
            <div className="icon">
              <FaRegEnvelope />
            </div>
            <h3>Write To Us</h3>
          </div>
          <p>Fill out our form and we will contact you within 24 hours.</p>
          <a href="mailto:customer@exclusive.com">
            Emails: customer@exclusive.com
          </a>
          <a href="mailto:support@exclusive.com">
            Emails: support@exclusive.com
          </a>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Your Name *"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email *"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone *"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <textarea
          name="message"
          id="message"
          placeholder="Your Message"
          className="message"
          value={formData.message}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
