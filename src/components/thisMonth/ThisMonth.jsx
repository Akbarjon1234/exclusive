import "./ThisMonth.css";
import { useContext, useEffect, useState } from "react";
import DataContext from "../../context/DataContext";
import { FaStar } from "react-icons/fa6";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import BestSellingProduct from "./bestSellingProduct/BestSellingProduct";

const ThisMonth = () => {
  const navigate = useNavigate();

  const { bestProductsData, recommendedData, wishlistData, setWishlistData } =
    useContext(DataContext);
  const { data: bestData, isPending, error } = bestProductsData;
  const { data: ourData } = recommendedData;

  const [showMore, setShowMore] = useState(() => {
    const saved = localStorage.getItem("thisMonthShowMore");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("thisMonthShowMore", JSON.stringify(showMore));
  }, [showMore]);

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
    const existing = JSON.parse(localStorage.getItem("cart")) || [];
    const index = existing.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      existing[index].quantity += 1;
    } else {
      existing.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(existing));
  };

  const handleGoToDetail = (item) => {
    localStorage.setItem("singleProduct", JSON.stringify(item));
    navigate("/details");
  };

  const renderProductCard = (item) => (
    <div className="product" key={item.id}>
      <div className="image">
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
      <div className="month-price">
        <p className="price">${item.discountPrice}</p>
        {item.price && (
          <p className="discount-price">
            $<del>{item.price}</del>
          </p>
        )}
      </div>
      <p className="stars">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} color={i < item.stars ? "#FFAD33" : "#ccc"} />
        ))}{" "}
        ({item.stars})
      </p>
    </div>
  );

  return (
    <>
      <div className="section-header container">
        <div className="nav-text">
          <div className="p-text">
            <div className="p-icon"></div>
            <p>This Month</p>
          </div>
          <h1>Best Selling Products</h1>
        </div>
        <button onClick={() => setShowMore((prev) => !prev)}>
          {showMore ? "Hide Products" : "View All"}
        </button>
      </div>

      <div className="container-month">
        {isPending && <h1>Loading...</h1>}
        {error && <h1>{error}</h1>}
        {bestData && bestData.map(renderProductCard)}
      </div>

      {showMore && (
        <div className="container-month extra-products">
          {ourData && ourData.map(renderProductCard)}
        </div>
      )}
      <BestSellingProduct />
    </>
  );
};

export default ThisMonth;
