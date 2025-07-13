import "./RelatedItems.css";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa6";
import { IoCartOutline, IoEyeOutline } from "react-icons/io5";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../../context/DataContext";

const RelatedItems = ({ relatedData }) => {
  const { data, isPending, error } = relatedData;
  const { wishlistData, setWishlistData } = useContext(DataContext);
  const navigate = useNavigate();

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

  return (
    <div className="container relatedItems">
      <div className="relatedItems-header">
        <div className="p-icon"></div>
        <p>Related Items</p>
      </div>

      <div className="relatedItems-container">
        {isPending && <h1>Loading...</h1>}
        {error && <h1>{error}</h1>}

        {data &&
          data.map((item) => (
            <div className="related-card" key={item.id}>
              <div className="img-wrapper">
                <img src={item.images[0]} alt={item.name} />

                <button
                  className="Add-to-cart-btn"
                  onClick={() => addToCart(item)}
                >
                  <IoCartOutline /> Add to Cart
                </button>

                <div className="card-icons">
                  <button
                    className="icon-btn"
                    onClick={() => handleToggleWishlist(item)}
                  >
                    {isInWishlist(item.id) ? (
                      <FaHeart color="red" />
                    ) : (
                      <FaRegHeart />
                    )}
                  </button>

                  <button className="icon-btn" onClick={() => handleGoToDetail(item)}>
                    <IoEyeOutline />
                  </button>
                </div>
              </div>

              <h4>{item.name}</h4>

              <div className="price-section">
                {item.discountPrice ? (
                  <>
                    <span className="discountPrice">${item.discountPrice}</span>
                    <span className="originalPrice">${item.price}</span>
                  </>
                ) : (
                  <span className="price">${item.price}</span>
                )}
              </div>

              <div className="rel-stars">
                <div className="rel-star">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FaStar
                      key={index}
                      color={
                        index < Math.round(item.stars / 20) ? "gold" : "#ccc"
                      }
                    />
                  ))}
                </div>
                <span>({item.stars})</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RelatedItems;
