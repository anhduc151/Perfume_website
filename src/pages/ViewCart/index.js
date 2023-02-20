import { bannerCart } from "../../assets/images";
import BannerPage from "../../components/BannerPage";
import { GrClose } from "react-icons/gr";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import "./viewCart.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  checkIsAddToCartSelector,
  checkQuantitySelector,
  checkTotalProductsSelector,
  checkUserSelector,
} from "../../redux/selector";
import { useDispatch, useSelector } from "react-redux";
import {
  checkDecreaseProduct,
  checkIncreaseProduct,
  checkIsAddToCart,
  checkQuantity,
  checkTotalProducts,
} from "../../redux/actions";
import { deleteCart } from "../../ultis/DeleteCart";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { to_vietnamese } from "@devjoyvn/convert-number-vn";
import { useNavigate } from "react-router-dom";
import { Empty } from "antd";
const ViewCart = () => {
  const [infoProducts, setInfoProducts] = useState([]);
  const productsCart = useSelector(checkQuantitySelector);
  useEffect(() => {
    const getInfoProducts = async () => {
      const response = await axios({
        method: "post",
        url: "http://localhost:8080/api/v1/products",
        data: productsCart,
        headers: { "Content-Type": "application/json" },
      });
      setInfoProducts(response.data.data);
    };
    getInfoProducts();
  }, [productsCart]);
  const decrease = (id) => {
    dispatch(checkDecreaseProduct(id));
  };
  const increase = (id) => {
    dispatch(checkIncreaseProduct(id));
  };
  // Delete product in Cart
  const dispatch = useDispatch();
  const handleDelete = (e) => {
    const productId = e.currentTarget.dataset.id;
    dispatch(checkQuantity(deleteCart(productId)));
    dispatch(checkIsAddToCart(true));
  };
  const isAddToCart = useSelector(checkIsAddToCartSelector);
  useEffect(() => {
    if (!isAddToCart) return;
    setTimeout(() => dispatch(checkIsAddToCart(false)), 2000);
  }, [isAddToCart]);
  // Update Cart
  const total = useSelector(checkTotalProductsSelector);
  const handleUpdate = () => {
    dispatch(checkTotalProducts(infoProducts));
    localStorage.setItem("carts", JSON.stringify(productsCart));
  };
  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate("/checkout");
  };
  return (
    <>
      <BannerPage
        heading="Organic Cosmetic"
        title="Shop Cart"
        img={bannerCart}
      />
      <div className="container">
        <div className="form__container">
          {isAddToCart && (
            <Alert severity="success" className="message__box">
              <AlertTitle className="message__title">Success</AlertTitle>
              Deleted successfully! <strong>check it out!</strong>
            </Alert>
          )}
          <div className="cart__container">
            <div className="product__head">
              <div className="product__remove"></div>
              <div className="product__thumnail"></div>
              <div className="product__name">Product</div>
              <div className="product__price">Price</div>
              <div className="product__quantity">Quantity</div>
              <div className="product__subtotal">Subtotal</div>
            </div>
            <div className="list__cart">
              {infoProducts.length > 0 ? (
                infoProducts.map((product, index) => {
                  return (
                    <div className="cart__item" key={index}>
                      <div
                        className="product__remove"
                        data-id={product._id}
                        onClick={handleDelete}
                      >
                        <GrClose size={20} />
                      </div>
                      <div className="product__thumnail">
                        <img src={product.url} alt="" />
                      </div>
                      <div className="product__name">{product.name}</div>
                      <div className="product__price">{product.price} VND</div>
                      <div className="product__quantity">
                        <div
                          className="quantity-minus"
                          data-id={product._id}
                          onClick={() => decrease(product._id)}
                        >
                          <AiOutlineMinus size={15} />
                        </div>
                        <div className="quantity-number">
                          {product.quantity}
                        </div>
                        <div
                          className="quantity-plus"
                          onClick={() => increase(product._id)}
                        >
                          <AiOutlinePlus size={15} />
                        </div>
                      </div>
                      <div className="product__subtotal">
                        {product.price * product.quantity} VND
                      </div>
                    </div>
                  );
                })
              ) : (
                <Empty style={{ margin: "40px 0" }} />
              )}
            </div>

            <div className="cart__featured">
              <div className="cart__featured-coupon">
                <input
                  type="text"
                  className="input__coupon"
                  placeholder="Coupon code"
                />
                <div className="btn__coupon">Apply coupon</div>
              </div>
              <div className="cart__featured-update" onClick={handleUpdate}>
                Update cart
              </div>
            </div>
          </div>
        </div>
        <div className="form__total">
          <h2 className="form__total-heading">Cart totals</h2>
          <div className="form__total-item">
            <h3 className="cart__total-heading">Text Total</h3>
            <span className="cart__total-price">
              {to_vietnamese(total)} VND
            </span>
          </div>
          <div className="form__total-item">
            <h3 className="cart__total-heading">Total</h3>
            <span className="cart__total-price">{total} VND</span>
          </div>
          <div className="cart__total-checkout" onClick={handleCheckout}>
            Proceed to checkout
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCart;
