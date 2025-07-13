import { useEffect, useState } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import "./Cart.css";
import { FaTrashAlt } from "react-icons/fa";

const Cart = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon] = useState(
    localStorage.getItem("couponCode") || ""
  );
  const [discount, setDiscount] = useState(
    parseFloat(localStorage.getItem("discount")) || 0
  );
  const [message, setMessage] = useState(
    localStorage.getItem("couponMessage") || ""
  );
  const [showModal, setShowModal] = useState(false); // MODAL

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("couponCode", coupon);
    localStorage.setItem("discount", discount);
    localStorage.setItem("couponMessage", message);
  }, [coupon, discount, message]);

  useEffect(() => {
    if (cartItems.length === 0) {
      setDiscount(0);
      setCoupon("");
      setMessage("");
      localStorage.removeItem("discount");
      localStorage.removeItem("couponCode");
      localStorage.removeItem("couponMessage");
    }
  }, [cartItems]);

  const handleDelete = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
  };

  const increaseQty = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updated);
  };

  const decreaseQty = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updated);
  };

  const getSubtotal = (price, qty) => price * qty;
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal - (subtotal * discount) / 100;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = coupon.trim().toUpperCase();

    if (code === "SALE10") {
      setDiscount(10);
      setMessage("10% chegirma qo‘llandi!");
    } else if (code === "SALE20") {
      setDiscount(20);
      setMessage("20% chegirma qo‘llandi!");
    } else {
      setDiscount(0);
      setMessage("Noto‘g‘ri kupon kodi!");
    }
  };

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
    setShowModal(false);
  };

  return (
    <section className="container cart">
      {/* 🧾 MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <FaTrashAlt className="trash-bin" />
            <h3>Barcha mahsulotlarni o‘chirmoqchimisiz?</h3>
            <div className="modal-btns">
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="ok-btn" onClick={handleClearCart}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="cart-container">
        <table>
          <thead>
            <tr>
              <td>Product</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Subtotal</td>
            </tr>
          </thead>
          <tbody>
            {cartItems.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  No items in your cart!
                </td>
              </tr>
            ) : (
              cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="img">
                    <button
                      className="delete"
                      onClick={() => handleDelete(item.id)}
                    >
                      <ImCross />
                    </button>
                    <img src={item.images?.[0]} alt={item.name} />
                    <span>{item.name}</span>
                  </td>
                  <td className="price">${item.price}</td>
                  <td>
                    <div className="quantity">
                      <span className="count">{item.quantity}</span>
                      <div className="quantity-btns">
                        <button onClick={() => increaseQty(item.id)}>
                          <FaAngleUp />
                        </button>
                        <button onClick={() => decreaseQty(item.id)}>
                          <FaAngleDown />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="subtotal">
                    ${getSubtotal(item.price, item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="cart-container__links">
          <Link to="/" className="return-link">
            Return To Shop
          </Link>
          <button
            className={`delete-btn ${cartItems.length === 0 ? "disabled" : ""}`}
            onClick={() => {
              if (cartItems.length > 0) {
                setShowModal(true);
              }
            }}
          >
            Delete All Products
          </button>
        </div>
      </div>

      <div className="cart-total">
        <div className="coupon-code">
          <form onSubmit={handleApplyCoupon}>
            <input
              type="text"
              placeholder="Coupon Code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button type="submit">Apply Coupon</button>
          </form>
          {message && (
            <p style={{ marginTop: "10px", color: discount ? "green" : "red" }}>
              {message}
            </p>
          )}
        </div>

        <div className="cart-total__checkout">
          <h3>Cart Total</h3>
          <p>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </p>
          <p>
            <span>Discount</span>
            <span>{discount}%</span>
          </p>
          <p>
            <span>Shipping</span>
            <span>Free</span>
          </p>
          <p>
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </p>
          <Link to="/checkout">Proceed to checkout</Link>
        </div>
      </div>
    </section>
  );
};

export default Cart;
