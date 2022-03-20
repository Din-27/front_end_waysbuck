import React, { useEffect, useState } from 'react';
import styleTrans from './Transaction.module.css'
import Logo from "../assets/WaysBucks 1.png"
import ImageQr from "../assets/Group 10.png"
import { API } from '../config/api';
import close from '../assets/close.png'
import { useParams } from 'react-router-dom';






function Transaction(props) {

    const {id} = useParams()
    const [transaction, setTransaction] = useState([])
    const [product, setProduct] = useState([])
    const [toping, setToping] = useState([])
    const path = 'http://localhost:5000/uploads/'


    console.log(transaction);
    const getMyTransaction = async () =>{
        try {
            const response = await API.get(`/transaction/${id}`)
            setTransaction(response.data.data.data)
            // setToping(response.data.data[0].toping)
            console.log(response);
            // setProduct(response.data.data[0].product)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getMyTransaction()
    }, [])


  return (props.trigger) ? (<div>
      {transaction && transaction.map(transaction=>
        <div className={styleTrans.containerProfile}>
        <div className={styleTrans.rightContent}>
        <div className={styleTrans.descriptTransaction}>
            <img src={close} alt="" onClick={()=>props.setTrigger(false)} style={{width: "20px", margin: "10px"}}/>
                <div className={styleTrans.transactionOrder1}>
                <div className={styleTrans.order1}>
                    <img src={path + transaction.order.product.image} alt=""/>
                    <div className={styleTrans.description1}>
                        <div className={styleTrans.titleDescript}>
                            <p>{transaction.order.product.name}</p>
                            <p style={{fontSize: "12px", marginTop: "-10px"}}>saturday, <span style={{fontSize: "12px", fontWeight: "normal"}}>5 March 2022</span></p>
                        </div>
                        <div className={styleTrans.topingOrder}>
                            <p style={{fontWize: "12px", fontWeight: "bold", color: "rgba(151, 74, 74, 1)", marginLeft: "35px"}}>Toping :</p>
                            <p style={{fontWize: "12px", color: "rgba(189, 7, 7, 1)"}}>{transaction.order.toping.name}</p>
                        </div>
                        <p style={{marginLeft: "35px", color: "rgba(151, 74, 74, 1)", marginTop: "-20px"}}>Price : <span>{transaction.order.toping.price + transaction.order.product.price}</span></p>
                    </div>
                </div>
            </div>
        </div>
        <div className={styleTrans.imageQr}>
                <img className={styleTrans.logo} src={Logo} alt=""/>
                <img src={ImageQr} alt=""/>
                <p style={{fontSize: "12px", marginLeft: "53px", color: "rgba(0, 209, 255, 1)", backgroundColor: "rgba(0, 208, 255, 0.151)", textAlign: "center", marginRight: "30px", borderRadius: "3px"}}>{transaction.status}</p>
                <p style={{fontSize: "14px", marginLeft: "28px", fontWeight: "bold", color: "rgba(151, 74, 74, 1)"}}>Subtotal : {transaction.order.toping.price + transaction.order.product.price}</p>
            </div>
        </div>
    </div>)}
  </div>) : "";
}

export default Transaction;
