import React, { useEffect } from "react";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, Select, InputNumber, Upload } from "antd";


const Producteditform = ({props}) => {
  console.log(props);
  const getFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e.file;
    }
    return e && e.fileList;
  };
  
  const [catdata, setCat] = useState([]);
  async function getcat  ()  {
    await fetch("/category", {
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
        //initialValues={props.record}
      >
         <Form.Item initialValue={props.record.id} style={{ color: "white" }} label="ID" name="id">
          <Input disabled={true}/>
        </Form.Item>
        <Form.Item initialValue={props.record.title} style={{ color: "white" }} label="Title" name="title">
          <Input />
        </Form.Item>
        <Form.Item
        initialValue={props.record.description}
          style={{ color: "black" }}
          label="Description"
          name="description"
        >
          <Input />
        </Form.Item>
        <Form.Item 
        initialValue={props.record.category}label="Category" style={{ color: "white" }} name="category">
          <Select>
            {catdata.map((item) => (
              <Select.Option value={item.title}>{item.title}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item initialValue={props.record.price}label="Price" name="price">
          <InputNumber />
        </Form.Item>
        <Form.Item initialValue={props.record.img}style={{ color: "white" }} label="Imageurl" name="img">
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

export default Producteditform;
