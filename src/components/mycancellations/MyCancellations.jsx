import "./MyCancellations.css";
import { useState, useEffect } from "react";

const BOT_TOKEN = "8168298669:AAHWvbEq-8NaL1An6hvuF0Fs6bSc6ydbh4I";
const CHAT_ID = "8021902374";

const MyCancellations = () => {
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [form, setForm] = useState({ name: "", reason: "" });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cancelledOrders")) || [];
    setCancelledOrders(saved);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    if (!form.name || !form.reason) {
      alert("Iltimos, barcha maydonlarni to‘ldiring.");
      return;
    }

    const cancelDate = new Date().toLocaleDateString("uz-UZ");
    const newOrder = { ...form, cancelDate };

    const updated = [newOrder, ...cancelledOrders];
    setCancelledOrders(updated);
    localStorage.setItem("cancelledOrders", JSON.stringify(updated));
    setForm({ name: "", reason: "" });

    // 📩 Telegramga yuborish
    const message =
      `<b>🚫 Bekor qilingan buyurtma</b>\n\n` +
      `📦 Mahsulot: ${newOrder.name}\n` +
      `📋 Sabab: ${newOrder.reason}\n` +
      `📅 Sana: ${newOrder.cancelDate}`;

    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "HTML",
        }),
      });
    } catch (error) {
      console.error("Telegramga yuborishda xatolik:", error);
    }
  };

  const handleDelete = (index) => {
    const updated = [...cancelledOrders];
    updated.splice(index, 1);
    setCancelledOrders(updated);
    localStorage.setItem("cancelledOrders", JSON.stringify(updated));
  };

  return (
    <div className="cancellations container">
      <h2>Bekor qilingan buyurtmalar</h2>

      <div className="cancel-card">
        <input
          type="text"
          name="name"
          placeholder="Mahsulot nomi"
          value={form.name}
          onChange={handleChange}
        />
        <textarea
          name="reason"
          placeholder="Bekor qilish sababi"
          rows={3}
          value={form.reason}
          onChange={handleChange}
        ></textarea>
        <button onClick={handleAdd}>Bekor qilish</button>
      </div>

      {cancelledOrders.length === 0 ? (
        <p className="empty">
          Hozircha hech qanday bekor qilingan buyurtma yo‘q.
        </p>
      ) : (
        <div className="cancel-list">
          {cancelledOrders.map((item, idx) => (
            <div className="cancel-item" key={idx}>
              <p>
                <strong>Nomi:</strong> {item.name}
              </p>
              <p>
                <strong>Sabab:</strong> {item.reason}
              </p>
              <p>
                <strong>Sana:</strong> {item.cancelDate}
              </p>
              <button className="delete-btn" onClick={() => handleDelete(idx)}>
                ❌ O‘chirish
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCancellations;
