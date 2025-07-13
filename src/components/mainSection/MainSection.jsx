import "./MainSection.css";
import { FaAngleRight, FaArrowRightLong } from "react-icons/fa6";
import { GrApple } from "react-icons/gr";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "react-toastify/dist/ReactToastify.css";

const MainSection = () => {
  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex((item) => item.id === product.id);

    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    const toastId = "cart-toast";

    if (!toast.isActive(toastId)) {
      toast.success("🛒 Mahsulot savatga muvaffaqiyatli qo‘shildi!", {
        toastId,
        position: "top-right",
        autoClose: 2500,
        theme: "light",
        style: {
          fontSize: "16px",
          fontWeight: "500",
          backgroundColor: "#f0f9ff",
          color: "#0c4a6e",
          borderLeft: "6px solid #0ea5e9",
          borderRadius: "8px",
          padding: "14px 18px",
        },
        icon: "✅",
      });
    }
  };

  return (
    <section className="home-main container">
      <div className="category-list">
        <ul>
          <li className="fashion-list">
            <Link>
              <span>Woman’s Fashion</span>
            </Link>
            <FaAngleRight />
            <ul>
              <li>
                <Link to="/category/Women's-Hat">Hat</Link>
              </li>
              <li>
                <Link to="/category/Women's-T-shirt">T-Shirt</Link>
              </li>
              <li>
                <Link to="/category/Women's-Shoes">Shoes</Link>
              </li>
            </ul>
          </li>
          <li className="fashion-list">
            <Link>
              <span>Men’s Fashion</span>
            </Link>
            <FaAngleRight />
            <ul>
              <li>
                <Link to="/category/Men's-Hat">Hat</Link>
              </li>
              <li>
                <Link to="/category/Men's-T-shirt">T-Shirt</Link>
              </li>
              <li>
                <Link to="/category/Men's-Shoes">Shoes</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/category/Electronics">
              <span>Electronics</span>
            </Link>
          </li>
          <li>
            <Link to="/category/Home & Lifestyle">
              <span>Home & Lifestyle</span>
            </Link>
          </li>
          <li>
            <Link to="/category/Medicine">
              <span>Medicine</span>
            </Link>
          </li>
          <li>
            <Link to="/category/Sports & Outdoor">
              <span>Sports & Outdoor</span>
            </Link>
          </li>
          <li>
            <Link to="/category/Baby’s & Toys">
              <span>Baby’s & Toys</span>
            </Link>
          </li>
          <li>
            <Link to="/category/Groceries & Pets">
              <span>Groceries & Pets</span>
            </Link>
          </li>
          <li>
            <Link to="/category/Health & Beauty">
              <span>Health & Beauty</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="slide">
        <ToastContainer />
        <Swiper
          spaceBetween={30}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide className="Iphone">
            <div className="img-text Iphone-slide">
              <div className="Iphone-text">
                <p className="brand-name">Iphone 16 Pro Max</p>
              </div>
              <div className="Voucher">
                <h1 className="slide-title">
                  Up to 10% <br /> to Voucher
                </h1>
              </div>
              <div className="shop-link">
                <button
                  onClick={() =>
                    handleAddToCart({
                      id: 10002,
                      name: "Iphone 16 Pro Max",
                      price: 1200,
                      quantity: 1,
                      images: ["/assets/iphone16.webp"],
                    })
                  }
                >
                  Shop Now
                </button>
                <FaArrowRightLong color="white" />
              </div>
            </div>
            <div className="Iphone-img">
              <img src="/assets/iphone16.webp" alt="Iphone" />
            </div>
          </SwiperSlide>

          <SwiperSlide className="lenovo">
            <div className="img-text lenovo-slide">
              <div className="lenovo-text">
                <p className="brand-name">PlayStation 5</p>
              </div>
              <div className="Voucher">
                <h1 className="slide-title">
                  Black and White version of <br /> the PS5 coming out on sale.
                </h1>
              </div>
              <div className="shop-link">
                <button
                  onClick={() =>
                    handleAddToCart({
                      id: 10003,
                      name: "PlayStation 5",
                      price: 300,
                      quantity: 1,
                      images: ["/src/assets/ps.png"],
                    })
                  }
                >
                  Shop Now
                </button>
                <FaArrowRightLong color="white" />
              </div>
            </div>
            <div className="lenovo-img">
              <img src="/src/assets/ps.png" alt="PS" />
            </div>
          </SwiperSlide>

          <SwiperSlide className="toy-car">
            <div className="img-text toycar-slide">
              <div className="toycar-text">
                <p className="brand-name">Perfume</p>
              </div>
              <div className="Voucher">
                <h1 className="slide-title">
                  GUCCI INTENSE <br /> OUD EDP
                </h1>
              </div>
              <div className="shop-link">
                <button
                  onClick={() =>
                    handleAddToCart({
                      id: 10004,
                      name: "Cucci Perfume",
                      price: 100,
                      quantity: 1,
                      images: ["/src/assets/perfume.png"],
                      category: "toys",
                    })
                  }
                >
                  Shop Now
                </button>
                <FaArrowRightLong color="#fff" size={20} />
              </div>
            </div>
            <div className="car-img">
              <img src="/src/assets/perfume.png" alt="Toy Car" />
            </div>
          </SwiperSlide>

          <SwiperSlide className="speaker">
            <div className="img-text speaker-slide">
              <div className="speaker-text">
                <p>Bluetooth Speaker</p>
                <h1 className="slide-title">
                  Enhance Your <br /> Music Experience
                </h1>
                <div className="shop-link">
                  <button
                    onClick={() =>
                      handleAddToCart({
                        id: 10005,
                        name: "Bluetooth Speaker",
                        price: 99,
                        quantity: 1,
                        images: ["/src/assets/month-product.png"],
                        category: "electronics",
                      })
                    }
                  >
                    Shop Now
                  </button>
                  <FaArrowRightLong size={20} className="arrow-icon" />
                </div>
              </div>
            </div>
            <div className="speaker-img">
              <img
                src="/src/assets/month-product.png"
                alt="Bluetooth Speaker"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default MainSection;
