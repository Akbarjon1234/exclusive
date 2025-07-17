import "./WishlistItems.css";
import { IoCartOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { useContext, useEffect } from "react";
import DataContext from "../../context/DataContext";

const WishlistItems = () => {
  const { wishlistData, setWishlistData, cartData, setCartData } =
    useContext(DataContext);
  const { data, isPending, error } = wishlistData;

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const moveAllToCart = () => {
    const existingCart = cartData.data || [];
    const wishlistItems = wishlistData.data || [];

    const newItems = wishlistItems.filter(
      (wishItem) =>
        !existingCart.some((cartItem) => cartItem.id === wishItem.id)
    );

    const newItemsWithQuantity = newItems.map((item) => ({
      ...item,
      quantity: 1,
    }));

    const updatedCart = [...existingCart, ...newItemsWithQuantity];

    setCartData({ ...cartData, data: updatedCart });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDelete = (id) => {
    const updated = data.filter((item) => item.id !== id);
    setWishlistData({ data: updated });
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const isScrollable = data.length > 4;

  return (
    <div className="container-wishlist">
      <div className="wishlist">
        <div className="wishlist-header">
          <p>Wishlist ({data.length})</p>
          <button onClick={moveAllToCart}>Move All To Bag</button>
        </div>

        <div
          className={`wishlist-container ${
            isScrollable ? "scrollable-wishlist" : ""
          }`}
        >
          {isPending && <h1>Loading...</h1>}
          {error && <h1>{error}</h1>}
          {data && data.length === 0 ? (
            <div className="empty-wishlist">
              <p>No items in your wishlist!</p>
            </div>
          ) : (
            data.map((item) => (
              <div key={item.id} className="wishlist-item">
                <div className="image">
                  <img src={item?.images[0] || ""} alt={item.name} />
                  <div
                    className="wish-trash"
                    onClick={() => handleDelete(item.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <FaRegTrashAlt />
                  </div>
                  <div className="add-to-cart" onClick={() => addToCart(item)}>
                    <IoCartOutline className="wish-cart" />
                    Add to Cart
                  </div>
                </div>
                <p>{item.name}</p>
                <p>${item.price}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistItems;
