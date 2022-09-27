import { Space, Tag, Table, Button, Modal } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import Categoryeditform from "./categoryeditform";

const Catgrid = ({ props }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [propx, setpropx] = useState({});
  const showModal = (record) => {
    setpropx({ record, updatecategory });
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [catdata, setCat] = useState([]);

  const delcat = (id) => {
    fetch(`/category/${id}`, { method: "DELETE" }).then(() => getcat());
  };

  const updatecategory = (values) => {
    handleOk();
    console.log(values);
    fetch(`/category/${values.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: values.title,
        img: values.img,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => getcat());
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
  }, [props]);

  const columns = [
    {
      title: "Category Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
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
            <Button onClick={() => delcat(record.id)} type="danger">
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
        title="Edit This Category"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        destroyOnClose={true}
      >
        <Categoryeditform props={propx} />
      </Modal>
      <Table columns={columns} dataSource={catdata} />
    </>
  );
};
export default Catgrid;
