import "./Featured.css";

// import images
import psImg from "../../assets/ps.png";
import collectionImg from "../../assets/collection.png";
import speakersImg from "../../assets/speakers.png";
import perfumeImg from "../../assets/perfume.png";

const Featured = () => {

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("localCart")) || [];
    const index = cart.findIndex((item) => item.id === product.id);

    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("localCart", JSON.stringify(cart));
    alert("Mahsulot Cartga joylandi!")
  };

  return (
    <section className="featured container">
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
              <a
                onClick={() =>
                  addToCart({
                    id: 9001,
                    name: "PlayStation 5",
                    price: 499,
                    discountPrice: 449,
                    images: [psImg],
                  })
                }
              >
                Shop Now
              </a>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="featured-content collection">
            <img src={collectionImg} alt="women's collection" />
            <div className="text">
              <h3>Women’s Collections</h3>
              <p>
                Featured woman collections that give <br />
                you another vibe.
              </p>
              <a
                onClick={() =>
                  addToCart({
                    id: 9002,
                    name: "Women’s Collection",
                    price: 120,
                    discountPrice: 99,
                    images: [collectionImg],
                  })
                }
              >
                Shop Now
              </a>
            </div>
          </div>

          <div className="featured-content speakers">
            <img src={speakersImg} alt="speakers" />
            <div className="text">
              <h3>Speakers</h3>
              <p>Amazon wireless speakers</p>
              <a
                onClick={() =>
                  addToCart({
                    id: 9003,
                    name: "Wireless Speakers",
                    price: 89,
                    discountPrice: 75,
                    images: [speakersImg],
                  })
                }
              >
                Shop Now
              </a>
            </div>
          </div>

          <div className="featured-content perfume">
            <img src={perfumeImg} alt="perfume" />
            <div className="text">
              <h3>Perfume</h3>
              <p>GUCCI INTENSE OUD EDP</p>
              <a
                onClick={() =>
                  addToCart({
                    id: 9004,
                    name: "GUCCI Perfume",
                    price: 210,
                    discountPrice: 180,
                    images: [perfumeImg],
                  })
                }
              >
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
