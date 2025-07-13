import { useContext, useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { FaMinus, FaPlus, FaRegHeart, FaHeart } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { GrPowerCycle } from "react-icons/gr";
import DataContext from "../../context/DataContext";
import "./Detail.css";

const Detail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { wishlistData, setWishlistData } = useContext(DataContext);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = JSON.parse(localStorage.getItem("singleProduct"));
  const [selectedImage, setSelectedImage] = useState(
    product?.images?.[0] || product?.image
  );

  useEffect(() => {
    if (product) {
      const isInWish = wishlistData.data.some((item) => item.id === product.id);
      setIsWishlisted(isInWish);
    }
  }, [wishlistData, product]);

  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleBuyNow = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = existingCart.findIndex((item) => item.id === product.id);
    let updatedCart;

    if (index !== -1) {
      existingCart[index].quantity += quantity;
      updatedCart = [...existingCart];
    } else {
      updatedCart = [...existingCart, { ...product, quantity }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleToggleWishlist = () => {
    const isInWishlist = wishlistData.data.some(
      (item) => item.id === product.id
    );
    let updated;
    if (isInWishlist) {
      updated = wishlistData.data.filter((w) => w.id !== product.id);
    } else {
      updated = [...wishlistData.data, product];
    }
    setWishlistData({ ...wishlistData, data: updated });
    localStorage.setItem("wishlist", JSON.stringify(updated));
    setIsWishlisted(!isInWishlist);
  };

  if (!product) {
    return <div className="container">Mahsulot topilmadi!</div>;
  }

  return (
    <section className="detail container">
      <div className="detail-images">
        <div className="images-options">
          {product.images &&
            product.images.map((img, i) => (
              <div
                className={`image ${selectedImage === img ? "active" : ""}`}
                key={i}
                onClick={() => setSelectedImage(img)}
              >
                <img src={img} alt={`image-${i}`} />
              </div>
            ))}
        </div>
        <div className="show-image">
          <img src={selectedImage} alt="Main product" />
        </div>
      </div>

      <div className="detail-info">
        <h2>{product.name}</h2>

        <div className="detail-reviews">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                color={i < (product.stars || 0) ? "#FFAD33" : "#00000025"}
              />
            ))}
          </div>
          <span>({product.stars || 0} Reviews) |</span>
          <span>In Stock</span>
        </div>

        <p className="price">${product.discountPrice || product.price}</p>
        <p className="desc">
          {product.description || "No description available."}
        </p>
        <div className="line"></div>

        {/* Color - demo only */}
        <div className="color">
          <p>Color:</p>
          <label>
            <input type="radio" name="color" />
            <span className="cornflowerblue">
              <span></span>
            </span>
          </label>
          <label>
            <input type="radio" name="color" />
            <span className="indianred">
              <span></span>
            </span>
          </label>
        </div>

        {/* Size - demo only */}
        <div className="size">
          <p>Size:</p>
          {["XS", "S", "M", "L", "XL"].map((size) => (
            <label key={size}>
              <input type="radio" name="size" />
              <span>{size}</span>
            </label>
          ))}
        </div>

        <div className="count-div">
          <div className="count">
            <button className="dec" onClick={decrease}>
              <FaMinus className="icon" />
            </button>
            <span>{quantity}</span>
            <button className="inc" onClick={increase}>
              <FaPlus className="icon" />
            </button>
          </div>
          <button className="wishlist" onClick={handleToggleWishlist}>
            {isWishlisted ? <FaHeart color="red" /> : <FaRegHeart />}
          </button>
          <button className="buynow" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>

        <div className="delivery">
          <div className="fast-delivery">
            <div className="icon-div">
              <TbTruckDelivery className="icon" />
            </div>
            <div className="info">
              <h3>Free Delivery</h3>
              <p>Enter your postal code for Delivery Availability</p>
            </div>
          </div>

          <div className="return-delivery">
            <div className="icon-div">
              <GrPowerCycle className="icon" />
            </div>
            <div className="info">
              <h3>Return Delivery</h3>
              <p>Free 30 Days Delivery Returns. Details</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Detail;
