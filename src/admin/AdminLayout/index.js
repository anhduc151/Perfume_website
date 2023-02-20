import React, { useState } from "react";
import "./adminLayout.scss";
import {
  ToolOutlined,
  PieChartOutlined,
  TeamOutlined,
  AppstoreAddOutlined,
  SearchOutlined,
  UserOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import DropDown from "../components/Dropdown";
const { Header, Content, Footer, Sider } = Layout;
export function getItem(label, key, icon, route, children) {
  return {
    key,
    icon,
    children,
    label,
    route,
  };
}
const items = [
  // getItem("Dashboard", "1", <PieChartOutlined />, "dashboard"),
  getItem("Transaction", "2", <TeamOutlined />, "transaction"),
  getItem("Product", "3", <AppstoreAddOutlined />, "product"),
  getItem("Account", "4", <TeamOutlined />, "account"),
  // getItem("Settings", "5", <ToolOutlined />, "setting"),
];
const dropdown = [getItem("Logout", "1", <PieChartOutlined />)];
const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
          }}
          className="logo"
        >
          VA Perfume
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["2"]}
          mode="inline"
          // items={items}
        >
          {items.map((item) => {
            return (
              <Menu.Item key={item.key}>
                <span style={{ marginRight: "10px" }}>{item.icon}</span>
                <Link to={`/admin/${item.route}`}>{item.label}</Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            margin: "0 16px",
            background: colorBgContainer,
          }}
          className="header"
        >
          {/* <SearchOutlined className="icon" /> */}
          <div className="info">
            <TeamOutlined className="icon" />
            <BellOutlined className="icon" />
            <div className="info__user">
              <DropDown label="Hello, Admin!" items={dropdown} />
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          ></Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
