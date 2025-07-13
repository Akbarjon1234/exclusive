import "./OurProducts.css";
import { useContext, useEffect, useState } from "react";
import DataContext from "../../context/DataContext";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const OurProducts = () => {
  const navigate = useNavigate();
  const { productsData, wishlistData, setWishlistData } =
    useContext(DataContext);
  const { data, isPending, error } = productsData;

  const [isExpanded, setIsExpanded] = useState(() => {
    const saved = localStorage.getItem("ourIsExpanded");
    return saved === "true";
  });

  const visibleCount = isExpanded ? data.length : 8;

  useEffect(() => {
    localStorage.setItem("ourIsExpanded", isExpanded);
  }, [isExpanded]);

  const toggleView = () => {
    setIsExpanded(!isExpanded);
  };

  const isInWishlist = (id) => wishlistData.data.some((item) => item.id === id);

  const handleToggleWishlist = (item) => {
    const updated = isInWishlist(item.id)
      ? wishlistData.data.filter((w) => w.id !== item.id)
      : [...wishlistData.data, item];
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

  return (
    <>
      <div className="ourProducts-header-container container">
        <div className="ourProducts-head">
          <div className="ourProducts-header">
            <div className="ouricon"></div>
            <p>Our Products</p>
          </div>
          <div className="ourProducts-title">
            <h1>Explore Our Products</h1>
          </div>
        </div>

        {/* 🔳 Toggle Button (tepada) */}
        {data && data.length > 8 && (
          <div className="our-btn-wrapper">
            <button className="our-toggle-btn" onClick={toggleView}>
              {isExpanded ? "Hide Products" : "Load More"}
            </button>
          </div>
        )}
      </div>

      <div className="ourProducts-container container">
        {isPending && <h1>Loading...</h1>}
        {error && <h1>{error}</h1>}
        {data &&
          data.slice(0, visibleCount).map((item, index) => (
            <div className="item" key={index}>
              <div className="image">
                <div className="img-nav">
                  <div
                    className="img-heart"
                    onClick={() => handleToggleWishlist(item)}
                  >
                    {isInWishlist(item.id) ? (
                      <FaHeart color="red" />
                    ) : (
                      <FaRegHeart />
                    )}
                  </div>
                  <div
                    className="img-eye"
                    onClick={() => handleGoToDetail(item)}
                  >
                    <IoEyeOutline />
                  </div>
                </div>
                <img className="our-img" src={item.images[0]} alt={item.name} />
                <div className="add-to-cart" onClick={() => addToCart(item)}>
                  Add to Cart
                </div>
              </div>

              <p>{item.name}</p>

              <div className="item-words">
                <p>${item.price}</p>
                <p className="stars">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      color={
                        i < Math.round(item.stars / 20) ? "#FFAD33" : "#ccc"
                      }
                    />
                  ))}{" "}
                  ({item.stars})
                </p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default OurProducts;
