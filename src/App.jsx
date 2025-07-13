import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import pages
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import About from "./pages/about/About";
import Signup from "./pages/signup/Signup";
import Wishlist from "./pages/wishlist/Wishlist";
import Cart from "./pages/cart/Cart";
import Login from "./pages/login/Login";
import Account from "./pages/account/Account";
import Error from "./pages/error/Error";
import Checkout from "./pages/checkout/Checkout";
import Details from "./pages/details/Details";

import MyProfile from "./components/myprofile/MyProfile";
import AddressBook from "./components/addressBook/AddressBook";
import MyPayment from "./components/mypayment/MyPayment";
import MyReturns from "./components/myreturns/MyReturns";
import MyCancellations from "./components/mycancellations/MyCancellations";
import AppLayout from "./layout/AppLayout";

// import context
import DataContext from "./context/DataContext";
import { useEffect, useState } from "react";

function App() {
  const [categoryData, setCategoryData] = useState({
    data: [],
    isPending: null,
    error: null,
  });
  const [bestProductsData, setBestProductsData] = useState({
    data: [],
    isPending: null,
    error: null,
  });
  const [flashSalesData, setFlashSalesData] = useState({
    data: [],
    isPending: null,
    error: null,
  });
  const [productsData, setProductsData] = useState({
    data: [],
    isPending: null,
    error: null,
  });
  const [wishlistData, setWishlistData] = useState({
    data: [],
    isPending: null,
    error: null,
  });
  const [recommendedData, setRecommendedData] = useState({
    data: [],
    isPending: null,
    error: null,
  });
  const [relatedData, setRelatedData] = useState({
    data: [],
    isPending: null,
    error: null,
  });
  const [cartData, setCartData] = useState({
    data: [],
    isPending: null,
    error: null,
  });

  const data = {
    cartData,
    categoryData,
    bestProductsData,
    flashSalesData,
    productsData,
    wishlistData,
    recommendedData,
    relatedData,
    setWishlistData,
    setBestProductsData,
    setFlashSalesData,
    setCategoryData,
    setProductsData,
    setRelatedData,
    setRecommendedData,
    setCartData,
  };

  const routes = createBrowserRouter([
    {
      path: "/",
      errorElement: <Error />,
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "wishlist",
          element: <Wishlist recommendedData={recommendedData} />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "details",
          element: <Details relatedData={relatedData} />,
        },
        {
          path: "checkout",
          element: <Checkout />,
        },
        {
          path: "account",
          element: <Account />,
          children: [
            {
              path: "profile",
              element: <MyProfile />,
            },
            {
              path: "addressbook",
              element: <AddressBook />,
            },
            {
              path: "payment",
              element: <MyPayment />,
            },
            {
              path: "returns",
              element: <MyReturns />,
            },
            {
              path: "cancellations",
              element: <MyCancellations />,
            },
          ],
        },
      ],
    },
  ]);

  useEffect(() => {
    fetch("http://localhost:3000/wishlist")
      .then((res) => res.json())
      .then((data) => {
        setWishlistData({ data });
      })
      .catch((err) => console.error("Wishlist fetch error", err));
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        setProductsData({ data });
      })
      .catch((err) => console.error("Products fetch error", err));
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategoryData({ data });
      })
      .catch((err) => console.error("Categories fetch error", err));
    fetch("http://localhost:3000/bestProducts")
      .then((res) => res.json())
      .then((data) => {
        setBestProductsData({ data });
      })
      .catch((err) => console.error("BestProduct fetch error", err));
    fetch("http://localhost:3000/flashSales")
      .then((res) => res.json())
      .then((data) => {
        setFlashSalesData({ data });
      })
      .catch((err) => console.error("FlashSales fetch error", err));
    fetch("http://localhost:3000/recommended")
      .then((res) => res.json())
      .then((data) => {
        setRecommendedData({ data });
      })
      .catch((err) => console.error("Recommended fetch error", err));
    fetch("http://localhost:3000/reletedItems")
      .then((res) => res.json())
      .then((data) => {
        setRelatedData({ data });
      })
      .catch((err) => console.error("RelatedItems fetch error", err));
    // fetch("http://localhost:3000/cart")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setCartData({ data });
    //   })
    //   .catch((err) => console.error("Cart fetch error", err));
  }, []);

  return (
    <div className="App">
      <DataContext.Provider value={data}>
        <RouterProvider router={routes} />
      </DataContext.Provider>
    </div>
  );
}

export default App;
