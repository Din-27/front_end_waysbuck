import React, {useState} from "react";
import { API } from "../config/api";
import { Col } from 'react-bootstrap'
import iconDelete from '../assets/Vector (5).png'
import styleCart from '../pages/Transaction.module.css'
import { useNavigate } from "react-router-dom";
import swal from "@sweetalert/with-react";
import Choose from '../assets/Vector5.png'
import styleDetail2 from '../pages/DetailProduct.module.css'



const Struk = ({image, index, name, price, id}) =>{
    
    const navigate = useNavigate()
    const [idDelete, setIdDelete] = useState([])
    const [add, setAdd] = useState()

    const handleAdd = async() => {
        setAdd(!add)
        const response = await API.get(`/order/${id}`)
        // console.log(data);
        // response.find(item => item.id === id).add = !add
    }


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
            swal("Poof! Your imaginary file has been deleted!", {
              icon: "success",
            });
            navigate('/page-user')
          } else {
            swal("Your imaginary file is safe!");
          }
        });
      } catch (error) {
        console.log(error);
      }
    }

    return (
        <div onClick={handleAdd}>
        <div className={styleCart.transactionOrder1} key={index}>
                <div className={styleCart.cartorder1}>
                {add && <img src={Choose} className={styleDetail2.choose}/>}
                    <img src={image} alt=""/>
                <div className={styleCart.description1}>
                <div className={styleCart.titleDescript}>
                    <p>{name}</p>
                    <p style={{fontSize: "12px", marginTop: "-10px"}}>saturday, <span style={{fontSize: "12px", fontWeight: "normal"}}>5 March 2022</span></p>
                </div>
                <div className={styleCart.topingOrder}>
                    <p style={{fontWize: "12px", fontWeight: "bold", color: "rgba(151, 74, 74, 1)", marginLeft: "35px"}}>Toping :</p>
                    <p style={{fontWize: "12px", color: "rgba(189, 7, 7, 1)"}}>{name}</p>
                </div>
                </div>
                    <Col>
                        <p style={{marginLeft: "35px", color: "rgba(151, 74, 74, 1)", marginTop: "20px"}}>Rp.{price + price}{" "}</p>
                        <img src={iconDelete} alt="" style={{width: "20px", height: "20px", marginLeft: "80px"}} onClick={()=>handleDelete(id)} />
                    </Col>
                </div>
            </div>
        </div>
    )
}

export default Struk
