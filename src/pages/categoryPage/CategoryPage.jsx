import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import DataContext from "../../context/DataContext";
import "./CategoryPage.css";
import { toast, ToastContainer } from "react-toastify";
import { IoEyeOutline } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const navigate = useNavigate();

  const { categoryName } = useParams();
  const {
    productsData,
    bestProductsData,
    flashSalesData,
    ourProductsData,
    wishlistData,
    setWishlistData,
  } = useContext(DataContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allProducts = [
    ...(productsData?.data || []),
    ...(bestProductsData?.data || []),
    ...(flashSalesData?.data || []),
    ...(ourProductsData?.data || []),
  ];

  const filteredProducts = allProducts.filter((product) => {
    return product.category?.toLowerCase() === categoryName.toLowerCase();
  });

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex((item) => item.id === product.id);

    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("🛒 Mahsulot savatga qo‘shildi!", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
  };

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

  const handleGoToDetail = (item) => {
    localStorage.setItem("singleProduct", JSON.stringify(item));
    navigate("/details");
  };

  return (
    <section className="container">
      <ToastContainer />
      <h2 className="category-products-text">
        {categoryName} bo‘yicha mahsulotlar
      </h2>
      <div className="category-products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="category-product-card">
              <div className="caty-page-icons">
                <div
                  className="caty-eye"
                  onClick={() => handleGoToDetail(product)}
                >
                  <IoEyeOutline />
                </div>
                <div
                  className="caty-heart"
                  onClick={() => handleToggleWishlist(product)}
                >
                  {isInWishlist(product.id) ? (
                    <FaHeart color="red" />
                  ) : (
                    <FaRegHeart />
                  )}
                </div>
              </div>
              <img src={product.images[0]} alt={product.name} />
              <h4>{product.name}</h4>
              <p>${product.price}</p>
              <button onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>Bu kategoriyada mahsulot yo‘q</p>
        )}
      </div>
    </section>
  );
};

export default CategoryPage;
