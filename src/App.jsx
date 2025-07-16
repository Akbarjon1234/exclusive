import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";

// Pages
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
import SingleProduct from "./pages/singleProducts/SingleProducts";
import CategoryPage from "./pages/categoryPage/CategoryPage";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import UserList from "./pages/signup/UserList";
import ProfileEdit from "./pages/signup/ProfileEdit";
import PaymentPage from "./pages/paymentPage/PaymentPage";

// Account pages
import MyProfile from "./components/myprofile/MyProfile";
import AddressBook from "./components/addressBook/AddressBook";
import MyPayment from "./components/mypayment/MyPayment";
import MyReturns from "./components/myreturns/MyReturns";
import MyCancellations from "./components/mycancellations/MyCancellations";

// Layout
import AppLayout from "./layout/AppLayout";

// Context
import DataContext from "./context/DataContext";

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

  // ✅ wishlist faqat localStorage bilan ishlaydi
  const getInitialWishlist = () => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  };

  const [wishlistData, setWishlistData] = useState({
    data: getInitialWishlist(),
    isPending: null,
    error: null,
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistData.data));
  }, [wishlistData.data]);

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

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartData.data));
  }, [cartData.data]);

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

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setProductsData({ data: data.products });
        setCategoryData({ data: data.categories });
        setBestProductsData({ data: data.bestProducts });
        setFlashSalesData({ data: data.flashSales });
        setRecommendedData({ data: data.recommended });
        setRelatedData({ data: data.relatedData });
      })
      .catch((err) => console.error("Data fetch error", err));
  }, []);

  const routes = createBrowserRouter([
    {
      path: "/",
      errorElement: <Error />,
      element: <AppLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "contact", element: <Contact /> },
        { path: "about", element: <About /> },
        { path: "signup", element: <Signup /> },
        { path: "login", element: <Login /> },
        { path: "signUp", element: <UserList /> },
        { path: "profile", element: <ProfileEdit /> },
        { path: "/payment", element: <PaymentPage /> },

        { path: "mypayment", element: <MyPayment /> },
        {
          path: "wishlist",
          element: <Wishlist recommendedData={recommendedData} />,
        },
        { path: "cart", element: <Cart /> },
        {
          path: "details",
          element: <Details relatedData={relatedData} />,
        },
        { path: "checkout", element: <Checkout /> },
        { path: "/product/:id", element: <SingleProduct /> },
        { path: "/category/:categoryName", element: <CategoryPage /> },
        { path: "/reset-password", element: <ResetPassword /> },
        {
          path: "account",
          element: <Account />,
          children: [
            { path: "profile", element: <MyProfile /> },
            { path: "addressbook", element: <AddressBook /> },
            { path: "payment", element: <MyPayment /> },
            { path: "returns", element: <MyReturns /> },
            { path: "cancellations", element: <MyCancellations /> },
          ],
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <DataContext.Provider value={data}>
        <RouterProvider router={routes} />
      </DataContext.Provider>
    </div>
  );
}

export default App;
