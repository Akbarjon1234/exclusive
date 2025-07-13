import { useEffect, useState } from "react";
import "./BestSellingProduct.css";
import speakerImg from "../../../assets/month-product.png";

const BestSellingProduct = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const getDeadline = () => {
    const savedDeadline = localStorage.getItem("deadline");
    if (savedDeadline && new Date(savedDeadline) > new Date()) {
      return new Date(savedDeadline);
    } else {
      const newDeadline = new Date();
      newDeadline.setDate(newDeadline.getDate() + 5);
      localStorage.setItem("deadline", newDeadline);
      return newDeadline;
    }
  };

  useEffect(() => {
    let deadline = getDeadline();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(deadline).getTime() - now;

      if (distance < 0) {
        deadline = getDeadline(); // reset
      }

      const days = String(
        Math.floor(distance / (1000 * 60 * 60 * 24))
      ).padStart(2, "0");
      const hours = String(
        Math.floor((distance / (1000 * 60 * 60)) % 24)
      ).padStart(2, "0");
      const minutes = String(
        Math.floor((distance / (1000 * 60)) % 60)
      ).padStart(2, "0");
      const seconds = String(Math.floor((distance / 1000) % 60)).padStart(
        2,
        "0"
      );

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleBuyNow = () => {
    const product = {
      id: 5000,
      name: "Bluetooth Speaker",
      price: 150,
      discountPrice: 120,
      images: ["/src/assets/month-product.png"],
    };

    const cart = JSON.parse(localStorage.getItem("localCart")) || [];
    const index = cart.findIndex((item) => item.id === product.id);

    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("localCart", JSON.stringify(cart));
  };

  return (
    <div className="container">
      <div className="month-product">
        <div className="month-product__info">
          <h4>Categories</h4>
          <h1>Enhance Your Music Experience</h1>
          <div className="month-deadline">
            <div>
              <p>{timeLeft.days}</p>
              <span>Days</span>
            </div>
            <div>
              <p>{timeLeft.hours}</p>
              <span>Hours</span>
            </div>
            <div>
              <p>{timeLeft.minutes}</p>
              <span>Minutes</span>
            </div>
            <div>
              <p>{timeLeft.seconds}</p>
              <span>Seconds</span>
            </div>
          </div>
          <button onClick={handleBuyNow}>Buy Now!</button>
        </div>
        <div className="month-product__img">
          <img src={speakerImg} alt="speaker" />
        </div>
      </div>
    </div>
  );
};

export default BestSellingProduct;
