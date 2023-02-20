import { bannerCart } from "../../assets/images";
import BannerPage from "../../components/BannerPage";
import Footer from "../../components/Footer";
import { Button, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
const { Column, ColumnGroup } = Table;
const FavoriteProduct = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [productFavorite, setProductFavorite] = useState([]);
  const [isReload, setIsReload] = useState(false);
  useEffect(() => {
    const getProductFavorite = async () => {
      const response = await axios({
        method: "post",
        data: token,
        url: "http://localhost:8080/api/v1/favorite/current_favorite",
        headers: { "Content-Type": "application/json" },
      });
      setProductFavorite(response.data.data);
    };
    getProductFavorite();
  }, [isReload]);
  const handleDelete = async (record) => {
    const response = await axios({
      method: "DELETE",
      url: `http://localhost:8080/api/v1/favorite/${record._id}`,
      headers: { "Content-Type": "application/json" },
    });
    setIsReload(true);
  };
  return (
    <>
      <BannerPage
        heading="Chava Perfume"
        title="Favorite Product List"
        img={bannerCart}
      />
      <div className="container">
        <Table dataSource={productFavorite}>
          <Column
            title="Hình ảnh"
            dataIndex="img"
            key="img"
            render={(_, record) => {
              return (
                <Space>
                  <img
                    src={record.productImg}
                    alt=""
                    style={{ width: "150px" }}
                  />
                </Space>
              );
            }}
          />
          <Column title="Tên sản phẩm" dataIndex="productName" key="name" />
          <Column title="Giá sản phẩm" dataIndex="productPrice" key="price" />
          <Column
            title="Action"
            key="action"
            render={(_, record) => (
              <Space size="middle">
                <Button onClick={() => handleDelete(record)}>Delete</Button>
              </Space>
            )}
          />
        </Table>
      </div>
      <Footer />
    </>
  );
};

export default FavoriteProduct;
