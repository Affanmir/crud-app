import React from 'react';
import { Divider, Button } from 'antd';

const delProduct= (id)=>{

    
}

const Product = ({propx}) =>{
    return (
        <div className = "produts">
            <p>{propx.id}</p>
            <p>{propx.title}</p>
            <p>{propx.description}</p>
            <p>{propx.price}</p> 
            <p>{propx.category}</p>   
            <Button  onClick={() => delProduct(propx.id)
            } type="danger" >Delete Product</Button>
            <Divider/>
              
        </div>
    )

}

export default Product;