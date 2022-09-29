import { Space, Table, Button, Modal } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import Categoryeditform from "./categoryeditform";
const axios = require("axios");


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
    let formData = new FormData();
    formData.append("image", values.image[0].originFileObj);
    formData.append("title", values.title);
    formData.append("img", values.img);
    axios({
      method: "PATCH",
      url: `http://localhost:3000/category/${values.id}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        getcat();
        console.log(`statusCode: ${res.statusCode}`);
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
   
  };
  const getcat = () => {
    axios({
      method: "GET",
      url: `http://localhost:3000/category/`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      
    })
      .then((res) => {
        console.log(res);
        setCat(res.data);
        console.log(`statusCode: ${res.statusCode}`);
        
      })
      .catch((error) => {
        console.error(error);
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
      dataIndex: "image",
      key: "image",
      render: (_, record) => {
        const imgx = new Image()
        imgx.src = `data:image/jpeg;base64,${record.image}`
         
        return(
          
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
