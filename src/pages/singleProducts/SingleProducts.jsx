import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import DataContext from "../../context/DataContext";
import "./SingleProducts.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegHeart } from "react-icons/fa6"; // ❤️ icon

const SingleProduct = () => {
  const { id } = useParams();
  const {
    productsData,
    bestProductsData,
    flashSalesData,
    ourProductsData,
    wishlistData,
    setWishlistData,
    cartData,
    setCartData,
  } = useContext(DataContext);

  // Barcha mahsulotlarni birlashtirish
  const allProducts = [
    ...(productsData?.data || []),
    ...(bestProductsData?.data || []),
    ...(flashSalesData?.data || []),
    ...(ourProductsData?.data || []),
  ];

  const product = allProducts.find((p) => p.id.toString() === id);

  // Wishlistga qo‘shish
  const handleAddToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.find((item) => item.id === product.id);

    if (exists) {
      toast.info("❤️ Bu mahsulot allaqachon wishlistda mavjud!");
      return;
    }

    const newWishlist = [...wishlist, product];
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    setWishlistData({ data: newWishlist });

    toast.success("❤️ Mahsulot wishlistga qo‘shildi!", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Savatga qo‘shish
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex((item) => item.id === product.id);

    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setCartData({ data: cart });

    toast.success("🛒 Mahsulot savatga qo‘shildi!", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
  };

  if (!product) {
    return (
      <div className="single-product container">
        <h2>😕 Mahsulot topilmadi</h2>
      </div>
    );
  }

  return (
    <div className="single-product container">
      <ToastContainer />
      <div className="product-image">
        <img src={product.images?.[0]} alt={product.name} />
      </div>
      <div className="product-info">
        <h2>{product.name}</h2>
        <p className="desc">{product.description || "Tavsifi mavjud emas."}</p>
        <strong className="price">Narxi: ${product.price}</strong>

        <div className="product-actions">
          <button className="cart-btn" onClick={handleAddToCart}>
            Savatga qo‘shish
          </button>
          <button
            className="heart-btn"
            onClick={handleAddToWishlist}
            title="Wishlistga qo‘shish"
          >
            <FaRegHeart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
