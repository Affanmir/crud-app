import React from "react";
import { Form, Input, Button } from "antd";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const Categoryform = ({ props }) => {
  return (
    <>
      <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        style={{ backgroundColor: "white", marginTop: 15 }}
        onFinish={props}
      >
        <Form.Item style={{ color: "white" }} label="Title" name="CaTtitle">
          <Input />
        </Form.Item>
        <Form.Item style={{ color: "white" }} label="Imageurl" name="ImgURL">
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

export default Categoryform;
