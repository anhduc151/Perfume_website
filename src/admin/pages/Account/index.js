import Checkout from "../../components/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import { Form, Input, Select, Space, Button, Table, Modal } from "antd";
import {
  DeleteOutlined,
  ExclamationCircleFilled,
  PlusCircleOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { BiErrorCircle } from "react-icons/bi";
const { Search } = Input;
const { Column, ColumnGroup } = Table;
const { confirm } = Modal;
const Account = () => {
  const [infoUser, setInfoUser] = useState([]);
  const [isReload, setIsReload] = useState(true);
  const [isShowModalNew, setIsShowModalNew] = useState(false);
  const [newForm] = Form.useForm();
  useEffect(() => {
    const getUsers = async () => {
      const response = await axios({
        method: "GET",
        url: "http://localhost:8080/api/v1/auth/users",
      });
      console.log(response.data.data.result);
      setInfoUser(response.data.data.result);
    };
    getUsers();
    setIsReload(false);
  }, [isReload]);
  const convertDate = (data) => {
    const time = data;
    const date = new Date(time);
    const dateformat =
      date.getHours() + ":" + date.getMinutes() + ", " + date.toDateString();
    return dateformat;
  };
  const handleDelete = (record) => {
    console.log(record);
    confirm({
      title: "Are you sure delete this user?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        const deleteUser = async () => {
          const response = await axios({
            method: "DELETE",
            url: `http://localhost:8080/api/v1/auth/users/${record._id}`,
            headers: { "Content-Type": "application/json" },
          });
        };
        setIsReload(true);
        deleteUser();
      },
      onCancel() {},
    });
  };
  const [errors, setErrors] = useState([]);
  const handleCreateFinish = async (values) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8080/api/v1/auth/register",
        data: values,
        headers: { "Content-Type": "application/json" },
      });
      newForm.resetFields();
      setIsShowModalNew(false);
      setIsReload(true);
      //If register don't error
    } catch (error) {
      console.log(error.response.data.message);
      setErrors(error.response.data.message);
    }
    console.log(values);
  };
  const renderModalCreateProduct = () => {
    return (
      <Modal
        title="Create New User"
        centered
        open={isShowModalNew}
        onCancel={() => setIsShowModalNew(false)}
        footer={false}
      >
        <div
          className="errors__box"
          style={{
            display: "flex",
            // backgroundColor: "red",
            width: "100%",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          {errors &&
            errors.map((error, index) => (
              <div
                className="errors__box-item"
                key={index}
                style={{ display: "flex" }}
              >
                <p className="errors__item-title" style={{ color: "red" }}>
                  {error.message}
                </p>
              </div>
            ))}
        </div>
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
          loading={isReload}
        >
          <Form.Item label="Username" name="name">
            <Input placeholder="Type something..." />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="Type something..." />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password
              placeholder="Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              name="password"
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              span: 12,
              offset: 6,
            }}
          >
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  };
  return (
    <>
      <div className="navbar_input">
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
          Create User
        </Button>
        {/* <Form.Item label="Filter by" className="filter__input">
          <Select defaultValue="false">
            <Select.Option value="false">Pending</Select.Option>
            <Select.Option value="true">Approve</Select.Option>
          </Select>
        </Form.Item> */}
      </div>
      <Table dataSource={infoUser} loading={isReload}>
        <Column title="Username" dataIndex="name" key="name" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Password" dataIndex="password" key="password" />

        <Column
          title="Create At"
          dataIndex="createAt"
          key="createAt"
          render={(_, record) => (
            <Space>
              <span>{convertDate(record.createAt)}</span>
            </Space>
          )}
        />
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

export default Account;
