import BannerPage from "../../components/BannerPage";
import banner from "../../assets/images/bg-slider.jpg";
import { RiCoupon2Line } from "react-icons/ri";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import "./checkout.scss";
import { slideHideForm, slideShowForm } from "../../components/TransformStyle";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  checkQuantitySelector,
  checkTotalProductsSelector,
  checkUserSelector,
} from "../../redux/selector";
import { to_vietnamese } from "@devjoyvn/convert-number-vn";
import { checkIsAddToCart, checkQuantity } from "../../redux/actions";
import { deleteCart } from "../../ultis/DeleteCart";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
const Checkout = () => {
  //Show products in Local
  const productsCart = useSelector(checkQuantitySelector);
  const [infoProducts, setInfoProducts] = useState([]);

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
  const [country, setCountry] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [infoUser, setInfoUser] = useState({
    fName: "",
    lName: "",
    country: "",
    state: "",
    street: "",
    phone: "",
    email: "",
  });
  useEffect(() => {
    const getCountry = async () => {
      const response = await axios({
        method: "get",
        url: "https://provinces.open-api.vn/api/?depth=3",
      });
      setCountry(response.data);
    };
    getCountry();
  }, []);
  const handleChange = (value, rest) => {
    const getCountryId = rest.idCountry;
    const getStateData = country.find(
      (country) => country.code === getCountryId
    );
    setStateData(getStateData.districts);
  };
  const [toggleCoupon, setToggleCoupon] = useState(false);

  const handleToggleCoupon = () => {
    setToggleCoupon(!toggleCoupon);
  };
  const navigate = useNavigate();
  const user = useSelector(checkUserSelector);

  const total = useSelector(checkTotalProductsSelector);
  // Delete product in Cart
  const dispatch = useDispatch();
  const handleDelete = (e) => {
    const productId = e.currentTarget.dataset.id;
    dispatch(checkQuantity(deleteCart(productId)));
    // dispatch(checkIsAddToCart(true));
  };
  const [form] = Form.useForm();

  const onFinishEdit = (values) => {
    let bills = values;
    bills.userId = user.infoUser._id;
    bills.orders = infoProducts;
    const createInfoCheckout = async () => {
      const response = await axios({
        method: "post",
        url: "http://localhost:8080/api/v1/checkout",
        data: bills,
        headers: { "Content-Type": "application/json" },
      });
    };
    createInfoCheckout();
    localStorage.setItem("carts", JSON.stringify([]));
    navigate("/checkout/result");
  };
  return (
    <>
      <BannerPage
        heading="Organic Cosmetic"
        title="Shop Checkout"
        img={banner}
      />
      <div className="container">
        <div className="checkout__container">
          <div className="checkout__coupon-toggle">
            <RiCoupon2Line size={25} color="#EAAA85" />
            <span>Have a coupon?</span>
            <span className="show-coupon" onClick={handleToggleCoupon}>
              Click here to enter your code
            </span>
          </div>
          {toggleCoupon && (
            <form className="form__coupon">
              <p>If you have a coupon code, please apply it below.</p>
              <div className="coupon__container">
                <input
                  type="text"
                  className="coupon__input"
                  placeholder="Coupon code..."
                />
                <div className="coupon__btn">Apply Coupon</div>
              </div>
            </form>
          )}
          <div className="detail__container">
            <div className="detail__container-left">
              <h3 className="detail__form-title">Billing details</h3>
              <Form
                form={form}
                name="basic"
                labelCol={{
                  span: 6,
                }}
                wrapperCol={{
                  span: 18,
                }}
                onFinish={onFinishEdit}
                autoComplete="off"
              >
                <div className="input__fullname">
                  <Form.Item
                    label="First Name"
                    name="fName"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input placeholder="Type first name..." />
                  </Form.Item>
                  <Form.Item
                    label="Last Name"
                    name="lName"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input placeholder="Type last name..." />
                  </Form.Item>
                </div>

                <Form.Item
                  label="Select Country"
                  name="country"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    placeholder="Select country..."
                    onChange={handleChange}
                  >
                    {Object.entries(country).map((state, index) => {
                      return (
                        <Select.Option
                          value={state[1].name}
                          key={index}
                          idCountry={state[1].code}
                        >
                          {state[1].name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Select States"
                  name="state"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select placeholder="Select States...">
                    {stateData.map((state, index) => {
                      return (
                        <Select.Option value={state.name} key={index}>
                          {state.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Street"
                  name="street"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Type street..." />
                </Form.Item>
                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Type phone..." />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Type email..." type="email" />
                </Form.Item>

                <h3 className="detail__form-title heading__margin">
                  Additional information
                </h3>
                <Form.Item label="Order note">
                  <TextArea rows={4} />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ height: "50px", margin: "0 auto" }}
                >
                  PLACE ORDER
                </Button>
              </Form>
            </div>
            <div className="detail__container-right">
              <h3 className="detail__form-title">Your order</h3>
              <div className="list__order">
                {infoProducts.length > 0 &&
                  infoProducts.map((product, index) => {
                    return (
                      <div className="product__cart" key={index}>
                        <img
                          src={product.url}
                          className="product__cart-img"
                          alt=""
                        />
                        <div className="product__cart-title">
                          <h3 className="cart__title-name">{product.name}</h3>
                          <span className="cart__title-price">
                            {product.price} × {product.quantity}
                          </span>
                        </div>
                        <div
                          className="btn__cart-delete"
                          data-id={product._id}
                          onClick={handleDelete}
                        >
                          <GrClose size={20} />
                        </div>
                      </div>
                    );
                  })}
              </div>
              <h3 className="detail__form-title heading__margin">
                Cart Totals
              </h3>
              <div className="detail__total">
                <div className="total__title">
                  <span>Text Total</span>
                  <span>Total</span>
                </div>
                <div className="total__price">
                  <span>{to_vietnamese(total)}</span>
                  <span>{total} VNĐ</span>
                </div>
              </div>
              <h3 className="detail__form-title heading__margin">
                Payment Method
              </h3>
              <div className="detail__payment-noti">
                <span>
                  Sorry, it seems that there are no available payment methods
                  for your state. Please contact us if you require assistance or
                  wish to make alternate arrangements.
                </span>
              </div>
              <span>
                Your personal data will be used to process your order, support
                your experience throughout this website, and for other purposes
                described in our privacy policy.
              </span>
              <label htmlFor="terms" className="terms">
                <input type="checkbox" id="terms" />
                <span id="terms">
                  I have read and agree to the website terms and conditions *
                </span>
              </label>
              {/* <div className="detail__order-btn" onClick={handleSubmit}>
                Place Order
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
