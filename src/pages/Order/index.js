import { CarOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./order.scss";
const Order = () => {
  const [infoCheckout, setInfoCheckout] = useState([]);
  const token = JSON.parse(localStorage.getItem("token")) || {};
  useEffect(() => {
    const getCheckout = async () => {
      const response = await axios({
        method: "post",
        url: "http://localhost:8080/api/v1/checkout/current_checkout",
        data: token,
        headers: { "Content-Type": "application/json" },
      });
      setInfoCheckout(response.data.data);
    };
    getCheckout();
  }, []);
  const convertDate = (data) => {
    const time = data;
    const date = new Date(time);
    const dateformat =
      date.getHours() + ":" + date.getMinutes() + ", " + date.toDateString();
    return dateformat;
  };
  const tabItem = (
    <div className="list__order">
      {infoCheckout.map((order) => {
        return (
          <Link to={`/transaction/${order._id}`} className="order__item">
            <div className="order__status">
              <span style={{ paddingLeft: "8px" }}>
                Ngày đặt: {convertDate(order.createAt)}
              </span>
              <div className="order__status-desc">
                <CarOutlined />
                {!order.status ? (
                  <span style={{ margin: "0 8px" }}>Chờ xác nhận đơn hàng</span>
                ) : (
                  <span style={{ margin: "0 8px" }}>
                    Đơn hàng đã được xác nhận
                  </span>
                )}
                {!order.status ? (
                  <span
                    className="order__status-title"
                    style={{ color: "#EE4D2D" }}
                  >
                    Chờ xác nhận
                  </span>
                ) : (
                  <span
                    className="order__status-title"
                    style={{ color: "green" }}
                  >
                    Đang vận chuyển
                  </span>
                )}
              </div>
            </div>
            {order.orders.map((product) => {
              return (
                <div className="order__product">
                  <div className="order__product-img">
                    <img src={product.url} alt="" />
                  </div>
                  <div className="order__product-title">
                    <span className="product__title-name">{product.name}</span>
                    <span className="product__title-type">
                      Loại: {product.type}
                    </span>
                    <span className="product__title-quantity">
                      x{product.quantity}
                    </span>
                  </div>
                  <span className="order__product-price">
                    {product.price} VNĐ
                  </span>
                </div>
              );
            })}
          </Link>
        );
      })}
    </div>
  );
  function filterStatus(status) {
    const result = infoCheckout.filter((order) => {
      return order.status === status;
    });
    return result;
  }
  return (
    <div className="container">
      <div className="order__container">
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: `Tất cả`,
              key: "1",
              children: tabItem,
            },
            {
              label: `Chờ xác nhận`,
              key: "2",
              children: (
                <div className="list__order">
                  {filterStatus(false).map((order) => {
                    return (
                      <Link
                        to={`/transaction/${order._id}`}
                        className="order__item"
                      >
                        <div className="order__status">
                          <span style={{ paddingLeft: "8px" }}>
                            Ngày đặt: {convertDate(order.createAt)}
                          </span>
                          <div className="order__status-desc">
                            <CarOutlined />
                            {!order.status ? (
                              <span style={{ margin: "0 8px" }}>
                                Chờ xác nhận đơn hàng
                              </span>
                            ) : (
                              <span style={{ margin: "0 8px" }}>
                                Đơn hàng đã được xác nhận
                              </span>
                            )}
                            {!order.status ? (
                              <span
                                className="order__status-title"
                                style={{ color: "#EE4D2D" }}
                              >
                                Chờ xác nhận
                              </span>
                            ) : (
                              <span
                                className="order__status-title"
                                style={{ color: "green" }}
                              >
                                Đang vận chuyển
                              </span>
                            )}
                          </div>
                        </div>
                        {order.orders.map((product) => {
                          return (
                            <div className="order__product">
                              <div className="order__product-img">
                                <img src={product.url} alt="" />
                              </div>
                              <div className="order__product-title">
                                <span className="product__title-name">
                                  {product.name}
                                </span>
                                <span className="product__title-type">
                                  Loại: {product.type}
                                </span>
                                <span className="product__title-quantity">
                                  x{product.quantity}
                                </span>
                              </div>
                              <span className="order__product-price">
                                {product.price} VNĐ
                              </span>
                            </div>
                          );
                        })}
                      </Link>
                    );
                  })}
                </div>
              ),
            },
            {
              label: `Vận chuyển`,
              key: "3",
              children: (
                <div className="list__order">
                  {filterStatus(true).map((order) => {
                    return (
                      <Link
                        to={`/transaction/${order._id}`}
                        className="order__item"
                      >
                        <div className="order__status">
                          <span style={{ paddingLeft: "8px" }}>
                            Ngày đặt: {convertDate(order.createAt)}
                          </span>
                          <div className="order__status-desc">
                            <CarOutlined />
                            {!order.status ? (
                              <span style={{ margin: "0 8px" }}>
                                Chờ xác nhận đơn hàng
                              </span>
                            ) : (
                              <span style={{ margin: "0 8px" }}>
                                Đơn hàng đã được xác nhận
                              </span>
                            )}
                            {!order.status ? (
                              <span
                                className="order__status-title"
                                style={{ color: "#EE4D2D" }}
                              >
                                Chờ xác nhận
                              </span>
                            ) : (
                              <span
                                className="order__status-title"
                                style={{ color: "green" }}
                              >
                                Đang vận chuyển
                              </span>
                            )}
                          </div>
                        </div>
                        {order.orders.map((product) => {
                          return (
                            <div className="order__product">
                              <div className="order__product-img">
                                <img src={product.url} alt="" />
                              </div>
                              <div className="order__product-title">
                                <span className="product__title-name">
                                  {product.name}
                                </span>
                                <span className="product__title-type">
                                  Loại: {product.type}
                                </span>
                                <span className="product__title-quantity">
                                  x{product.quantity}
                                </span>
                              </div>
                              <span className="order__product-price">
                                {product.price} VNĐ
                              </span>
                            </div>
                          );
                        })}
                      </Link>
                    );
                  })}
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Order;
