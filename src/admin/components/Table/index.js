import React, { useState } from "react";
import { Button, Form, Input, Modal, Radio, Space, Table, Tag } from "antd";
import ModalBox from "../Modal";
import {
  DeleteOutlined,
  FormOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import axios from "axios";
const { Column, ColumnGroup } = Table;
const { confirm } = Modal;
const App = ({ data, handleReload, isReload }) => {
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [form] = Form.useForm();
  const onFinishEdit = async (values) => {
    const response = await axios({
      method: "PUT",
      url: "http://localhost:8080/api/v1/checkout",
      data: values,
      headers: { "Content-Type": "application/json" },
    });
    handleCancel();
    handleReload(true);
  };

  const handleCancel = () => {
    setIsShowEditModal(false);
  };

  const renderModalEdit = () => {
    return (
      <Modal
        title="EDIT TRANSACTION"
        open={isShowEditModal}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          onFinish={onFinishEdit}
          autoComplete="off"
        >
          <Form.Item name="_id" hidden />
          <Form.Item
            label="First Name"
            name="fName"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lName"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="Country" name="country">
            <Input />
          </Form.Item>
          <Form.Item label="State" name="state">
            <Input />
          </Form.Item>
          <Form.Item label="Street" name="street">
            <Input />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Radio.Group>
              <Radio value={false}>Pending</Radio>
              <Radio value={true}>Approve </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 18,
            }}
          >
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button onClick={() => handleCancel()}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const handleOpenModal = (record) => {
    form.setFieldsValue(record);
    setIsShowEditModal(true);
  };
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
            url: `http://localhost:8080/api/v1/checkout/${record._id}`,
            headers: { "Content-Type": "application/json" },
          });
        };
        deleteCheckout();
        handleReload(true);
      },
      onCancel() {},
    });
  };

  return (
    <div>
      <Table dataSource={data} loading={isReload}>
        <Column title="First Name" dataIndex="fName" key="firstName" />
        <Column title="Last Name" dataIndex="lName" key="lastName" />
        <Column
          title="Product"
          key="product"
          render={(_, record) => (
            <Space size="middle">
              <ModalBox
                title="VIEW PRODUCT"
                label="View Product"
                content={record.orders.map((product, index) => {
                  return (
                    <div className="product" key={index}>
                      <div className="product__img">
                        <img src={product.url} alt="" />
                      </div>
                      <div className="product__title">
                        <h3 className="product__title-name">{product.name}</h3>
                        <span className="product__title-price">
                          {product.quantity} x {product.price} VND
                        </span>
                      </div>
                    </div>
                  );
                })}
                key="product"
              />
            </Space>
          )}
        />
        <Column title="Address" dataIndex="street" key="address" />

        <Column
          title="Status"
          key="status"
          render={(_, record) =>
            record.status ? (
              <Tag color="green">Approve</Tag>
            ) : (
              <Tag color="yellow">Pending</Tag>
            )
          }
        />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <Button
                icon={<FormOutlined />}
                type="primary"
                onClick={() => handleOpenModal(record)}
              >
                Edit
                {/* <ModalBox
                title='EDIT TRANSACTION'
                label='Edit'
                content={modalEdit(record)}
                icon={<FormOutlined />}
                showFooter={false}
              /> */}
              </Button>
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
      {renderModalEdit()}
    </div>
  );
};
export default App;
