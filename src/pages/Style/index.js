import BannerPage from "../../components/BannerPage";
import { hero, productNewItem } from "../../assets/images";
import { FaList } from "react-icons/fa";
import { BsFillGrid3X3GapFill, BsSearch } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import "./style.scss";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Product from "../../components/Product";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import ToastSuccess from "../../components/Toast/toastSuccess";
import { useDispatch, useSelector } from "react-redux";
import {
  checkIsAddToCartSelector,
  checkProductFavoriteSelector,
} from "../../redux/selector";
import { checkIsAddToCart } from "../../redux/actions";
const Style = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    const showDataProducts = async () => {
      const response = await axios({
        method: "get",
        url: "http://localhost:8080/api/v1/products",
        headers: { "Content-Type": "application/json" },
      });
      setDataProduct(response.data.data);
    };
    showDataProducts();
  }, []);
  const dispatch = useDispatch();
  const isAddToCart = useSelector(checkIsAddToCartSelector);
  useEffect(() => {
    if (!isAddToCart) return;
    setTimeout(() => dispatch(checkIsAddToCart(false)), 2000);
  }, [isAddToCart]);
  // const productLike = useSelector(checkProductFavoriteSelector);
  // console.log(productLike);
  return (
    <>
      <BannerPage heading="All Perfume" title="Shop catalog" img={hero} />
      {/* <Product.Loading width="280px" /> */}
      <div className="main__products">
        {isAddToCart && <ToastSuccess title="yay, đã thêm vào túi hàng!" />}
        <div className="container products__container-flex">
          <div className="products__list">
            <div className="products__list-catalog">
              <form className="catalog__sort" method="get">
                <select
                  name="orderby"
                  className="orderby"
                  defaultValue="menu_order"
                >
                  <option value="menu_order">Default sorting</option>
                  <option value="popularity">Sort by popularity</option>
                  <option value="rating">Sort by average rating</option>
                  <option value="date">Sort by latest</option>
                  <option value="price">Sort by price: low to high</option>
                  <option value="price-desc">Sort by price: high to low</option>
                </select>
              </form>

              <div className="catalog__mode">
                <div className="catalog__mode-item">
                  <BsFillGrid3X3GapFill size={20} />
                </div>
                <div className="catalog__mode-item">
                  <FaList size={20} />
                </div>
              </div>
            </div>

            <div className="products__content">
              {isLoading
                ? Array(12)
                    .fill(0)
                    .map((product, index) => {
                      return (
                        <Product.Loading
                          width="calc( calc(100% / 3) - 20px)"
                          key={index}
                        />
                      );
                    })
                : dataProduct.map((product) => {
                    return (
                      <Product
                        img={product.url}
                        name={product.name}
                        price={product.price}
                        width="calc( calc(100% / 3) - 20px)"
                        productId={product._id}
                      />
                    );
                  })}
            </div>
          </div>

          <div className="products__sidebar">
            <div className="products__sidebar-search">
              <input
                type="text"
                className="sidebar__search-input"
                placeholder="Search products..."
              />
              <div className="sidebar__search-btn">
                <BsSearch size={25} />
              </div>
            </div>

            <div className="products__sidebar-category">
              <h4 className="products__sidebar-title">
                <span>Categories</span>
              </h4>
              <div className="sidebar__category-list">
                <div className="category__list-item">
                  <BiCategoryAlt />
                  <Link to="/" className="category__item-name">
                    Awesome Soap
                  </Link>
                </div>
                <div className="category__list-item">
                  <BiCategoryAlt />
                  <Link to="/" className="category__item-name">
                    Body Care
                  </Link>
                </div>
                <div className="category__list-item">
                  <BiCategoryAlt />
                  <Link to="/" className="category__item-name">
                    Cosmetics
                  </Link>
                </div>
                <div className="category__list-item">
                  <BiCategoryAlt />
                  <Link to="/" className="category__item-name">
                    Hair Care
                  </Link>
                </div>
                <div className="category__list-item">
                  <BiCategoryAlt />
                  <Link to="/" className="category__item-name">
                    Makeup Equipment
                  </Link>
                </div>
                <div className="category__list-item">
                  <BiCategoryAlt />
                  <Link to="/" className="category__item-name">
                    Perfect Concealer
                  </Link>
                </div>
                <div className="category__list-item">
                  <BiCategoryAlt />
                  <Link to="/" className="category__item-name">
                    Uncategorized
                  </Link>
                </div>
              </div>
            </div>

            <div className="products__sidebar-new">
              <h4 className="products__sidebar-title">
                <span>Meet New Arrivals</span>
              </h4>
              <div className="list__products-new">
                <div className="products__new-item">
                  <div className="new__item-img">
                    <img src={productNewItem} alt="" />
                  </div>
                  <div className="new__item-title">
                    <h3 className="new__item-heading">Cream Soap</h3>
                    <p className="new__item-price">150.000VND</p>
                  </div>
                </div>
                <div className="products__new-item">
                  <div className="new__item-img">
                    <img src={productNewItem} alt="" />
                  </div>
                  <div className="new__item-title">
                    <h3 className="new__item-heading">Cream Soap</h3>
                    <p className="new__item-price">150.000VND</p>
                  </div>
                </div>
                <div className="products__new-item">
                  <div className="new__item-img">
                    <img src={productNewItem} alt="" />
                  </div>
                  <div className="new__item-title">
                    <h3 className="new__item-heading">Cream Soap</h3>
                    <p className="new__item-price">150.000VND</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="products__sidebar-tag">
              <h4 className="products__sidebar-title">
                <span>Meet New Arrivals</span>
              </h4>
              <div className="list__sidebar-tag">
                <div className="sidebar__tag-item">Cosmetic</div>
                <div className="sidebar__tag-item">Facecare</div>
                <div className="sidebar__tag-item">Perfume</div>
                <div className="sidebar__tag-item">Skincare</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Style;
