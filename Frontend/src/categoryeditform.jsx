import React from "react";
import { Form, Input, Button } from "antd";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const Categoryeditform = ({ props }) => {
  console.log(props);
  return (
    <>
      <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        style={{ backgroundColor: "white", marginTop: 15 }}
        onFinish={props.updatecategory}
        initialValues={props.record}
      >
        <Form.Item style={{ color: "white" }} label="Category Id" name="id">
          <Input disabled={true}/>
        </Form.Item>
        <Form.Item style={{ color: "white" }} label="Title" name="title">
          <Input />
        </Form.Item>
        <Form.Item style={{ color: "white" }} label="Imageurl" name="img">
          <Input />
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

export default Categoryeditform;
