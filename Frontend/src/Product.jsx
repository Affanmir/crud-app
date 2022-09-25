import React from "react";



const Product = ({ propx }) => {
  return (
    <div className="produts">
      <p>{propx.title}</p>
      <p>{propx.description}</p>
      <p>{propx.price}</p>
      <p>{propx.category}</p>
    </div>
  );
};

export default Product;
