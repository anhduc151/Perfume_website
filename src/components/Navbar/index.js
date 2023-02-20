import { Link, NavLink, useNavigate } from "react-router-dom";
import "./navbar.scss";
import { BsHeart, BsHandbag, BsSearch } from "react-icons/bs";
import { FaBuromobelexperte } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { useEffect, useState } from "react";
import { activeStyle, slideUpStyle, slideDownStyle } from "../TransformStyle";
import { useDispatch, useSelector } from "react-redux";
import {
  checkQuantitySelector,
  checkTotalProductsSelector,
  checkUserSelector,
} from "../../redux/selector";
import axios from "axios";
import { deleteCart } from "../../ultis/DeleteCart";
import { checkQuantity, checkTotalProducts } from "../../redux/actions";
import { emptyCart, iconUser } from "../../assets/images";
import Dropdown from "../../admin/components/Dropdown";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import ModalBox from "../../admin/components/Modal";
import { Input } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  ContainerOutlined,
} from "@ant-design/icons";
const Navbar = () => {
  const [modalSearch, setModalSearch] = useState(false);
  const dispatch = useDispatch();
  const showModalSearch = () => {
    setModalSearch(true);
  };

  const hideModalSearch = () => {
    setModalSearch(false);
  };
  //Get currentUser in Store Redux
  const user = useSelector(checkUserSelector);
  const [currentUser, setCurrentUser] = useState(user);
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);
  //Get quantityCart from Store in Redux
  const productsCart = useSelector(checkQuantitySelector);
  const [quantityCart, setQuantityCart] = useState(1);
  useEffect(() => {
    setQuantityCart(productsCart.length);
  }, [productsCart]);
  //Get info products cart
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
  //Delete cart in LocalStorage
  const handleDeleteCart = (e) => {
    const productId = e.currentTarget.dataset.id;
    dispatch(checkQuantity(deleteCart(productId)));
  };

  const totalProduct = useSelector(checkTotalProductsSelector);
  useEffect(() => {
    dispatch(checkTotalProducts(infoProducts));
  }, [infoProducts]);

  const [edit, setEdit] = useState(false);
  const handleEditInfoUser = () => {
    setEdit((pre) => !pre);
  };
  const [checkPass, setCheckPass] = useState("");
  const handleCurrentPass = (e) => {
    const data = {
      email: currentUser.infoUser.email,
      password: e.target.value,
    };
    const checkPass = async () => {
      try {
        const response = await axios({
          method: "POST",
          url: "http://localhost:8080/api/v1/auth/login",
          data: data,
          headers: { "Content-Type": "application/json" },
        });
        setCheckPass(response.data.status);
      } catch (error) {
        setCheckPass(error.response.data.status);
      }
    };
    checkPass();
  };
  const [newPass, setNewPass] = useState("");
  const handleChangePass = () => {
    const newData = {
      email: currentUser.infoUser.email,
      password: newPass,
    };
    const changePass = async () => {
      try {
        const response = await axios({
          method: "POST",
          url: "http://localhost:8080/api/v1/auth/current_user/change_pass",
          data: newData,
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        console.log(error);
      }
    };
    changePass();
  };
  const formEditUser = (
    <form className="form__container">
      <div className="form__image">
        <img src={iconUser} alt="" />
      </div>
      <div className="form__input">
        <div className="input__name">
          <span>Username :</span>
          <Input className="input" value={currentUser.infoUser.name} disabled />
        </div>
        <div className="input__email">
          <span>Email :</span>
          <Input
            className="input"
            value={currentUser.infoUser.email}
            disabled
          />
        </div>
        <div className="btn_edit" onClick={handleEditInfoUser}>
          Change password
        </div>
        {edit && (
          <div className="form__edit-password">
            <div className="password__old">
              <span>Current password :</span>
              <Input.Password
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                placeholder="Type current password..."
                className="input"
                onBlur={handleCurrentPass}
              />
            </div>
            {checkPass === "error" ? (
              <div style={{ color: "red" }}>Mật khẩu không đúng !</div>
            ) : checkPass === "success" ? (
              <div style={{ color: "green" }}>Mật khẩu chính xác !</div>
            ) : null}

            <div className="password__new">
              <span>New password :</span>
              <Input.Password
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                placeholder="Type new password..."
                className="input"
                onChange={(e) => setNewPass(e.target.value)}
              />
            </div>
            <div className="btn_save" onClick={handleChangePass}>
              Save
            </div>
          </div>
        )}
      </div>
    </form>
  );
  const dropdownUser = [
    {
      label: (
        <ModalBox
          title="PROFILE USER"
          icon={
            <>
              <UserOutlined />
            </>
          }
          label="Profile"
          content={formEditUser}
        />
      ),
      key: "1",
    },
    {
      label: (
        <Link to="/user/order">
          <ContainerOutlined />
          <span style={{ marginLeft: "8px" }}>Order</span>
        </Link>
      ),
      key: "2",
    },
    {
      label: (
        <Link to="/login">
          <LogoutOutlined />
          <span style={{ marginLeft: "8px" }}>Logout</span>
        </Link>
      ),
      key: "3",
    },
  ];
  const navigate = useNavigate();
  const handleViewCart = () => {
    navigate("/carts");
  };
  const handleProductFavorite = () => {
    navigate("/favorite");
  };
  return (
    <div className="navbar">
      <div className="burger">
        <FaBuromobelexperte size={25} />
      </div>
      <div className="navbar__list">
        <NavLink
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          to="/"
          className="navbar__list-item"
        >
          Home
        </NavLink>

        <NavLink
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          to="/style"
          className="navbar__list-item"
        >
          Style
        </NavLink>
        <NavLink to="/" className="navbar__list-item logo">
          VA Perfume.
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          to="/contact"
          className="navbar__list-item"
        >
          Contact
        </NavLink>
      </div>
      <div className="list__btn">
        <BsHeart
          size={25}
          className="btn__item"
          onClick={handleProductFavorite}
        />
        <div className="btn__bag" onClick={handleViewCart}>
          <BsHandbag size={25} className="btn__item" />
          <span className="number__bag">{quantityCart}</span>
          <div className="modal__bag">
            <div className="list__product-cart">
              {infoProducts.length > 0 ? (
                infoProducts.map((product, index) => (
                  <div className="product__cart" key={index}>
                    <img
                      src={product.url}
                      className="product__cart-img"
                      alt=""
                    />
                    <div className="product__cart-title">
                      <h3 className="cart__title-name">{product.name}</h3>
                      <p className="cart__title-price">
                        {product.quantity} x {product.price} VND
                      </p>
                    </div>
                    <div
                      className="btn__cart-delete"
                      onClick={handleDeleteCart}
                      data-id={product._id}
                    >
                      <GrClose size={20} />
                    </div>
                  </div>
                ))
              ) : (
                <div className="cart__message">
                  <img src={emptyCart} alt="" />
                </div>
              )}
            </div>
            {infoProducts.length > 0 && (
              <div className="product__cart-total">
                <h3 className="product__cart-ammount">
                  Subtotal :{totalProduct}
                </h3>
                <div className="product__cart-btns">
                  <Link to="/carts" className="cart__btn-view">
                    View Cart
                  </Link>
                  <Link to="/checkout" className="cart__btn-checkout">
                    Checkout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        {Object.keys(currentUser.infoUser).length === 0 ? (
          <div className="btn__login">
            <NavLink to="/login" className="btn__login-link">
              Đăng Nhập
            </NavLink>
          </div>
        ) : (
          <Dropdown
            label={`Hello, ${currentUser.infoUser.name}`}
            items={dropdownUser}
          ></Dropdown>
        )}
        <div className="btn__search">
          <BsSearch size={25} className="btn__item" onClick={showModalSearch} />
        </div>
      </div>
      {
        <div
          className="modal__search"
          style={modalSearch ? slideUpStyle : slideDownStyle}
        >
          <BsSearch size={25} className="modal__search-btn" />
          <input type="text" placeholder="Type Your Search..." />
          <GrClose
            size={25}
            className="modal__search-btn"
            onClick={hideModalSearch}
          />
        </div>
      }
      {modalSearch && <div className="overlay" onClick={hideModalSearch}></div>}
    </div>
  );
};

export default Navbar;
