import "./Featured.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import images
import psImg from "../../../src/assets/ps.png";
import collectionImg from "../../../src/assets/collection.png";
import speakersImg from "../../../src/assets/speakers.png";
import perfumeImg from "../../../src/assets/perfume.png";

const Featured = () => {
  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex((item) => item.id === product.id);

    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    toast.success(`${product.name} 🛒 savatga qo‘shildi!`, {
      position: "top-right",
      autoClose: 2500,
      theme: "colored",
    });
  };

  return (
    <section className="featured container">
      <ToastContainer />
      <h3 className="title">
        <span></span> Featured
      </h3>
      <h1 className="subtitle">New Arrival</h1>

      <div className="featured-container">
        <div className="left">
          <div className="featured-content ps">
            <img src={psImg} alt="Play Station 5" />
            <div className="text">
              <h3>PlayStation 5</h3>
              <p>
                Black and White version of the PS5 <br />
                coming out on sale.
              </p>
              <button
                onClick={() =>
                  handleAddToCart({
                    id: 2001,
                    name: "PlayStation 5",
                    price: 650,
                    quantity: 1,
                    images: [psImg],
                  })
                }
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="featured-content collection">
            <img src={collectionImg} alt="Women's Collection" />
            <div className="text">
              <h3>Women’s Collections</h3>
              <p>
                Featured woman collections that give <br />
                you another vibe.
              </p>
              <button
                onClick={() =>
                  handleAddToCart({
                    id: 2002,
                    name: "Women’s Collection",
                    price: 320,
                    quantity: 1,
                    images: [collectionImg],
                  })
                }
              >
                Shop Now
              </button>
            </div>
          </div>

          <div className="featured-content speakers">
            <img src={speakersImg} alt="Speakers" />
            <div className="text">
              <h3>Speakers</h3>
              <p>Amazon wireless speakers</p>
              <button
                onClick={() =>
                  handleAddToCart({
                    id: 2003,
                    name: "Speakers",
                    price: 180,
                    quantity: 1,
                    images: [speakersImg],
                  })
                }
              >
                Shop Now
              </button>
            </div>
          </div>

          <div className="featured-content perfume">
            <img src={perfumeImg} alt="Perfume" />
            <div className="text">
              <h3>Perfume</h3>
              <p>GUCCI INTENSE OUD EDP</p>
              <button
                onClick={() =>
                  handleAddToCart({
                    id: 2004,
                    name: "Gucci Perfume",
                    price: 140,
                    quantity: 1,
                    images: [perfumeImg],
                  })
                }
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
