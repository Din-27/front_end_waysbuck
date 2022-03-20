import React, { useState } from 'react';
import style from '../pages/DetailProduct.module.css'
import Ceklis from '../component/Ceklis';
import Navbar from '../navbar/Navbar';
import { useEffect } from 'react';
import { API } from '../config/api';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styleDetail2 from '../pages/DetailProduct.module.css'
import swal from '@sweetalert/with-react';



export default function DetailProduct2() {
  let navigate = useNavigate()
  console.clear()

    let { id } = useParams()
    const [price, setPrice] = useState()
    const [count, setCount] = useState(0);
    const [product, setProduct] = useState({});
    const [topings, setTopings] = useState([]);
    const [toping, setToping] = useState([]);


    const getProduct = async () => {
      try {
        const response = await API.get(`/product/${id}`);
        setProduct(response.data.data);
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    }


    const getToping = async () => {
      try {
        const response = await API.get(`/toping/${id}`);
        setToping(response.data.data);
        // return console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    console.log(topings);
    const getTopings = async () => {
      try {
        const response = await API.get('/topings');
        setTopings(response.data.data.map((x)=>({
          ...x,
          add: false
        })));
        // return console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    // const handleClick = () => {
    //   const dataTopings = topings.filter(item => item.add === true)
    //   console.log(dataTopings);
    // };
    const handleTopping = (value, index) => {
      topings[index].add = value;
      setTopings([...topings]);
      const total = topings
      .filter((x) => x.add)
      .reduce((a, b) => {
        return a + b.price;
      }, 0);
    setPrice(product.price + total);
    };


    // console.log(topings);

    const cancel = () =>{
      navigate('/page-user')
    }

    const handleBuy = async (e) => {
      e.preventDefault();

      const body = {
      idProduct: product.id,
      idToping: topings.filter((x)=>x.add).map((x) => x.id),
      }

      // const body = topings.filter(x => x.add === true)
      console.log(body);

      const data = JSON.stringify(body);

      const config = {
        method: "POST",
        headers: {
          Authorization: "Basic " + localStorage.token,
          "Content-type": "application/json",
        },
        data,
      };
      await API.post("/order", body, config);
      swal({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
        button: "Aww yiss!",
      });
    getProduct()
    getTopings()
  };

  useEffect(()=>{
    getProduct()
    getTopings()
  }, [])



  return (
      <div>
        <Navbar count={count} setCount={setCount}/>
          <div>
            <div className={style.Main}>
             <div className={style.Main}>
                <div className={style.LeftMain}>
                  <img src={product.image} alt={product.name}/>
                </div>
                <div className={style.RightMain}>
                <div className={style.descript}>
                  <p className={style.thisTitle}>{product.name}</p>
                  <p style={{fontSize: "20px", color: "rgba(151, 74, 74, 1)"}}>{product.price}</p>
                  <p className={style.thisTitleToping}>Toping</p>
                </div>
              <div className={style.Toping}>
                {
                  topings.map((item, index)=>
                  <div className={styleDetail2.TopingMAIN} key={index}>
                    <div onClick={()=>handleTopping(!item.add, index)}>
                    <Ceklis image={item.image} name={item.name} price={item.price} id={item.id} />
                    </div>
                </div>)}
                {/* {
                  toping && toping.map((item, index)=>
                    (<Link to={`/product/` + item.id} style={{ textDecoration: "none" }} key={item.id}>
                  <div className={styleDetail2.TopingMAIN}>
                    <div className={styleDetail2.variant1}>
                      {add && <img src={Choose} className={styleDetail2.choose} />}
                      <img className={styleDetail2.imgToping} src={item.image} alt="" onClick={()=>getToping(item.id)} />
                    </div>
                        <p style={{color: "rgb(236, 58, 58)", marginTop: "-35px", marginLeft: "10px"}}>{item.price}</p>
                    <p style={{fontWeight: "bold", color : "rgb(236, 58, 58)", marginTop: "-20px", marginLeft: "5px"}}>{item.name}</p>
                </div>
                </Link>))} */}
              </div>
              <div className={style.down}>
                <p className={style.thisTitleTotal}>Total</p>
                <p style={{fontSize: "20px", color: "rgba(151, 74, 74, 1)"}}>{price}</p>
                <button className={style.btn} onClick={handleBuy}>Add Cart</button>
              </div>
                <button className={style.btn} onClick={cancel}>Cancel</button>
              </div>
          </div>
        </div>
      </div>
    </div>)
}


