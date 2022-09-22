import React,{useState,useEffect} from 'react';
import { Divider } from 'antd';
import { Button } from 'antd';
import { Col, Row } from 'antd';
import { Typography } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
const { Title } = Typography;



function App() {

  const [proddata,setProd] = useState([]);
  const [catdata, setCat] = useState([]);
  
  const getCat =() =>{
    fetch('/category'
    ,{
      header:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
  )
    .then(function(response){
      return response.json();
  })

  .then(function(myJson) {
    setCat(myJson)
  });
  }

  const getProd=()=>{
    fetch('/products'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }

    )
      .then(function(response){
        return response.json();
      })

      .then(function(myJson) {
        setProd(myJson)
      });

  }
  


  useEffect(()=>{

    getProd()
    getCat()

  },[])

  return (
    <div className="App">
      <Row justify="start">
      <Col span={18}>
      <div>
      <Title style={ {color: "white"} }>Product List</Title>
      {
       proddata && proddata.length>0 && proddata.map((item)=>
       <div>
        <p>Product Ttitle: {item.title}</p>
        <p>Product Description: {item.description}</p>
        <p>Price: {item.price}</p>
        <p>Category: {item.category}</p>
        <Button  onClick={() => {}} type="danger" >Delete Product</Button>
        <Divider/>
       </div>
       )
     }
      <Title style={ {color: "white"} }>Category List</Title>
      {catdata && catdata.length>0 && catdata.map((item)=>
      <div>
      <p>Category Ttitle: {item.title}</p>
      <Button  type="danger" >Delete Category</Button>
      <Divider/>
      </div>
      )
    }
       
      
    </div>
    </Col>
    <Col span={6}>
      
      <div>
      <Title level={4}style={ {color: "white"} }>Add/Edit Products</Title>
      <Button  type="primary" >Add Product</Button>
      <Button  type="default" >Edit Product</Button>
      </div>
      <Divider/>
      <div>
      <Title level={4}style={ {color: "white"} }>Add/Edit Categories</Title>
      <Button  type="primary" >Add Category</Button>
      <Button  type="default" >Edit Category</Button>
     
      </div>
    </Col>
    </Row>
    </div>


  );

}


export default App;