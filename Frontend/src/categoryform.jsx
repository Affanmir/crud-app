import React from "react";
import { Form, Input, Button } from "antd";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const Addcat = (requestOptions) => {
    fetch("/category", requestOptions);
  };
  

const Categoryform = () => {
  return (
    <>
      <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        style={{ backgroundColor: "white", marginTop: 15 }}
        onFinish={(values) => {
            console.log(values);
            const jsonmsg = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: values.CaTtitle,
            })};
            Addcat(jsonmsg);
          }}
        
      >
        <Form.Item style={{ color: "white" }} label="Title" name="CaTtitle">
          <Input />
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList" name="image">
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Image Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Categoryform;
