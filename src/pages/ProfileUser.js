import React, { useContext, useEffect } from 'react';
import styleProfile from './Profile.module.css'
import Logo from "../assets/WaysBucks 1.png"
import ImageQr from "../assets/Group 10.png"
import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import User from '../assets/man.png'
import { API } from '../config/api';
import Navbar from '../navbar/Navbar';
import { UserContext } from '../context/userContext';
import { Row, Col } from 'react-bootstrap'
import Edit from '../assets/edit.png'
import Close from '../assets/close.png'




function ProfileUser() {

    console.clear()
    const navigate = useNavigate()
    const [count, setCount] = useState(0);
    const [edit, setEdit] = useState(false)
    const [state, dispatch] = useContext(UserContext)
    const path = 'http://localhost:5000/uploads/'
    const [preview, setPreview] = useState(null);
    const [transactions, setTransactions] = useState([])
    const [form, setForm] = useState({
      name: "",
      email: "",
      image: "",
    }); 
    console.log(transactions);
    const getTransactions = async () =>{
      try {
        const response = await API.get('/transactions')
        setTransactions(response.data.data.transactions)
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    }


    
    const handleSubmit = async (e) => {
        try {
          e.preventDefault();
      
          const config = {
            headers: {
              "Content-type": "multipart/form-data",
            },
          };
      
          const formData = new FormData();
          if (form.image) {
            formData.set("image", form?.image[0], form?.image[0]?.name);
          }
          formData.set("name", form.name);
          formData.set("email", form.email);
      
          const response = await API.patch(
            "/user/" + state.data.id,
            formData,
            config
          );
          console.log(response.data);
      
          setEdit(false);
          getTransactions()
          state()
        } catch (error) {
          console.log(error);
        }
      };

      const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        });
        if (e.target.type === "file") {
          let url = URL.createObjectURL(e.target.files[0]);
          setPreview(url);
        }
      };

    

      
      const handleEdit = (id) => {
        setEdit(!edit)
        navigate("/profile-user/" + state.data.id);
    };
    
    useEffect(()=>{
      getTransactions()
    }, [])
  


  return <div>
        <Navbar count={count} setCount={setCount}/>
          <Row className="container" style={{marginBottom: "100px", marginLeft: "120px"}}>
            <Col className={styleProfile.Right}>
              <h2 className={styleProfile.leftTitle, 'me-3'}>My profile</h2>
              {state.data.image === null ? <img src={User} alt="" style={{width : '50px'}}/> : 
              <img src={path + state.data.image} style={{width : '50px'}} alt=""/>}
              {edit ? <img src={Close} alt="" onClick={handleEdit} style={{width: "20px"}}/> : <img src={Edit} alt="" onClick={handleEdit} style={{width: "20px"}}/>}
                {edit ? (
                    <form onSubmit={handleSubmit}>
                      <img src={state.data.image} alt="" className="ms-5"/>
                        <div className='mb-4'>
                            <input placeholder={state.data.name} name='name' onChange={handleChange}/>
                        </div>
                        <div className='mb-4'>
                            <input placeholder={state.data.email} name='email' onChange={handleChange} />
                        </div>
                        <div className='mb-4'>
                            <input type='file' name='image' onChange={handleChange} />
                        </div>
                        <div className='mb-4'>
                            <button className='btn btn-primary'>submit edit</button>
                        </div>
                    </form>
                ) : (
                <Col>
                  <div className={styleProfile.biodata}>
                    <img style={{width : '50px'}} src={preview} alt=""/>
                  <div className={styleProfile.edit, 'ms-5'}>
                      <h3>Full Name</h3>
                      <p>{state.data.name}</p>
                  </div>
                  <div className={styleProfile.down, 'ms-5'}>
                      <h3>Email</h3>
                      <p>{state.data.email}</p>
                  </div>
                  </div>
                </Col>)}
            </Col>
            <Col>
            <h2 className={styleProfile.rightTitle}>My Transaction</h2>
            {transactions.map((item, index) => 
                  <div key={index} style={{backgroundColor: "rgba(246, 218, 218, 1)", display: "flex", marginRight: "50px", borderRadius: "10px"}}>
                  <div className={styleProfile.descriptTransaction}>
                          <div className={styleProfile.transactionOrder1}>
                          <div className={styleProfile.order1}>
                          <img src={path + item.order.product.image} alt=""/>
                              <div className={styleProfile.description1}>
                                  <div className={styleProfile.titleDescript}>
                                      <p>{item.order.product.name}</p>
                                      <p style={{fontSize: "12px", marginTop: "-10px"}}>saturday, <span style={{fontSize: "12px", fontWeight: "normal"}}>5 March 2022</span></p>
                                  </div>
                                  <div className={styleProfile.topingOrder}>
                                      <p style={{fontSize: "12px", fontWeight: "bold", color: "rgba(151, 74, 74, 1)", marginLeft: "35px"}}>Toping :</p>
                                      <p style={{fontSize: "12px", color: "rgba(189, 7, 7, 1)"}}>{item.order.toping.name}</p>
                                  </div>
                                  <p style={{marginLeft: "35px", color: "rgba(151, 74, 74, 1)", marginTop: "-20px"}}>Price : <span>{item.order.product.price + item.order.toping.price}</span></p>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className={styleProfile.imageQr}>
                          <img className={styleProfile.logo} src={Logo} alt="" />
                          <img src={ImageQr} alt="" />
                          <p style={{fontSize: "12px", marginLeft: "53px", color: "rgba(0, 209, 255, 1)", backgroundColor: "rgba(0, 208, 255, 0.151)", textAlign: "center", marginRight: "30px", borderRadius: "3px"}}>{item.status}</p>
                          <p style={{fontSize: "14px", marginLeft: "28px", fontWeight: "bold", color: "rgba(151, 74, 74, 1)"}}>Subtotal : {item.order.product.price + item.order.toping.price }</p>
                      </div>
                  </div>)}  
            </Col>
          </Row>
</div>;
}

export default ProfileUser;


