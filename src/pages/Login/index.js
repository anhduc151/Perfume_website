import axios from "axios";
import { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import InputField from "../../components/InputField/inputField";
import "./login.scss";
import { useDispatch } from "react-redux";
import { checkUser } from "../../redux/actions";
import { BiErrorCircle } from "react-icons/bi";
import { Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
const Login = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [currentUser, setCurrentUser] = useState([]);
  const handelSubmit = async (e) => {
    console.log(errors);
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8080/api/v1/auth/login",
        data: formData,
        headers: { "Content-Type": "application/json" },
      });
      dispatch(checkUser(response.data.data.result));
      setCurrentUser(response.data.status);
      localStorage.setItem("token", JSON.stringify(response.data.data.token));
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data.data.message);
    }
  };
  const handelInput = (e) => {
    setFormData((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  };
  return (
    <div className="login__form">
      <div className="container__form">
        {errors.length === 0 ? null : (
          <div className="errors__box">
            <div className="errors__box-item">
              <BiErrorCircle color="red" size={20} />
              <span
                className="errors__item-title"
                style={{ color: "red", marginLeft: "8px", fontSize: "14px" }}
              >
                {errors}
              </span>
            </div>
          </div>
        )}
        <h3 className="title__login">Wellcome back, friend!</h3>
        <form className="form__input" onSubmit={handelSubmit}>
          {currentUser === "success" && <Navigate to="/" replace={true} />}

          <Input
            placeholder="Email..."
            type="email"
            name="email"
            value={formData.name}
            onChange={handelInput}
          />

          {formData.email === "" ? (
            <div style={{ color: "red", fontSize: "12px" }}>
              Vui lòng nhập Email
            </div>
          ) : null}
          <Input.Password
            placeholder="Password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            name="password"
            value={formData.name}
            onChange={handelInput}
          />
          {formData.password === "" ? (
            <div style={{ color: "red", fontSize: "12px" }}>
              Vui lòng nhập Password
            </div>
          ) : null}
          <div className="input__check">
            <input type="checkbox" name="checkbox" />
            <span>
              I've read and agree to <strong>Terms and Conditions</strong>
            </span>
          </div>
          <input type="submit" className="input__submit" value="Let's go" />
          <p className="input___register-title">
            Do not have an account ?{" "}
            <NavLink to="/register" className="input__register">
              Sign Up
            </NavLink>
          </p>
        </form>
      </div>
      <div className="login__intro">
        <h2>Glad to see You!</h2>
        <p>VA Perfume is happy to serve you</p>
        <p>Our motto "prestige, quality, thoughtful"</p>
        <p>-Founder Nguyen Van Anh-</p>
      </div>
    </div>
  );
};

export default Login;
