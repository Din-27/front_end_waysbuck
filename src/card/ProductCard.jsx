import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../config/api';
import '../pages/Page1.module.css'


function ProductCard({item, index}) {

  
 
  return (
    <Link to={`/product/` + item.id} style={{ textDecoration: "none" }} key={index}>
        <div>
            <img src={item.image} alt={item.name}/>
            <div className='descriptOrder1'>
                <p style={{fontWeight: "bold", marginBottom: "5px"}}>{item.name}</p>
                <p>{item.price}</p>
            </div>
        </div>
    </Link>
  )
}

export default ProductCard