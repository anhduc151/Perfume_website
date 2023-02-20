import "./toast.scss";
const ToastError = () => {
  return (
    <>
      <div id="error-box">
        <div className="dot" />
        <div className="dot two" />
        <div className="face2">
          <div className="eye" />
          <div className="eye right" />
          <div className="mouth sad" />
        </div>
        <div className="shadow move" />
        <div className="message">
          <h1 className="alert">Opps!</h1>
          <p>No products in the cart.</p>
        </div>
        {/* <button className="button-box">
          <h1 className="red">do shopping</h1>
        </button> */}
      </div>
    </>
  );
};

export default ToastError;
