import { createContext, useEffect, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [productsData, setProductsData] = useState({
    data: [],
    isPending: true,
    error: null,
  });

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setProductsData({
          data: data.products, // ✅ faqat products qismi olinadi
          isPending: false,
          error: null,
        });
      })
      .catch((err) => {
        setProductsData({
          data: [],
          isPending: false,
          error: err.message,
        });
      });
  }, []);

  // LocalStorage helpers
  const getInitialCart = () => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  };

  const getInitialWishlist = () => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  };

  const [cartData, setCartData] = useState({
    data: getInitialCart(),
    isPending: false,
    error: null,
  });

  const [wishlistData, setWishlistData] = useState({
    data: getInitialWishlist(),
    isPending: false,
    error: null,
  });

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartData.data));
  }, [cartData.data]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistData.data));
  }, [wishlistData.data]);

  const addToCart = (item) => {
    const exists = cartData.data.find((p) => p.id === item.id);
    let updatedCart;
    if (exists) {
      updatedCart = cartData.data.map((p) =>
        p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
      );
    } else {
      updatedCart = [...cartData.data, { ...item, quantity: 1 }];
    }
    setCartData({ ...cartData, data: updatedCart });
  };

  const addToWishlist = (item) => {
    const exists = wishlistData.data.find((w) => w.id === item.id);
    let updatedWishlist;
    if (exists) {
      updatedWishlist = wishlistData.data.filter((w) => w.id !== item.id);
    } else {
      updatedWishlist = [...wishlistData.data, item];
    }
    setWishlistData({ ...wishlistData, data: updatedWishlist });
  };

  return (
    <DataContext.Provider
      value={{
        productsData,
        cartData,
        setCartData,
        wishlistData,
        setWishlistData,
        addToCart,
        addToWishlist,
        selectedProduct,
        setSelectedProduct,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
