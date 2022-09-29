import React, { useEffect } from "react";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, Select, InputNumber, Upload } from "antd";

const Productform = ({ props }) => {
  const [catdata, setCat] = useState([]);
  const getFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e.file;
    }
    return e && e.fileList;
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

  return (
    <>
      <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        style={{ backgroundColor: "white", marginTop: 15 }}
        onFinish={props}
      >
        <Form.Item style={{ color: "white" }} label="Title" name="Prodtitle">
          <Input />
        </Form.Item>
        <Form.Item
          style={{ color: "black" }}
          label="Description"
          name="Description"
        >
          <Input />
        </Form.Item>
        <Form.Item label="Category" style={{ color: "white" }} name="Category">
          <Select>
            {catdata.map((item) => (
              <Select.Option value={item.title}>{item.title}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Price" name="Price">
          <InputNumber />
        </Form.Item>
        <Form.Item style={{ color: "white" }} label="Imageurl" name="ImgURL">
          <Input />
        </Form.Item>
        <Form.Item
          getValueFromEvent={getFile}
          label="Upload"
          valuePropName="fileList"
          name="image"
        >
          <Upload ultiple={false} beforeUpload={(file)=>{return false}} listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Image Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item style={{ marginTop: 8 }}>
          <Button
            style={{ marginLeft: "400px" }}
            htmlType="submit"
            type="primary"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Productform;
