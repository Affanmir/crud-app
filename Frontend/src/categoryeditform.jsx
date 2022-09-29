import React from "react";
import { Form, Input, Button } from "antd";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const Categoryeditform = ({ props }) => {
  const getFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e.file;
    }
    return e && e.fileList;
  };
  console.log(props);
  const imgx = new Image();
  imgx.src = `data:image/jpeg;base64,${props.record.image}`;

  return (
    <>
      <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        style={{ backgroundColor: "white", marginTop: 15 }}
        onFinish={props.updatecategory}
        //initialValues={props.record}
      >
        <Form.Item
          initialValue={props.record.id}
          style={{ color: "white" }}
          label="Category Id"
          name="id"
        >
          <Input disabled={true} />
        </Form.Item>
        <Form.Item
          initialValue={props.record.title}
          style={{ color: "white" }}
          label="Title"
          name="title"
        >
          <Input />
        </Form.Item>
        <Form.Item
          initialValue={props.record.img}
          tyle={{ color: "white" }}
          label="Imageurl"
          name="img"
        >
          <Input />
        </Form.Item>
        <Form.Item

          getValueFromEvent={getFile}
          label="Upload"
          valuePropName="fileList"
          name="image"
        >
          <Upload
            multiple={false}
            beforeUpload={(file) => {
              return false;
            }}
            listType="picture-card"
          >
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

export default Categoryeditform;
