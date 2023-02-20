import { Steps } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const Transaction = () => {
  const idOrder = useParams();
  const [getChẹckout, setGetCheckout] = useState({});
  useEffect(() => {
    const getCheckout = async () => {
      const response = await axios({
        method: "GET",
        url: `http://localhost:8080/api/v1/checkout/${idOrder.id}`,
      });
      console.log(response.data.data);
      setGetCheckout(response.data.data);
    };
    getCheckout();
  }, []);
  return (
    <>
      <div
        className="container"
        style={{
          backgroundColor: "#F9FBFA",
          minHeight: "500px",
          marginTop: "50px",
        }}
      >
        <Steps
          current={getChẹckout.status ? 1 : 0}
          style={{ padding: "0 10px" }}
          items={[
            {
              title: "Pending",
              description: "Wait for confirmation",
            },
            {
              title: "Confirmed",
              description: "Order confirmed",
            },
          ]}
        />
      </div>
    </>
  );
};

export default Transaction;
