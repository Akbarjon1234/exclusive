import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentPage.css";
import { toast, ToastContainer } from "react-toastify";

const BOT_TOKEN = "8168298669:AAHWvbEq-8NaL1An6hvuF0Fs6bSc6ydbh4I";
const CHAT_ID = "8021902374";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [userCards, setUserCards] = useState([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("selectedOrder"));
    if (!data) return navigate("/");
    setOrder(data);

    const cards = JSON.parse(localStorage.getItem("paymentCards")) || [];
    setUserCards(cards);
  }, []);

  const handlePay = async () => {
    if (selectedCardIndex === null) {
      toast.error("Iltimos, kartani tanlang!", { position: "top-center" });
      return;
    }

    const selectedCard = userCards[selectedCardIndex];
    const { cartItems, form, total, discount, paymentMethod } = order;
    const today = new Date().toLocaleDateString("uz-UZ");

    let msg = `<b>🧾 To‘lov ma’lumotlari</b>\n📅 Sana: ${today}\n\n`;
    msg += `👤 Ism: ${form.firstname}\n📧 Email: ${form.email}\n📞 Tel: ${form.phone}\n`;
    msg += `🏠 Manzil: ${form.street}, ${form.city}\n`;
    msg += `💳 To‘lov turi: ${paymentMethod} (${selectedCard.cardType} - ${selectedCard.name})\n\n`;
    msg += `📦 Mahsulotlar:\n`;

    cartItems.forEach((item, i) => {
      msg += `${i + 1}) ${item.name} - $${item.price} x ${item.quantity}\n`;
    });

    if (discount) msg += `🔻 Chegirma: ${discount}%\n`;
    msg += `\n💰 Umumiy: $${total}\n`;

    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: msg,
          parse_mode: "HTML",
        }),
      });

      toast.success("To‘lov muvaffaqiyatli amalga oshdi!", {
        position: "top-center",
      });

      localStorage.removeItem("selectedOrder");
      localStorage.removeItem("cart");
      localStorage.removeItem("discount");
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      toast.error("Telegramga yuborishda xatolik!");
    }
  };

  const getMaskedCard = (number) => {
    const last4 = number.slice(-4);
    return "**** **** **** " + last4;
  };

  if (!order) return null;

  return (
    <div className="payment-page container">
      <ToastContainer />
      <h2>To‘lov Sahifasi</h2>

      {userCards.length === 0 && (
        <div className="no-card-box">
          <p>Hech qanday karta topilmadi.</p>
          <button
            className="add-card-btn"
            onClick={() => navigate("/mypayment")}
          >
            Karta qo‘shish
          </button>
        </div>
      )}

      <div className="card-list">
        {userCards.map((card, index) => (
          <div
            key={index}
            className={`card-preview selectable-card ${
              selectedCardIndex === index ? "active-card" : ""
            }`}
            onClick={() => setSelectedCardIndex(index)}
          >
            <div className="card-chip"></div>
            <div className="card-number">{getMaskedCard(card.cardNumber)}</div>
            <div className="card-expiry">{card.expiry}</div>
            <div className="card-nt">
              <div className="card-name">{card.name}</div>
              <div className="card-type">{card.cardType}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="summary-box">
        <h4>To‘lov umumiy summasi: ${order.total.toFixed(2)}</h4>
        <button className="pay-btn" onClick={handlePay}>
          To‘lovni amalga oshirish
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
