import React, { useState } from 'react';
import style from '../pages/DetailProduct.module.css'
import TopingCard from '../card/TopingCard';
import NavbarAdmin from '../navbar/NavbarAdmin';
import { useEffect } from 'react';
import { API } from '../config/api';
import styleDetail2 from '../pages/DetailProduct.module.css'
import Choose from '../assets/Vector5.png'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';









export default function DetailProduct2() {

    const [notif, setNotif] =useState()
    const [add, setAdd] = useState()
    const navigate = useNavigate()

    const [product, setProduct] = useState([]);

    useEffect(()=>{
      API
      .get('/products')
      .then(res =>{
        console.log(res);
        setProduct(res.data.data)
      })
      .catch(err =>{
        console.log(err);
      })
    }, [])

    // const [product, setProduct] = useState([]);

    //   const getProduct = async () => {
    //     try {
    //       const response = await API.get("/products");
    //       setProduct(response.data.data);
    //       console.log(response);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };

    //   useEffect(() => {
    //     getProduct();
    //   }, []);


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


    const [idDelete, setIdDelete] = useState([])

      let handleDelete = async (id)=>{
        try {
          const res = await API.delete(`/toping/${id}`)
          setIdDelete(res.data.data.id)
          swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your imaginary file is safe!");
            }
          });
        } catch (error) {
          console.log(error);
        }
      }

      const handleEdit = (id) => {
        navigate("/UpdateToping/" + id);
      };



  return (
  <div>
    <NavbarAdmin/>
    <div>
    <div className={style.Main}>
      {
        product.map(product => <div className={style.Main}>
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
          topings.map(topings=> 
            <div className={styleDetail2.TopingMAIN}>
            <button style={{color: "black"}} onClick={()=>handleDelete(topings.id)} >X</button>
            <button style={{color: "black"}} onClick={()=>handleEdit(topings.id)} >edit</button>
            <div className={styleDetail2.variant1}>
              {add && (<img src={Choose} className={styleDetail2.choose}/>)}
                <img className={styleDetail2.imgToping} src={topings.image} alt="" onClick={() => setAdd(!add)} />
            </div>
              <p style={{color: "rgb(236, 58, 58)", marginTop: "-35px", marginLeft: "10px"}}>{topings.price}</p>
              <p style={{fontWeight: "bold", color : "rgb(236, 58, 58)", marginTop: "-20px", marginLeft: "5px"}}>{topings.name}</p>
          </div>)}

          </div>
          <div className={style.down}>
            <p className={style.thisTitleTotal}>Total</p>
            <p style={{fontSize: "20px", color: "rgba(151, 74, 74, 1)"}}>0</p>
            <button className={style.btn}>Add Cart</button>
          </div>
          </div>
      </div>)
      }
    {/* {product.length !==0 ? (product?.map((item, index)=>(<ProductDetail item={item} key={index} />))) : ( <p>No Product yet</p> ) } */}
    </div>
    </div>
  </div>)
}


