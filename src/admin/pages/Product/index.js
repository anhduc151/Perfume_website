import {
  Space,
  Table,
  Tag,
  Button,
  Form,
  Input,
  Radio,
  Upload,
  Select,
  Divider,
  Modal,
} from "antd";
import Search from "antd/es/input/Search";
import ModalButton from "../../components/Modal";
import "./product.scss";
import {
  PlusCircleOutlined,
  FormOutlined,
  PlusOutlined,
  ExclamationCircleFilled,
  DeleteOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";
import { uploadToCloudinary } from "../../../cloudinary/cloudinaryHelper";
const { Column, ColumnGroup } = Table;
const { confirm } = Modal;
const Product = () => {
  const [listProducts, setListProducts] = useState([]);
  const [isShowModalNew, setIsShowModalNew] = useState(false);
  const [newForm] = Form.useForm();
  const [isReload, setIsReload] = useState(true);
  useEffect(() => {
    const getListProducts = async () => {
      const response = await axios({
        method: "GET",
        url: "http://localhost:8080/api/v1/products",
      });
      setListProducts(response.data.data);
    };
    getListProducts();
    setIsReload(false);
  }, [isReload]);

  const handleCreateFinish = async (values) => {
    const response = await axios({
      method: "POST",
      url: "http://localhost:8080/api/v1/create_product",
      data: values,
      headers: { "Content-Type": "application/json" },
    });
    newForm.resetFields();
    setIsShowModalNew(false);
    setIsReload(true);
  };

  const handleUploadImage = (options) => {
    const { onSuccess, onError, file } = options;
    console.log(options);
    uploadToCloudinary({
      file,
      fileType: "image",
      successCallback: onSuccess,
      failureCallback: onError,
    });
  };

  const renderModalCreateProduct = () => {
    return (
      <Modal
        title="Create New Product"
        centered
        open={isShowModalNew}
        onCancel={() => setIsShowModalNew(false)}
        footer={false}
      >
        <Form
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          layout="horizontal"
          onFinish={handleCreateFinish}
          form={newForm}
        >
          <Form.Item label="Name" name="name">
            <Input placeholder="Type something..." />
          </Form.Item>
          <Form.Item label="Trade mark" name="trade_mark">
            <Input placeholder="Type something..." />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Radio.Group>
              <Radio value="Xịt"> Xịt </Radio>
              <Radio value="Lăn"> Lăn </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Sex" name="sex">
            <Radio.Group>
              <Radio value="Nam"> Nam </Radio>
              <Radio value="Nữ"> Nữ </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Description" name="desc">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Price" name="price">
            <Input style={{ width: "40%" }} />
          </Form.Item>
          <Form.Item
            label="Image"
            name="url"
            getValueFromEvent={(value) => value.file?.response?.url}
          >
            <Upload
              accept="image/*"
              name="url"
              customRequest={handleUploadImage}
              listType="picture-card"
              maxCount={1}
            >
              <div>
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select placeholder="Please select a category">
              <Select.Option value="beauty">Beauty</Select.Option>
              <Select.Option value="makeup">Makeup</Select.Option>
              <Select.Option value="cosmetic">Cosmetic</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              span: 12,
              offset: 6,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  };
  const formEditProduct = (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
    >
      <Form.Item label="Name">
        <Input name="name" placeholder="Type something..." />
      </Form.Item>
      <Form.Item label="Trade mark">
        <Input name="trade_mark" placeholder="Type something..." />
      </Form.Item>
      <Form.Item label="Type">
        <Radio.Group defaultValue="Xịt" name="type">
          <Radio value="Xịt"> Xịt </Radio>
          <Radio value="Lăn"> Lăn </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Sex">
        <Radio.Group defaultValue="Nam" name="sex">
          <Radio value="Nam"> Nam </Radio>
          <Radio value="Nữ"> Nữ </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Description">
        <TextArea rows={4} name="desc" />
      </Form.Item>
      <Form.Item label="Price">
        <Input name="price" style={{ width: "40%" }} />
      </Form.Item>
      <Form.Item label="Image" valuePropName="fileList">
        <Upload action="/upload.do" listType="picture-card" name="url">
          <div>
            <PlusOutlined />
            <div
              style={{
                marginTop: 8,
              }}
            >
              Upload
            </div>
          </div>
        </Upload>
      </Form.Item>
      <Form.Item label="Category">
        <Select defaultValue="beauty">
          <Select.Option value="beauty">Beauty</Select.Option>
          <Select.Option value="makeup">Makeup</Select.Option>
          <Select.Option value="cosmetic">Cosmetic</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
  const handleDelete = (record) => {
    confirm({
      title: "Are you sure delete this transaction?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        const deleteCheckout = async () => {
          const response = await axios({
            method: "DELETE",
            url: `http://localhost:8080/api/v1/products/${record._id}`,
            headers: { "Content-Type": "application/json" },
          });
        };
        setIsReload(true);
        deleteCheckout();
      },
      onCancel() {},
    });
  };
  return (
    <>
      <div className="navbar__input">
        <Search
          placeholder="Type something..."
          enterButton
          className="search__input"
        />
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={() => setIsShowModalNew(true)}
        >
          Create Product
        </Button>
      </div>
      <Table dataSource={listProducts} loading={isReload}>
        <Column
          title="Image"
          dataIndex="url"
          key="image"
          render={(_, record) => (
            <>
              <img
                src={record.url}
                alt={record.name}
                className="product__img"
                style={{ width: "150px", height: "150px" }}
              />
            </>
          )}
        />
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Trade mark" dataIndex="trade_mark" key="trademark" />
        <Column title="Type" dataIndex="type" key="type" />
        <Column
          title="Descripton"
          dataIndex="desc"
          key="desc"
          render={(_, record) => (
            <>
              <p className="product__desc" style={{ color: "#333" }}>
                {record.desc}
              </p>
            </>
          )}
          className="desc"
        />
        <Column title="Sex" dataIndex="sex" key="sex" />
        <Column
          title="Category"
          dataIndex="category"
          key="category"
          render={(_, record) => (
            <>
              <Tag color="orange">{record.category}</Tag>
            </>
          )}
        />
        <Column title="Price" dataIndex="price" key="price" />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <Button
                icon={<DeleteOutlined />}
                type="dashed"
                onClick={() => handleDelete(record)}
              >
                Delete
              </Button>
            </Space>
          )}
        />
      </Table>
      {renderModalCreateProduct()}
    </>
  );
};

export default Product;
