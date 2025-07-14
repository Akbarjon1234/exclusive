import { useState, useContext, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { FaRegHeart, FaRegUser } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import DataContext from "../../context/DataContext";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../fireBase";
import { toast } from "react-toastify";
import "./Navbar.css";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [localCartCount, setLocalCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navigate = useNavigate();

  const {
    wishlistData,
    productsData,
    bestProductsData,
    flashSalesData,
    ourProductsData,
  } = useContext(DataContext);

  const wishlistCount = wishlistData?.data?.length || 0;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setLocalCartCount(cart.length);
    };

    updateCartCount();
    const interval = setInterval(updateCartCount, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const allProducts = [
      ...(productsData?.data || []),
      ...(bestProductsData?.data || []),
      ...(flashSalesData?.data || []),
      ...(ourProductsData?.data || []),
    ];

    const filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filtered);
  }, [
    searchTerm,
    productsData,
    bestProductsData,
    flashSalesData,
    ourProductsData,
  ]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        toast.success("Tizimdan chiqdingiz!", {
          position: "top-center",
          autoClose: 2000,
        });
        setShowLogoutModal(false);
        setTimeout(() => navigate("/login"), 2000);
      })
      .catch((error) => {
        console.error("Logout error:", error);
        toast.error("Chiqishda xatolik yuz berdi.");
      });
  };

  return (
    <>
      <div className="navbar container">
        <div className="navbar-top">
          <Link to="/" className="logo">
            Exclusive
          </Link>
          <button
            className="menu-toggle"
            onClick={() => setShowMenu(!showMenu)}
            aria-label="Toggle menu"
          >
            {showMenu ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        <nav>
          <ul className={showMenu ? "active" : ""}>
            <li>
              <NavLink to="/" onClick={() => setShowMenu(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={() => setShowMenu(false)}>
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={() => setShowMenu(false)}>
                About
              </NavLink>
            </li>
            {!user && (
              <li>
                <NavLink to="/signup" onClick={() => setShowMenu(false)}>
                  Sign Up
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <div className="navbar-btns fixed-bottom-panel">
          <div className="navbar-search">
            <input
              type="text"
              placeholder="What are you looking for?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <FiSearch />
            </button>
            {searchTerm && searchResults.length > 0 && (
              <ul className="search-results">
                {searchResults.slice(0, 5).map((item) => (
                  <li key={item.id}>
                    <Link
                      to={`/product/${item.id}`}
                      onClick={() => setSearchTerm("")}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Link to="/wishlist" className="icon-wrapper" aria-label="Wishlist">
            <FaRegHeart />
            {wishlistCount > 0 && (
              <span className="icon-badge">{wishlistCount}</span>
            )}
          </Link>

          <Link to="/cart" className="icon-wrapper" aria-label="Cart">
            <IoCartOutline />
            {localCartCount > 0 && (
              <span className="icon-badge">{localCartCount}</span>
            )}
          </Link>

          {user ? (
            <>
              <Link to="/account" className="icon-user" aria-label="Account">
                <FaRegUser />
              </Link>
              <button
                className="logout-btn"
                onClick={() => setShowLogoutModal(true)}
              >
                Log Out
              </button>
            </>
          ) : null}
        </div>
      </div>

      {showLogoutModal && (
        <div className="modal-backdrop">
          <div className="logout-modal">
            <p>Haqiqatan ham tizimdan chiqmoqchimisiz?</p>
            <div className="modal-actions">
              <button className="confirm-btn" onClick={handleLogout}>
                Ha, chiqaman
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowLogoutModal(false)}
              >
                Yo‘q, qolaman
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
