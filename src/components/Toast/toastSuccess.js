import { useState } from "react";
import "./toast.scss";
const ToastSuccess = ({ title }) => {
  // const [toogleToast, setToggleToast] = useState(true);
  // const handleClose = () => {
  //   setToggleToast(false);
  // };
  return (
    <>
      <div id="success-box">
        <div className="dot" />
        <div className="dot two" />
        <div className="face">
          <div className="eye" />
          <div className="eye right" />
          <div className="mouth happy" />
        </div>
        <div className="shadow scale" />
        <div className="message">
          <h1 className="alert">Success!</h1>
          <p>{title}</p>
        </div>
        {/* <button className="button-box">
          <h1 className="green">continue</h1>
        </button> */}
      </div>
    </>
  );
};

export default ToastSuccess;
