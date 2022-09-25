import React, { useState, useEffect } from "react";
import { Divider, Typography, Button, Col, Row, Modal } from "antd";
import Category from "./Category";
import Product from "./Product";
import Productform from "./Productform";
import Categoryform from "./categoryform";
import { Layout } from "antd";
import layout from "./Layoutdesign";
import { Space, Table, Tag } from "antd";

import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Layoutdesign from "./Layoutdesign";

const { Title } = Typography;
const { Content } = Layout;
function App() {
  const [proddata, setProd] = useState([]);
  const [catdata, setCat] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const AddprodOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "React POST Request Example",
      description: " Some description",
      price: 10000,
      category: "technology",
    }),
  };

  const AddcatOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "React POST Request Example" }),
  };

  const addcat = (AddcatOptions) => {
    fetch("/category", AddcatOptions).then(() => getCat());
  };
  const delCat = (id) => {
    fetch(`/category/${id}`, { method: "DELETE" }).then(() => {
      getCat();
      getProd();
    });
  };

  const Addprod = (requestOptions) => {
    fetch("/products", requestOptions).then(() => getProd());
  };

  const delProduct = (id) => {
    fetch(`/products/${id}`, { method: "DELETE" }).then(() => getProd());
  };

  const getCat = () => {
    fetch("/category", {
      header: {
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

  const getProd = () => {
    fetch("/products", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function(response) {
        return response.json();
      })

      .then(function(myJson) {
        setProd(myJson);
      });
  };

  useEffect(() => {
    getProd();
    getCat();
  }, []);

  return (
    <div className="App">
      {" "}
      <Layoutdesign />{" "}
    </div>
  );
}
//   return (
//     <div className="App">
//       <Layout style={{ width: 900, backgroundColor: "black" }}>
//         <Content>
//           <Row>
//             <Col span={18}>
//               <Title style={{ color: "white" }}>Product List</Title>
//               {proddata.length > 0 ? (
//                 <div className="conatainer">
//                   {proddata.map((item) => (
//                     <>
//                       <Product propx={item} />
//                       <Button
//                         onClick={() => {
//                           delProduct(item.id);
//                         }}
//                         type="danger"
//                       >
//                         Delete Product
//                       </Button>
//                       <Divider />
//                     </>
//                   ))}
//                 </div>
//               ) : (
//                 <h1 style={{ color: "white" }}>No Products to render</h1>
//               )}

//               <Title style={{ color: "white" }}>Category List</Title>
//               {catdata.length > 0 ? (
//                 <div className="conatainer">
//                   {catdata.map((item) => (
//                     <>
//                       <Category props={item} />
//                       <Button onClick={() => delCat(item.id)} type="danger">
//                         Delete Category
//                       </Button>
//                       <Divider />
//                     </>
//                   ))}
//                 </div>
//               ) : (
//                 <h1 style={{ color: "white" }}>No Ctegories to render</h1>
//               )}
//             </Col>
//             <Col span={6}>
//               <div>
//                 <Divider />
//                 <Divider />
//                 <Divider />
//                 <Divider />
//                 <Title level={4} style={{ color: "white" }}>
//                   Add Products
//                 </Title>
//                 <Button
//                   onClick={() => {
//                     showModal();
//                     getProd();
//                   }}
//                   type="primary"
//                 >
//                   Add Product
//                 </Button>

//                 <Modal
//                   title="Add Product"
//                   open={isModalOpen}
//                   onOk={handleOk}
//                   onCancel={handleCancel}
//                 >
//                   <Productform/>
//                 </Modal>
//               </div>
//               <div>
//                 <Title level={4} style={{ color: "white" }}>
//                   Add Categories
//                 </Title>
//                 <Button onClick={() => addcat(AddcatOptions)} type="primary">
//                   Add Category
//                 </Button>

//               </div>
//             </Col>
//           </Row>
//         </Content>
//       </Layout>
//     </div>
//   );
// }

export default App;
