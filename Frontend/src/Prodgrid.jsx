import { Space, Tag, Table, Button } from "antd";
import React from "react";
import { useState, useEffect } from "react";

const Prodgrid = () => {
  const [proddata, setProd] = useState([]);

  const delProd = (id) => {
    fetch(`/products/${id}`, { method: "DELETE" }).then(() => getProd());
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
  }, []);

  const columns = [
    {
      title: "Product Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>
            {" "}
            <Button type="default"> Edit </Button>
          </a>
          <a>
            <Button onClick={() => delProd(record.id)} type="danger">
              Delete{" "}
            </Button>
          </a>
        </Space>
      ),
    },
  ];

  

  return <Table columns={columns} dataSource={proddata} />;
};
export default Prodgrid;
