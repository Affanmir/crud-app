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
const axios = require("axios");

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

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

  const onSubmiTCAT = (values) => {
    console.log(values.image[0].originFileObj);
    let formData = new FormData();
    formData.append("image", values.image[0].originFileObj);
    formData.append("title", values.CaTtitle);
    formData.append("img", values.ImgURL);

    handleOk();
    axios({
      method: "POST",
      url: "http://localhost:3000/category",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        reloader();
        console.log(`statusCode: ${res.statusCode}`);
        console.log(res);
      })
      .catch((error) => {
        reloader();
        console.error(error);
      });
  
   
  };
  const onSubmit = (values) => {
    handleOk();
    let formData = new FormData();
    formData.append("image", values.image[0].originFileObj);
    formData.append("title", values.Prodtitle);
    formData.append("img", values.ImgURL);
    formData.append("description",values.Description);
    formData.append("price", values.Price);
    formData.append("category",values.Category);
    axios({
      method: "POST",
      url: "http://localhost:3000/products",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        reloader();
        console.log(`statusCode: ${res.statusCode}`);
        console.log(res);
      })
      .catch((error) => {
        reloader();
        console.error(error);
      });
    // const jsonmsg = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     title: values.Prodtitle,
    //     description: values.Description,
    //     price: values.Price,
    //     category: values.Category,
    //     img: values.ImgURL,
    //   }),
    // };
    // Addprod(jsonmsg);
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
                  footer={null}
                  destroyOnClose={true}
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
                  footer={null}
                  destroyOnClose={true}
                >
                  <Categoryform props={onSubmiTCAT} />
                </Modal>
                <Catgrid props={reloadRequired} />
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
