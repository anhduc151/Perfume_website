import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BannerPage from "../../components/BannerPage";
import Footer from "../../components/Footer";
import banner from "../../assets/images/page-title-pic1.jpg";
import { BsHeart } from "react-icons/bs";
import "./productPage.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  checkDecreaseProduct,
  checkIncreaseProduct,
  checkQuantity,
} from "../../redux/actions";
import { checkQuantitySelector } from "../../redux/selector";
import AddToCard from "../../ultis/AddCardToLocal";
import LoadingSkeleton from "../../components/Product/Loading/LoadingSkeleton";
const ProductPage = () => {
  const idProduct = useParams();
  const dispatch = useDispatch();
  const [dataProduct, setDataProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const productsCart = useSelector(checkQuantitySelector);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    const getProduct = async () => {
      const response = await axios({
        method: "get",
        url: `http://localhost:8080/api/v1/products/${idProduct.id}`,
      });
      setDataProduct(response.data.data);
    };
    getProduct();
  }, [productsCart]);
  //Decrease - Increase Product
  const [quantity, setQuantity] = useState(1);
  const checkIsProduct = () => {
    let isProduct;
    const productIndex = productsCart.findIndex((product) => {
      return product._id === idProduct.id;
    });
    if (productIndex > -1) {
      isProduct = productsCart[productIndex].quantity;
    } else {
      isProduct = quantity;
    }
    return isProduct;
  };
  const decrease = (id) => {
    dispatch(checkDecreaseProduct(id));
    setQuantity((pre) => pre - 1);
  };
  const increase = (id) => {
    dispatch(checkIncreaseProduct(id));
    setQuantity((pre) => pre + 1);
  };
  // Add to card
  const handleAddToCart = () => {
    let currentQuantity = checkIsProduct();
    const productIndex = productsCart.findIndex((product) => {
      return product._id === idProduct.id;
    });
    if (productIndex > -1) {
      productsCart[productIndex].quantity = currentQuantity;
      localStorage.setItem("carts", JSON.stringify(productsCart));
      console.log(productsCart);
    } else {
      let newProduct = {
        _id: idProduct.id,
        quantity: currentQuantity,
      };
      AddToCard(dataProduct, currentQuantity);
      dispatch(checkQuantity(newProduct));
    }
  };
  return (
    <>
      <BannerPage
        heading="Chava Perfume"
        title={dataProduct.name}
        img={banner}
      />
      <div className="product__container">
        <div className="container">
          {isLoading ? (
            <ProductPage.productPageLoading />
          ) : (
            <div className="product__info">
              <div className="product__info-img">
                <img src={dataProduct.url} alt="" />
              </div>
              <div className="product__info-title">
                <p className="info__title-price">{dataProduct.price} VND</p>
                <p className="info__title-desc">{dataProduct.desc}</p>
                <p className="info__title-cate">
                  <span>Category:</span>
                  {dataProduct.category}
                </p>
                <div className="product__info-tags">
                  <span>Tags :</span>
                  <div className="info__tags-item">Cosmetic</div>
                  <div className="info__tags-item">Perfume</div>
                </div>
                <div className="product__info-btn">
                  <div className="info__btn-quantity">
                    <div
                      className="btn__quantity-minus btn__quantity-item"
                      name="count"
                      onClick={() => decrease(dataProduct._id)}
                    >
                      -
                    </div>
                    <div className="btn__quantity btn__quantity-item">
                      {checkIsProduct()}
                    </div>
                    <div
                      className="btn__quantity-plus btn__quantity-item"
                      name="count"
                      onClick={() => increase(dataProduct._id)}
                    >
                      +
                    </div>
                  </div>
                  <div className="info__btn-add" onClick={handleAddToCart}>
                    Add to card
                  </div>
                  <div className="info__btn-heart">
                    <BsHeart size={25} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="product__desc">
            <div className="product__btn-tab">
              <div className="btn__tab-desc btn__tab-item">Description</div>
              <div className="btn__tab-comment btn__tab-item">Reviews</div>
            </div>
            <div className="product__list-desc">
              <div className="list__desc-item">
                <div className="desc__item-name">Nhãn hiệu</div>
                <div className="desc__item-param">{dataProduct.trade_mark}</div>
              </div>
              <div className="list__desc-item">
                <div className="desc__item-name">Trọng lượng</div>
                <div className="desc__item-param">300gram</div>
              </div>
              <div className="list__desc-item">
                <div className="desc__item-name">Thể tích</div>
                <div className="desc__item-param">{dataProduct.volume}</div>
              </div>
              <div className="list__desc-item">
                <div className="desc__item-name">Loại</div>
                <div className="desc__item-param">{dataProduct.type}</div>
              </div>
              <div className="list__desc-item">
                <div className="desc__item-name">Giới tính</div>
                <div className="desc__item-param">{dataProduct.sex}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const productPageLoading = () => {
  return (
    <div className="product__loading">
      <div className="product__loading-img">
        <LoadingSkeleton height="450px" />
      </div>
      <div className="product__loading-title">
        <LoadingSkeleton width="150px" height="30px" />
        <LoadingSkeleton height="400px" />
      </div>
    </div>
  );
};
ProductPage.productPageLoading = productPageLoading;
export default ProductPage;
