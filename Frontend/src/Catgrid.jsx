import { Space, Tag, Table, Button } from "antd";
import React from "react";
import { useState, useEffect } from "react";

const Catgrid = () => {
  const [catdata, setCat] = useState([]);

  const delcat = (id) => {
    fetch(`/category/${id}`, { method: "DELETE" }).then(() => getcat());
  };

  const getcat = () => {
    fetch("/category", {
      headers: {
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
  useEffect(() => {
    getcat();
  }, []);

  const columns = [
    {
      title: "Category Title",
      dataIndex: "title",
      key: "title",
    },
    {
        title: "Image",
        dataIndex: "Image",
        key: "Image",
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
            <Button onClick={() => delcat(record.id)} type="danger">
              Delete{" "}
            </Button>
          </a>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={catdata} />;
};
export default Catgrid;
