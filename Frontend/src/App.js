import React, { useState, useEffect } from "react";
import { Divider, Typography, Button, Col, Row } from "antd";
import Category from "./Category";
import Product from "./Product";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

const { Title } = Typography;

function App() {
  const [proddata, setProd] = useState([]);
  const [catdata, setCat] = useState([]);

  const getCat = () => {
    fetch("/category", {
      header: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function(response) {
        return response.json();
      })

      .then(function(myJson) {
        setCat(myJson);
      });
  };

  const getProd = () => {
    fetch("/products", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function(response) {
        return response.json();
      })

      .then(function(myJson) {
        setProd(myJson);
      });
  };

  useEffect(() => {
    getProd();
    getCat();
  }, []);

  return (
    <div className="App">
      <Row>
        <Col span={18}>
          <Title style={{ color: "white" }}>Product List</Title>
          {proddata.length > 0 ? (
            <div className="conatainer">
              {proddata.map((item) => (
                <Product propx={item} />
              ))}
            </div>
          ) : (
            <h1>No Products to render</h1>
          )}

          <Title style={{ color: "white" }}>Category List</Title>
          {catdata.length > 0 ? (
            <div className="conatainer">
              {catdata.map((item) => (
                <Category props={item} />
              ))}
            </div>
          ) : (
            <h1>No Ctegories to render</h1>
          )}
        </Col>
        <Col span={6}>
          <div>
            <Title level={4} style={{ color: "white" }}>
              Add/Edit Products
            </Title>
            <Button type="primary">Add Product</Button>
            <Button type="default">Edit Product</Button>
          </div>
          <Divider />
          <div>
            <Title level={4} style={{ color: "white" }}>
              Add/Edit Categories
            </Title>
            <Button type="primary">Add Category</Button>
            <Button type="default">Edit Category</Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
