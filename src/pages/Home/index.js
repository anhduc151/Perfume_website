import { NavLink } from "react-router-dom";
import SLIDE1 from "../../assets/images/product-slide-1.png";
import banner1 from "../../assets/images/home2-banner-1.jpg";
import banner2 from "../../assets/images/home2-banner-2.jpg";
import AboutImg from "../../assets/images/home2-video-placeholder.jpg";
import { BsPlay, BsCheckCircleFill } from "react-icons/bs";
import {
  productHot,
  productHotBanner,
  flower3,
  flower2,
} from "../../assets/images/index";
import "./home.scss";
import Product from "../../components/Product";
import bannerContent from "../../assets/images/banner2-image-3.png";
import { feature1, feature2, featureFlower } from "../../assets/images/index";
import Slider from "../../components/Slider";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { checkIsAddToCartSelector } from "../../redux/selector";
import { useDispatch, useSelector } from "react-redux";
import { checkIsAddToCart } from "../../redux/actions";
import ToastSuccess from "../../components/Toast/toastSuccess";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getProductsSeller = async () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      const response = await axios({
        method: "get",
        url: `http://localhost:8080/api/v1/products/`,
      });
      setProducts(response.data.data);
    };
    getProductsSeller();
  }, []);
  const dispatch = useDispatch();
  const isAddToCart = useSelector(checkIsAddToCartSelector);
  useEffect(() => {
    if (!isAddToCart) return;
    setTimeout(() => dispatch(checkIsAddToCart(false)), 2000);
  }, [isAddToCart]);
  return (
    <>
      <section className="slides">
        {isAddToCart && <ToastSuccess title="yay, đã thêm vào túi hàng!" />}
        <div className="slide">
          <img
            src={SLIDE1}
            alt=""
            className="slide__img"
            data-aos="fade-right"
          />
          <div className="slide__title">
            <h2 className="slide__title-heading" data-aos="fade-up">
              A Little Surprise
            </h2>
            <p className="slide__title-desc" data-aos="fade-up">
              Electric ray demoiselle squeaker unicorn fish Kafue pike bango
              temperate <br />
              ocean-bass, yellow bass coffinfish yellowfin customers.
            </p>
            <NavLink to="/shop" className="btn">
              <span></span>
              Shop Now
            </NavLink>
          </div>
        </div>
      </section>

      <div className="banner">
        <div
          className="banner__inner"
          style={{ position: "relative" }}
          data-aos="fade-up-right"
        >
          <div className="banner__img">
            <img src={banner1} alt="" className="banner__inner-img" />
          </div>
          <div className="banner__title">
            <h3 className="banner__title-heading">Best Price</h3>
            <p className="banner__title-desc">Perfume Flower Collection</p>
            <NavLink to="/shop" className="btn">
              <span></span>
              Shop Now
            </NavLink>
          </div>
        </div>

        <div
          className="banner__inner"
          style={{ position: "relative" }}
          data-aos="fade-up-left"
        >
          <div className="banner__img">
            <img src={banner2} alt="" className="banner__inner-img" />
          </div>
          <div className="banner__title">
            <h3 className="banner__title-heading">New Perfume</h3>
            <p className="banner__title-desc">Perfume Cool Collection</p>
            <NavLink to="/shop" className="btn">
              <span></span>
              Shop Now
            </NavLink>
          </div>
        </div>
      </div>

      <div className="about">
        <div className="container">
          <div className="about__container">
            <div className="about__title" data-aos="fade-right">
              <h3 className="about__sub-heading">About VA Perfume.</h3>
              <h2 className="about__heading">Perfect Pefume</h2>
              <p className="about__strong-text">
                Popularized through customer relationships with some of the
                world’s most recognizable faces.
              </p>
              <p className="about__desc">
                Merluccid hake redlip blenny discus snake mudhead large-eye
                bream scissor-tail rasbora opaleye char dogfish beachsalmon,
                sand tilefish. Spiny eel skipping goby fierasfer tarwhine Blind
                goby tidewater goby rocket danio armorhead catfish streamer.
              </p>

              <div className="about__counter">
                <div className="about__counter-item">
                  470K
                  <span>Perfumes sold</span>
                </div>
                <div className="about__counter-item">
                  10 years
                  <span>Perfect years</span>
                </div>
              </div>

              <NavLink to="/shop" className="btn">
                <span></span>
                Explore More
              </NavLink>
            </div>

            <div className="about__video" data-aos="fade-left">
              <img src={AboutImg} alt="" className="about__video-img" />
              <div className="btn__play">
                <BsPlay color="#333" size={30} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="slogan">
        <div className="container">
          <div className="slogan__container">
            <div className="slogan__title">
              <h2 className="slogan__heading">Find Your Beauty Guide</h2>
              <p className="slogan__desc">
                Cosmecos is committed to cruelty-free product formulation, and
                testing.
              </p>
            </div>

            <NavLink to="/shop" className="slogan__btn btn">
              <span></span>
              Find Out
            </NavLink>
          </div>
        </div>
      </div>

      <div className="hot__products">
        <div className="container">
          <div className="products">
            <h3>Best Products</h3>
            <h2>BEST SELLERS PRODUCTS</h2>
            <p>The stylish and organized cosmetic products</p>

            <div className="list__products">
              {isLoading
                ? Array(12)
                    .fill(0)
                    .map((product, index) => {
                      return (
                        <Product.Loading
                          width="calc( calc(100% / 4) - 20px)"
                          key={index}
                        />
                      );
                    })
                : products.map((product, index) => {
                    return (
                      <Product
                        img={product.url}
                        name={product.name}
                        price={product.price}
                        width="calc( calc(100% / 4) - 20px)"
                        productId={product._id}
                      />
                    );
                  })}
            </div>
          </div>
        </div>
      </div>

      <div className="banner__two">
        <div className="container">
          <div className="banner__two-content">
            <div className="banner__two-title">
              <div className="title__style">
                <h2>Perfume</h2>
              </div>

              <h3 className="title__heading">Fresh Aroma</h3>
              <p className="title__desc">
                Dogteeth tetra coley Ragfish yellow-and-black triplefin
                grenadier dogfish shark torpedo scaly dragonfish flathead
              </p>
              <NavLink to="/shop" className="btn">
                <span></span>
                Shop Now
              </NavLink>
            </div>

            <div className="banner__two-img">
              <img src={bannerContent} alt="" />
              <div className="banner__two-sale">
                <span>-50%</span>
                <p>Sale</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="container">
          <div className="features__content">
            <div className="feature__img">
              <img src={feature1} alt="" />
              <div className="feature__img-border"></div>
              <div className="feature__img-flower">
                <img src={featureFlower} alt="" />
              </div>
            </div>

            <div className="feature__title">
              <h3 className="feature__title-style">Features</h3>
              <h2 className="feature__title-heading">
                ONLY HIGH QUALITY IS THE CORE VALUE FOR US
              </h2>
              <strong className="feature__title-bold">
                Palfmoon yellow moray tompot blenny, cuchia tompot blenny; smelt
                southern flounder grunt sculpin yellowbanded perch.
              </strong>
              <p className="feature__title-desc">
                Searobin freshwater hatchetfish sea bass orangestriped
                triggerfish white croaker. Pollock pencil catfish airbreathing
                catfish vendace pygmy sunfish spaghetti. Dogteeth tetra coley.
                Merluccid hake redlip blenny discus snake mudhead large-eye
                bream scissor-tail rasbora opaleye char dogfish beachsalmon,
                sand tilefish. Spiny eel skipping goby fierasfer tarwhine Blind
                goby tidewater goby rocket danio armorhead catfish streamer.
              </p>

              <NavLink to="/shop" className="btn">
                <span></span>
                Explore More
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="container">
          <div className="features__content features__content-wrap">
            <div className="feature__img">
              <img src={feature2} alt="" />
              <div className="feature__img-border"></div>
              <div className="feature__img-flower feature__img-flower--wrap">
                <img src={featureFlower} alt="" />
              </div>
            </div>

            <div className="feature__title">
              <h3 className="feature__title-style">Features</h3>
              <h2 className="feature__title-heading">
                A PERFUME THAT MAKES DRESSING COMPLETE
              </h2>
              <strong className="feature__title-bold">
                Flabby whalefish ocean sunfish trench rocket danio Colorado
                squawfish, cowfish round stiw perch zebra.
              </strong>
              <div className="feature__title-check">
                <div className="title__check-item">
                  <BsCheckCircleFill size={20} color="#339994" />
                  <span>
                    Frilled shark ground shark livebearer cutthroat trout
                  </span>
                </div>
                <div className="title__check-item">
                  <BsCheckCircleFill size={20} color="#339994" />
                  <span>Tonguefish devil ray smalleye squaretail dogfish</span>
                </div>
                <div className="title__check-item">
                  <BsCheckCircleFill size={20} color="#339994" />
                  <span>Porcupinefish warty angler zebra turkeyfish</span>
                </div>
              </div>

              <NavLink to="/shop" className="btn">
                <span></span>
                Explore More
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <div className="new__products">
        <div className="container">
          <div className="products__container">
            <h3 className="product__title-style">New Product</h3>
            <h2 className="product__title-heading">Meet New Arrivals</h2>

            <div className="products__content">
              <div className="list__products-new">
                <div className="product__new-item">
                  <div className="product__new-img">
                    <img src={productHot} alt="" />
                    <div className="product__item-border"></div>
                  </div>

                  <div className="product__new-title">
                    <h2 className="product__title-name">Dropped Body Oil</h2>
                    <p className="product__title-price">$15.00</p>
                  </div>
                </div>
                <div className="product__new-item">
                  <div className="product__new-img">
                    <img src={productHot} alt="" />
                    <div className="product__item-border"></div>
                  </div>

                  <div className="product__new-title">
                    <h2 className="product__title-name">Dropped Body Oil</h2>
                    <p className="product__title-price">$15.00</p>
                  </div>
                </div>
                <div className="product__new-item">
                  <div className="product__new-img">
                    <img src={productHot} alt="" />
                    <div className="product__item-border"></div>
                  </div>

                  <div className="product__new-title">
                    <h2 className="product__title-name">Dropped Body Oil</h2>
                    <p className="product__title-price">$15.00</p>
                  </div>
                </div>
                <div className="product__new-item">
                  <div className="product__new-img">
                    <img src={productHot} alt="" />
                    <div className="product__item-border"></div>
                  </div>

                  <div className="product__new-title">
                    <h2 className="product__title-name">Dropped Body Oil</h2>
                    <p className="product__title-price">$15.00</p>
                  </div>
                </div>
                <div className="product__new-item">
                  <div className="product__new-img">
                    <img src={productHot} alt="" />
                    <div className="product__item-border"></div>
                  </div>

                  <div className="product__new-title">
                    <h2 className="product__title-name">Dropped Body Oil</h2>
                    <p className="product__title-price">$15.00</p>
                  </div>
                </div>
                <div className="product__new-item">
                  <div className="product__new-img">
                    <img src={productHot} alt="" />
                    <div className="product__item-border"></div>
                  </div>

                  <div className="product__new-title">
                    <h2 className="product__title-name">Dropped Body Oil</h2>
                    <p className="product__title-price">$15.00</p>
                  </div>
                </div>
                <div className="product__flower-left">
                  <img src={flower3} alt="" />
                </div>
              </div>

              <div className="product__img">
                <img src={productHotBanner} alt="" />
                <div className="product__flower-right">
                  <img src={flower2} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="slider">
        <Slider />
      </div>
      <Footer />
    </>
  );
};

export default Home;
