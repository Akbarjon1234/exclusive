import "./Account.css";
import { NavLink, Outlet } from "react-router-dom";
import { useEffect } from "react";

const Account = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="container account">
      <div className="account-sidebar">
        <h3>Manage My Account</h3>
        <ul>
          <li>
            <NavLink to="profile">My Profile</NavLink>
          </li>
          <li>
            <NavLink to="addressbook">Address Book</NavLink>
          </li>
          <li>
            <NavLink to="payment">My Payment Options</NavLink>
          </li>
        </ul>

        <h3>My Orders</h3>
        <ul>
          <li>
            <NavLink to="returns">My Returns</NavLink>
          </li>
          <li>
            <NavLink to="cancellations">My Cancellations</NavLink>
          </li>
        </ul>

        <h3>My WishList</h3>
      </div>

      <div className="account-container">
        <Outlet />
      </div>
    </section>
  );
};

export default Account;
