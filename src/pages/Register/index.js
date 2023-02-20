import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./register.scss";
import axios from "axios";
import InputField from "../../components/InputField/inputField";
import { useDispatch } from "react-redux";
import { checkUser } from "../../redux/actions";
import { BiErrorCircle } from "react-icons/bi";
const Register = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [currentUser, setCurrentUser] = useState([]);
  const [errors, setErrors] = useState([]);
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8080/api/v1/auth/register",
        data: formData,
        headers: { "Content-Type": "application/json" },
      });
      //If register don't error
      dispatch(checkUser(response.data.data.result));
      setCurrentUser(response.data.status);
      localStorage.setItem("token", JSON.stringify(response.data.data.token));
    } catch (error) {
      console.log(error.response.data.message);
      setErrors(error.response.data.message);
    }
  };

  const handelInput = (e) => {
    setFormData((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="register__form">
      <div className="container__form">
        <div className="errors__box">
          {errors &&
            errors.map((error, index) => (
              <div className="errors__box-item" key={index}>
                <BiErrorCircle color="red" />
                <p className="errors__item-title">{error.message}</p>
              </div>
            ))}
        </div>
        <h3 className="title__register">Hello, friend!</h3>
        {currentUser === "success" && <Navigate to="/" replace={true} />}
        <form className="form__input" onSubmit={handelSubmit}>
          <div className="input__item">
            <InputField
              type="text"
              placeholder="Name..."
              name="name"
              value={formData.name}
              onChange={handelInput}
            ></InputField>
          </div>

          <div className="input__item">
            <InputField
              type="email"
              placeholder="Email..."
              name="email"
              value={formData.email}
              onChange={handelInput}
            ></InputField>
          </div>

          <div className="input__item">
            <InputField
              type="password"
              placeholder="Password..."
              name="password"
              value={formData.password}
              onChange={handelInput}
            ></InputField>
          </div>

          <div className="input__check">
            <input type="checkbox" name="checkbox" />
            <span>
              I've read and agree to <strong>Terms and Conditions</strong>
            </span>
          </div>
          <input
            type="submit"
            className="input__submit"
            value="Create Account"
          />
          <div className="input__login">
            <span>
              Already have an account ?{" "}
              <Link to="/login" className="input__link">
                Sign In
              </Link>
            </span>
          </div>
        </form>
      </div>
      <div className="register__intro">
        <h2>Glad to see You!</h2>
        <p>Join us to enjoy the taste of life</p>
      </div>
    </div>
  );
};

export default Register;
