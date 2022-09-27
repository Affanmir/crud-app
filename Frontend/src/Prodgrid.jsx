import { Space, Tag, Table, Button,Modal } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import Producteditform from "./producteditform";

const Prodgrid = ({ props }) => {
  const [proddata, setProd] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editformdata, seteditformdata]= useState({});


  const showModal = (record) => {
    seteditformdata({record,updateproduct});
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
    fetch(`/products/${values.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: values.title,
        img: values.img,
        description: values.description,
        price: values.price
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => getProd());
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
      render: (_, record) => (
        <img
          width="75"
          height="75"
          alt={require("../src/imgs/eyes_logo.png")}
          src={require("../src/imgs/IMG_7847.PNG")}
        />
      ),
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
            <Button onClick={()=> showModal(record)} type="default"> Edit </Button>
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
        <Producteditform props= {editformdata}/>
      </Modal>
      <Table columns={columns} dataSource={proddata} />
    </>
  );
};
export default Prodgrid;
