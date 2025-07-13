import React, { useContext } from "react";
import "./Categories.css";
import DataContext from "../../context/DataContext";
import { Link } from "react-router-dom";

const Categories = () => {
  const { data, isPending, error } = useContext(DataContext).categoryData;

  const isScrollable = data?.length > 4;

  return (
    <section className="container-categories">
      <hr />
      {isPending && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}

      <div className="cati-text">
        <div className="cati-item"></div>
        <p>Categories</p>
      </div>

      <div className="text">
        <h1>Browse By Category</h1>
      </div>

      <div
        className={`categories-container ${
          isScrollable ? "scrollable-categories" : ""
        }`}
      >
        {data &&
          data.map((category, index) => (
            <Link to={`/category/${category.name}`} key={index}>
              <div className="category">
                <img src={category.icon} alt={`${category.name} icon`} />
                <p>{category.name}</p>
              </div>
            </Link>
          ))}
      </div>

      <hr className="down-hr" />
    </section>
  );
};

export default Categories;
