import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import { Row, Col, Form, FloatingLabel, Button } from 'react-bootstrap'
import styleCart from './Transaction.module.css'
import { API, setAuthToken } from '../config/api';
import { UserContext } from '../context/userContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import swal from '@sweetalert/with-react';
import iconDelete from '../assets/Vector (5).png'
import CeklisCart from '../component/CeklisCart'









function Cart() {
  console.clear()
    const {id} = useParams()
    const [order, setOrder] = useState([])
    const [total, setTotal] = useState([])
    const [transaction, setTransaction] = useState([])
    const [add, setAdd] = useState([])
    const navigate = useNavigate()
    const path = 'http://localhost:5000/uploads/'


    const [state, dispatch] = useContext(UserContext);
      useEffect(() => {
        if (localStorage.token) {
          setAuthToken(localStorage.token);
        }

        if (state.isLogin === false && !localStorage.token) {
          navigate("/");
        }
      }, [state]);
    
    const getMyTransaction = async () =>{
          try {
            const response = await API.get('/my-transactions')
            setTransaction(response.data.data)
        } catch (error) {
            console.log(error);
        }
      }


    let history = useNavigate()
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    postcode: "",
    address: "",
    image: "",
    idOrder: id,
  }); 

  const handleChangePay = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const getOrder = async () => {
    try {
      const response = await API.get(`/order/${id}`);
      setOrder(response.data.data.data);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
    setAdd(!add)
  }


  const handlePay = async (e) => {
    try {
      e.preventDefault();


      const config = {
        headers: {
          "Content-type": "application/json",
        }
      };
    const formData = new FormData();
    formData.set("name", form.name);
    formData.set("email", form.email);
    formData.set("phone", form.phone);
    formData.set("postcode", form.postcode);
    formData.set("address", form.address);
    formData.set("image", form.image[0]);

    // console.log(form);
    const response = await API.post(`/payout/${id}`, formData, config);
    console.log(response);
    history("/page-user");
    swal("Order Hanya Bisa 1 Product!", "Silahkan Lakukan CheckOut Kembali!", "success");
    } catch (error) {
      console.log(error);
      swal("Please upload Struck!", "You clicked the button!", "warning");
    }
  };


  
  
    const [idDelete, setIdDelete] = useState([])

    // console.log(idDelete);
    let handleDelete = async (id)=>{
      try {
        swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this imaginary file!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then(async(willDelete) => {
          if (willDelete) {
            const res = await API.delete(`/order/${id}`)
            setIdDelete(res.data.data.id)
            getMyTransaction()
            getOrder()
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
    
    console.log(transaction.map((x ,y)=> y + 1));
    const Cancel =()=>{
      navigate('/page-user')
    }
  

    useEffect(()=>{
        getMyTransaction()
        getOrder()
    }, [])


  return (
    <div>
        <Navbar/>
         
            <Row className={styleCart.Cart}>
                    <p style={{fontSize: "35px", fontWeight: "bold", color: "rgba(189, 7, 7, 1)"}}>My Cart</p>
                    <p style={{marginBottom: "0"}}>Review Your Order</p>
                    <Col>
                    <hr style={{height: "5px", color: "red"}}/>
                    {transaction && transaction.map((item, index) =>
                          <div className={styleCart.transactionOrder1} key={index}>
                          <div className={styleCart.cartorder1}>
                              <img src={path + item.product.image} alt=""/>
                              <div className={styleCart.description1}>
                                  <div className={styleCart.titleDescript}>
                                      <p>{item.product.name}</p>
                                      <p style={{fontSize: "12px", marginTop: "-10px"}}>saturday, <span style={{fontSize: "12px", fontWeight: "normal"}}>5 March 2022</span></p>
                                  </div>
                                  <div className={styleCart.topingOrder}>
                                      <p style={{fontWize: "12px", fontWeight: "bold", color: "rgba(151, 74, 74, 1)", marginLeft: "35px"}}>Toping :</p>
                                      <p style={{fontWize: "12px", color: "rgba(189, 7, 7, 1)"}}>{item.toping.name}</p>
                                  </div>
                              </div>
                          <Col>
                              <p style={{marginLeft: "35px", color: "rgba(151, 74, 74, 1)", marginTop: "20px"}}>Rp.{item.product.price + item.toping.price}{" "}</p>
                              <img src={iconDelete} alt="" style={{width: "20px", height: "20px", marginLeft: "80px"}} onClick={()=>handleDelete(item.id)} />
                          </Col>
                          </div>
                      </div>)}
                    <hr style={{height: "5px", color: "red"}}/>
                      {/* <CeklisCart price={transaction.map((x)=> x.product.price)} length={transaction.length}/> */}
                    <Row className='container'>

                        <hr style={{height: "5px", color: "red"}}/>
                        <Col>
                            <p>Qty</p>
                            <p>Total : </p>
                        </Col>
                        <Col>
                            <p>{transaction.length}</p>
                            <p style={{marginBottom: "-40px"}}>Rp.
                            {transaction.map(x=> x.toping.price + x.product.price).slice(-1) * transaction.length}
                            </p>
                        </Col>
                        <hr style={{height: "5px", color: "red"}}/>
                    </Row>
                    </Col>
                    <Col className='container' style={{marginTop: "40px", marginLeft: "20px" }}>
                      <form method="post" onSubmit={handlePay}>
                        <div>
                          <input className={styleCart.form}
                          placeholder='Name'
                          name="name"
                          onChange={handleChangePay} />
                        </div>
                        <div>
                          <input className={styleCart.form} 
                          placeholder='Email' 
                          name="email"
                          onChange={handleChangePay}/>
                        </div>
                        <div>
                          <input className={styleCart.form}
                          placeholder='Phone' type="number" 
                          name="phone"
                          onChange={handleChangePay}/>
                        </div>
                        <div>
                          <input className={styleCart.form}
                          placeholder='Post Code' type="number" 
                          name="postcode"
                          onChange={handleChangePay}/>
                        </div>
                        <div>
                          <input
                          type="file" 
                          name="image"
                          onChange={handleChangePay}/>
                        </div>
                        <div>
                          <textarea className={styleCart.form}
                          placeholder='Address' style={{resize: "none"}} 
                          name="address"
                          onChange={handleChangePay}/>
                        </div>
                        <div>
                          <button className={styleCart.btn}>Pay</button>
                        </div>
                        <div>
                          <button className={styleCart.btn} onClick={Cancel}>Cancel</button>
                        </div>
                      </form>
                      </Col>
            </Row>
        
    </div>)
}

export default Cart;
