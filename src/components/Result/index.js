import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
const CheckoutResult = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/style");
  };
  return (
    <Result
      status="success"
      title="Your order has been placed successfully"
      subTitle="Your order is waiting for confirmation, please wait..."
      extra={[
        <Button type="primary" key="console" onClick={handleNavigate}>
          Buy Again
        </Button>,
      ]}
    />
  );
};

export default CheckoutResult;
