import "./Checkout.css";
import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");

  const [form, setForm] = useState({
    firstname: "",
    company: "",
    street: "",
    apartment: "",
    city: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);

    const savedCoupon = localStorage.getItem("discount") || 0;
    setDiscount(parseFloat(savedCoupon));

    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal - (subtotal * discount) / 100;

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // 1. Ro'yhatdan o'tganlikni tekshirish
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (!currentUser) {
      toast.error("Please register first!", {
        position: "top-center",
      });
      return;
    }

    const { firstname, street, city, phone, email } = form;
    if (!firstname || !street || !city || !phone || !email) {
      toast.error("Fill in the blanks!", { position: "top-center" });
      return;
    }

    if (!paymentMethod) {
      toast.error("Please select a payment type!", {
        position: "top-center",
      });
      return;
    }

    const order = {
      cartItems,
      form,
      total,
      discount,
      paymentMethod,
    };

    localStorage.setItem("selectedOrder", JSON.stringify(order));
    navigate("/payment");
  };

  return (
    <section className="checkout container">
      <ToastContainer />
      <h1>Billing Details</h1>

      <form className="checkout-form" onSubmit={handlePlaceOrder}>
        <div className="text-form">
          {[
            { id: "firstname", label: "First Name", required: true },
            { id: "company", label: "Company Name", required: false },
            { id: "street", label: "Street Address", required: true },
            {
              id: "apartment",
              label: "Apartment, floor, etc.",
              required: false,
            },
            { id: "city", label: "Town/City", required: true },
            { id: "phone", label: "Phone Number", required: true },
            { id: "email", label: "Email Address", required: true },
          ].map((f) => (
            <div className="form-group" key={f.id}>
              <label htmlFor={f.id}>
                {f.label} {f.required && <span>*</span>}
              </label>
              <input
                type={f.id === "email" ? "email" : "text"}
                id={f.id}
                value={form[f.id]}
                onChange={handleChange}
              />
            </div>
          ))}

          {/* 💳 Karta turi tanlash */}
          <div className="form-group">
            <label htmlFor="paymentMethod">
              To‘lov turi <span>*</span>
            </label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="Uzcard">Uzcard</option>
              <option value="Humo">Humo</option>
              <option value="Visa">Visa</option>
              <option value="MasterCard">MasterCard</option>
              <option value="Click">Click</option>
              <option value="Payme">Payme</option>
              <option value="Naqd">Cash on delivery</option>
            </select>
          </div>

          <label className="save-info">
            <input type="checkbox" />
            <span className="icon">
              <FaCheck />
            </span>
            <span className="text">
              Save this information for faster check-out next time
            </span>
          </label>
        </div>

        <div className="payment-foorm">
          <ul className="checkout-items">
            {cartItems.length === 0 ? (
              <li style={{ color: "#db4444", fontWeight: "500" }}>
                No items in your Checkout!
              </li>
            ) : (
              cartItems.map((item) => (
                <li key={item.id}>
                  <div className="img">
                    <img src={item.images[0]} alt={item.name} />
                  </div>
                  <p className="item-name">{item.name}</p>
                  <p className="item-price">
                    ${item.price} x {item.quantity}
                  </p>
                </li>
              ))
            )}
          </ul>

          <div className="checkout-payment">
            <p>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </p>
            <p>
              <span>Shipping</span>
              <span>Free</span>
            </p>
            {discount > 0 && (
              <p>
                <span>Discount</span>
                <span>-{discount}%</span>
              </p>
            )}
            <p>
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </p>
          </div>

          <div className="coupon">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Coupon Code"
            />
            <button
              type="button"
              onClick={() => {
                if (cartItems.length === 0) {
                  toast.error("No product - coupon cannot be used!", {
                    position: "top-center",
                  });
                  return;
                }

                const code = couponCode.trim().toUpperCase();
                if (code === "SALE10") {
                  localStorage.setItem("discount", 10);
                  setDiscount(10);
                  toast.success("10% discount applied!", {
                    position: "top-center",
                  });
                } else if (code === "SALE20") {
                  localStorage.setItem("discount", 20);
                  setDiscount(20);
                  toast.success("20% discount applied!", {
                    position: "top-center",
                  });
                } else {
                  localStorage.removeItem("discount");
                  setDiscount(0);
                  toast.error("Noto‘g‘ri kupon kodi!", {
                    position: "top-center",
                  });
                }
              }}
            >
              Apply Coupon
            </button>
          </div>

          <button type="submit" className="order-btn">
            Place Order
          </button>
        </div>
      </form>
    </section>
  );
};

export default Checkout;
