import React from "react";
import { Form, Input, Button } from "antd";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const Categoryform = ({ props }) => {
  const getFile = (e) => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e.file;
  }
 return e && e.fileList;
};
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
        <Form.Item getValueFromEvent={getFile} label="Upload" valuePropName="fileList" name="image">
          <Upload multiple={false} beforeUpload={(file)=>{return false}} listType="picture-card">
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
