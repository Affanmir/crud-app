import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

import Productform from "./Productform";

import { Breadcrumb, Layout, Menu, Button, Modal } from "antd";
import React, { useState } from "react";
import Progrid from "./Prodgrid";
import Prodgrid from "./Prodgrid";
import Catgrid from "./Catgrid";
import Categoryform from "./categoryform";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Products", "1", <PieChartOutlined />),
  getItem("Categories", "2", <DesktopOutlined />),
];

const Layoutdesign = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [CurrentKey, setcurrentKey] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onSelect={(e) => {
            setcurrentKey(e.selectedKeys);
          }}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {CurrentKey == 1 ? (
              <>
                <Breadcrumb
                  style={{
                    margin: "30px 0",
                  }}
                >
                  <Breadcrumb.Item>
                    <Button onClick={() => showModal()} type="primary">
                      Add Product
                    </Button>
                  </Breadcrumb.Item>
                </Breadcrumb>
                <Modal
                  title="Add Product"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <Productform />
                </Modal>
                <Prodgrid />
              </>
            ) : (
              <>
                <Breadcrumb
                  style={{
                    margin: "30px 0",
                  }}
                >
                  <Breadcrumb.Item>
                    <Button onClick={() => showModal()} type="primary">
                      Add Category
                    </Button>
                  </Breadcrumb.Item>
                </Breadcrumb>
                <Modal
                  title="Add Category"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <Categoryform />
                </Modal>
                <Catgrid />
              </>
            )}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Layoutdesign;
