import "./MyReturns.css";
import { useEffect, useState } from "react";

// 🔐 Token va chat ID
const BOT_TOKEN = "8168298669:AAHWvbEq-8NaL1An6hvuF0Fs6bSc6ydbh4I";
const CHAT_ID = "8021902374";

const MyReturns = () => {
  const [returns, setReturns] = useState([]);
  const [input, setInput] = useState({ name: "", reason: "" });

  useEffect(() => {
    const savedReturns =
      JSON.parse(localStorage.getItem("manualReturns")) || [];
    setReturns(savedReturns);
  }, []);

  const handleAddReturn = async () => {
    if (!input.name || !input.reason) {
      alert("Iltimos, maydonlarni to‘ldiring!");
      return;
    }

    const newReturn = {
      name: input.name,
      reason: input.reason,
      date: new Date().toLocaleDateString("uz-UZ"),
    };

    const updated = [...returns, newReturn];
    setReturns(updated);
    localStorage.setItem("manualReturns", JSON.stringify(updated));
    setInput({ name: "", reason: "" });

    // 📩 Telegramga yuborish
    const message =
      `<b>↩️ Mahsulot Qaytarildi</b>\n\n` +
      `📦 Mahsulot: ${newReturn.name}\n` +
      `📝 Sabab: ${newReturn.reason}\n` +
      `📅 Sana: ${newReturn.date}`;

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
    } catch (err) {
      console.error("Telegramga yuborishda xatolik:", err);
    }
  };

  const handleDeleteReturn = (index) => {
    const updated = [...returns];
    updated.splice(index, 1);
    setReturns(updated);
    localStorage.setItem("manualReturns", JSON.stringify(updated));
  };

  return (
    <div className="myreturns container">
      <h2>Qaytarilgan mahsulotlar</h2>

      <div className="return-form">
        <input
          type="text"
          placeholder="Mahsulot nomi"
          value={input.name}
          onChange={(e) => setInput({ ...input, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Qaytarish sababi"
          value={input.reason}
          onChange={(e) => setInput({ ...input, reason: e.target.value })}
        />
        <button onClick={handleAddReturn}>Qaytarish</button>
      </div>

      <div className="returns-list">
        {returns.map((item, index) => (
          <div className="return-item" key={index}>
            <h3>{item.name}</h3>
            <p>
              <strong>Sabab:</strong> {item.reason}
            </p>
            <p>
              <strong>Sana:</strong> {item.date}
            </p>
            <button
              className="delete-btn"
              onClick={() => handleDeleteReturn(index)}
            >
              O‘chirish
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReturns;
