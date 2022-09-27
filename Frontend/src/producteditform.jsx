import React, { useEffect } from "react";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, Select, InputNumber, Upload } from "antd";


const Producteditform = ({props}) => {
  console.log(props);
  const [catdata, setCat] = useState([]);
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
        onFinish= {props.updateproduct}
        initialValues={props.record}
      >
         <Form.Item style={{ color: "white" }} label="ID" name="id">
          <Input disabled={true}/>
        </Form.Item>
        <Form.Item style={{ color: "white" }} label="Title" name="title">
          <Input />
        </Form.Item>
        <Form.Item
          style={{ color: "black" }}
          label="Description"
          name="description"
        >
          <Input />
        </Form.Item>
        <Form.Item label="Category" style={{ color: "white" }} name="category">
          <Select>
            {catdata.map((item) => (
              <Select.Option value={item.title}>{item.title}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Price" name="price">
          <InputNumber />
        </Form.Item>
        <Form.Item style={{ color: "white" }} label="Imageurl" name="img">
          <Input />
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

export default Producteditform;
