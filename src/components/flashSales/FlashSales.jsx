import React, { useState, useContext, useEffect } from "react";
import "./FlashSales.css";
import DataContext from "../../context/DataContext";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const FlashSales = () => {
  const navigate = useNavigate();
  const { flashSalesData, bestProductsData, wishlistData, setWishlistData } =
    useContext(DataContext);

  const { data, isPending, error } = flashSalesData;
  const { data: bestProducts } = bestProductsData;

  const [offset, setOffset] = useState(0);
  const productWidth = 300;
  const maxOffset = data ? -(productWidth * (data.length - 4)) : 0;

  const moveSlide = (direction) => {
    let newOffset = offset + direction * productWidth;
    if (newOffset > 0) newOffset = 0;
    if (newOffset < maxOffset) newOffset = maxOffset;
    setOffset(newOffset);
  };

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const getOrCreateDeadline = () => {
      let deadline = localStorage.getItem("flashSaleDeadline");
      if (!deadline) {
        const now = new Date();
        const newDeadline = new Date(
          now.getTime() + 1 * 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000
        );
        localStorage.setItem("flashSaleDeadline", newDeadline.getTime());
        return newDeadline.getTime();
      }
      return parseInt(deadline, 10);
    };

    const deadline = getOrCreateDeadline();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const diff = deadline - now;
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      return { days, hours, minutes, seconds };
    };

    const interval = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);

      if (
        remaining.days === 0 &&
        remaining.hours === 0 &&
        remaining.minutes === 0 &&
        remaining.seconds === 0
      ) {
        clearInterval(interval);
        localStorage.removeItem("flashSaleDeadline");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isInWishlist = (id) => wishlistData.data.some((item) => item.id === id);

  const handleToggleWishlist = (item) => {
    let updated;
    if (isInWishlist(item.id)) {
      updated = wishlistData.data.filter((w) => w.id !== item.id);
    } else {
      updated = [...wishlistData.data, item];
    }
    setWishlistData({ ...wishlistData, data: updated });
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = existingCart.findIndex((item) => item.id === product.id);
    let updatedCart;

    if (index !== -1) {
      existingCart[index].quantity += 1;
      updatedCart = [...existingCart];
    } else {
      updatedCart = [...existingCart, { ...product, quantity: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleGoToDetail = (item) => {
    localStorage.setItem("singleProduct", JSON.stringify(item));
    navigate("/details");
  };

  const [showMore, setShowMore] = useState(
    localStorage.getItem("showMoreFlash") === "true"
  );

  const toggleShowMore = () => {
    const newValue = !showMore;
    setShowMore(newValue);
    localStorage.setItem("showMoreFlash", newValue);
  };

  const renderCard = (item) => (
    <div className="item" key={item.id}>
      <div className="image">
        {item.sale && <div className="sale">{item.sale}</div>}
        <div className="img-nav">
          <div className="img-heart" onClick={() => handleToggleWishlist(item)}>
            {isInWishlist(item.id) ? <FaHeart color="red" /> : <FaRegHeart />}
          </div>
          <div className="img-eye" onClick={() => handleGoToDetail(item)}>
            <IoEyeOutline />
          </div>
        </div>
        <img src={item.images[0]} alt={item.name} />
        <div className="add-to-cart" onClick={() => addToCart(item)}>
          Add to Cart
        </div>
      </div>
      <p>{item.name}</p>
      <div className="flashSales-price">
        <p className="price">${item.discountPrice}</p>
        {item.price && (
          <p className="discount-price">
            <del>${item.price}</del>
          </p>
        )}
      </div>
      <p className="stars">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} color={i < item.stars ? "#FFAD33" : "#ccc"} />
        ))}{" "}
        ( {item.stars} )
      </p>
    </div>
  );

  return (
    <>
      <div className="flashSales-header container">
        <div className="today">
          <div className="todays-item"></div>
          <p>Today's</p>
        </div>
        <div className="flash-nav">
          <h1 className="flash">Flash Sales</h1>
          <div className="timer">
            <div className="t-t">
              <p>Days</p>
              <p>Hours</p>
              <p>Minutes</p>
              <p>Seconds</p>
            </div>
            <div className="t-v">
              <span>{String(timeLeft.days).padStart(2, "0")}</span>
              <h1>:</h1>
              <span>{String(timeLeft.hours).padStart(2, "0")}</span>
              <h1>:</h1>
              <span>{String(timeLeft.minutes).padStart(2, "0")}</span>
              <h1>:</h1>
              <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
            </div>
          </div>
          <button className="btn next" onClick={() => moveSlide(-1)}>
            &#10095;
          </button>
          <button className="btn prev" onClick={() => moveSlide(1)}>
            &#10094;
          </button>
        </div>
      </div>

      <div className="flashSales-container">
        <div
          className="slider"
          style={{ transform: `translateX(${offset}px)` }}
        >
          {isPending && <h1>Loading...</h1>}
          {error && <h1>{error}</h1>}
          {data && data.map(renderCard)}
        </div>
      </div>

      {showMore && (
        <div className="more-products">{bestProducts.map(renderCard)}</div>
      )}

      <div className="view-btn" onClick={toggleShowMore}>
        {showMore ? "Hide Products" : "View All Products"}
      </div>
    </>
  );
};

export default FlashSales;
