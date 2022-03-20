import React, { useEffect } from 'react'
import style from '../pages/DetailProduct.module.css'
import { useState } from 'react';
import { API } from '../config/api';
import TopingCard from './TopingCard';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';




export default function ProductDetail({item, index}) {

  const [topings, setTopings] = useState([]);

  const getTopings = async () => {
    try {
      const response = await API.get("/topings");
      setTopings(response.data.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTopings();
  }, []);




    
  return (
    <Link to={`/product/` + item.id} style={{ textDecoration: "none" }} key={index}>
    <div className={style.Main}>
        <div className={style.LeftMain}>
            <img src={item.image} alt={item.name}/>
        </div>
        <div className={style.RightMain}>
        <p className={style.thisTitle}>{item.name}</p>
        <p style={{fontSize: "20px", color: "rgba(151, 74, 74, 1)"}}>{item.price}</p>
        <p className={style.thisTitleToping}>Toping</p>
        {topings.length !==0 ? (topings?.map((item, index)=>(<TopingCard item={item} key={index} />))) : ( <div>no toping yet</div> ) }
        <p className={style.thisTitleTotal}>Total</p>
        <p style={{fontSize: "20px", color: "rgba(151, 74, 74, 1)"}}>0</p>
        <button className={style.btn}>Add Cart</button>
        </div>
    </div>
    </Link>
  )
}
