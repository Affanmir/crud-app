import { Space, Table, Button, Modal } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import Producteditform from "./producteditform";

const Prodgrid = ({ props }) => {
  const axios = require('axios');
  const [proddata, setProd] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editformdata, seteditformdata] = useState({});

  const showModal = (record) => {
    seteditformdata({ record, updateproduct });
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const delProd = (id) => {
    fetch(`/products/${id}`, { method: "DELETE" }).then(() => getProd());
  };

  const updateproduct = (values) => {
    handleOk();
    console.log(values);
    let formData = new FormData();
    formData.append("image", values.image[0].originFileObj);
    formData.append("title", values.title);
    formData.append("img", values.img);
    formData.append("description",values.description);
    formData.append("price", values.price);
    formData.append("category",values.category);

    
    axios({
      method: "PATCH",
      url: `http://localhost:3000/products/${values.id}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        getProd();
        console.log(`statusCode: ${res.statusCode}`);
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
    // fetch(`/products/${values.id}`, {
    //   method: "PATCH",
    //   body: JSON.stringify({
    //     title: values.title,
    //     img: values.img,
    //     description: values.description,
    //     price: values.price,
    //   }),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    // }).then(() => getProd());
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
  }, [props]);

  const columns = [
    {
      title: "Product Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_, record) => {
        const imgx = new Image();
        imgx.src = `data:image/jpeg;base64,${record.image}`; return(
          <img
            width="75"
            height="75"
            alt={imgx.src}
            src={imgx.src}
          />
        );
      },
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
            <Button onClick={() => showModal(record)} type="default">
              {" "}
              Edit{" "}
            </Button>
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

  return (
    <>
      <Modal
        title="Edit This Product"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <Producteditform props={editformdata} />
      </Modal>
      <Table columns={columns} dataSource={proddata} />
    </>
  );
};
export default Prodgrid;
