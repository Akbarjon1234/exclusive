import "./Recommend.css";
import { IoCartOutline } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import { FaStar } from "react-icons/fa6";
import { useContext, useEffect, useState } from "react";
import DataContext from "../../context/DataContext";
import { useNavigate } from "react-router-dom";

const Recommend = ({ recommendedData }) => {
  const navigate = useNavigate();

  const { productsData } = useContext(DataContext);
  const { data: recData, isPending, error } = recommendedData;
  const { data: ourProducts } = productsData;

  const [showMore, setShowMore] = useState(() => {
    const saved = localStorage.getItem("recommendShowMore");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("recommendShowMore", JSON.stringify(showMore));
  }, [showMore]);

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

  const renderCard = (item) => (
    <div key={item.id} className="recommend-container">
      <div className="image">
        <div className="rec-eye" onClick={() => handleGoToDetail(item)}>
          <LuEye />
        </div>
        <img src={item.images[0]} alt={item.name} />
        <div className="add-to-cart" onClick={() => addToCart(item)}>
          <IoCartOutline className="wish-cart" />
          Add to Cart
        </div>
      </div>
      <p>{item.name}</p>
      <p>${item.price}</p>
      <p className="stars">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} color={i < item.stars ? "#FFAD33" : "#ccc"} />
        ))}{" "}
        ({item.stars})
      </p>
    </div>
  );

  return (
    <div className="container recommend">
      <div className="recommend-header">
        <div className="rec-title">
          <div className="title-div"></div>
          <h1>Just for you</h1>
        </div>
        <button onClick={() => setShowMore((prev) => !prev)}>
          {showMore ? "Hide Products" : "See All"}
        </button>
      </div>

      <div className="recommend-container">
        <div className="product">
          {isPending && <h1>Loading...</h1>}
          {error && <h1>{error}</h1>}
          {recData && recData.map(renderCard)}
        </div>
      </div>

      {showMore && (
        <div className="recommend-container extra-products">
          {ourProducts && ourProducts.map(renderCard)}
        </div>
      )}
    </div>
  );
};

export default Recommend;
