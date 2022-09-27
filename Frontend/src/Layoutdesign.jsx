import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

import Productform from "./Productform";

import { Breadcrumb, Layout, Menu, Button, Modal } from "antd";
import React, { useState, useEffect } from "react";
import Prodgrid from "./Prodgrid";
import Catgrid from "./Catgrid";
import Categoryform from "./categoryform";
const { Header, Content, Footer, Sider } = Layout;

const Addprod = (requestOptions) => {
  fetch("/products", requestOptions);
};

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
  const reloader = () => {
    console.log(reloadRequired);
    if (reloadRequired) setreloadRequired(false);
    else setreloadRequired(true);
  };
  const [collapsed, setCollapsed] = useState(false);
  const [CurrentKey, setcurrentKey] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reloadRequired, setreloadRequired] = useState();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const Addcat = (requestOptions) => {
    fetch("/category", requestOptions);
  };
  
  const onSubmiTCAT = (values) => {
    handleOk();
    console.log(values);
    const jsonmsg = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: values.CaTtitle,
        img: values.ImgURL,
      }),
    };
    Addcat(jsonmsg);
    reloader();
  };
  const onSubmit = (values) => {
    handleOk();
    const jsonmsg = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: values.Prodtitle,
        description: values.Description,
        price: values.Price,
        category: values.Category,
        img: values.ImgURL,
      }),
    };
    Addprod(jsonmsg);
    reloader();
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
                  footer= {null}
                  destroyOnClose= {true}
                >
                  <Productform props={onSubmit} />
                </Modal>
                <Prodgrid props={reloadRequired} />
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
                  footer= {null}
                  destroyOnClose= {true}
                >
                  <Categoryform props={onSubmiTCAT} />
                </Modal>
                <Catgrid props= {reloadRequired}/>
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
