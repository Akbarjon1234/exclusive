import "./MyPayment.css";
import { useState, useEffect } from "react";

const MyPayment = () => {
  const [form, setForm] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    cardType: "",
  });
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("paymentCards")) || [];
    setCards(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("paymentCards", JSON.stringify(cards));
  }, [cards]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let cleaned = value;

    if (name === "cardNumber") {
      cleaned = value.replace(/\D/g, "").slice(0, 16);
      cleaned = cleaned.replace(/(.{4})/g, "$1 ").trim();
    } else if (name === "expiry") {
      cleaned = value.replace(/\D/g, "").slice(0, 4);
      if (cleaned.length > 2) {
        cleaned = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
      }
    } else if (name === "cvc") {
      cleaned = value.replace(/\D/g, "").slice(0, 3);
    } else if (name === "name") {
      cleaned = value.replace(/[^a-zA-Z\s]/g, "");
    }

    setForm((prev) => ({
      ...prev,
      [name]: cleaned,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      form.name &&
      form.cardNumber &&
      form.expiry &&
      form.cvc &&
      form.cardType
    ) {
      setCards((prev) => [...prev, form]);
      setForm({
        name: "",
        cardNumber: "",
        expiry: "",
        cvc: "",
        cardType: "",
      });
    }
  };

  const getMaskedCard = (number) => {
    const last4 = number.slice(-4);
    return "**** **** **** " + last4;
  };

  const handleDelete = (indexToDelete) => {
    const updatedCards = cards.filter((_, i) => i !== indexToDelete);
    setCards(updatedCards);
  };

  return (
    <div className="payment-container">
      <p>Payment Options</p>

      <form className="payment-form" onSubmit={handleSubmit}>
        <span>Your Name and Surname:</span>
        <input
          type="text"
          name="name"
          placeholder="Name and Surname"
          value={form.name}
          onChange={handleChange}
          required
        />

        <span>Card Number:</span>
        <input
          type="text"
          name="cardNumber"
          placeholder="0000 0000 0000 0000"
          value={form.cardNumber}
          onChange={handleChange}
          required
        />

        <div className="payment-row">
          <div>
            <span>Validate:</span>
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              value={form.expiry}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <span>CVC:</span>
            <input
              type="text"
              name="cvc"
              placeholder="123"
              value={form.cvc}
              onChange={handleChange}
              required
            />
          </div>
        </div>

          <span>Card type:</span>
          <input
            type="text"
            name="cardType"
            placeholder="UZCARD, VISA, MASTER"
            value={form.cardType}
            onChange={handleChange}
            required
          />

        <button className="card-button" type="submit">
          Add Card
        </button>
      </form>

      <div className="card-list">
        {cards.map((card, index) => (
          <div className="card-preview" key={index}>
            <div className="card-chip"></div>
            <div className="card-number">{getMaskedCard(card.cardNumber)}</div>
            <div className="card-expiry">{card.expiry}</div>
            <div className="card-nt">
              <div className="card-name">{card.name}</div>
              <div className="card-type">{card.cardType}</div>
            </div>
            <button
              className="delete-btn"
              onClick={() => handleDelete(index)}
              style={{
                marginTop: "10px",
                padding: "5px 10px",
                background: "#db4444",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Delete card
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPayment;
