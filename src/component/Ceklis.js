import React, {useState} from "react";
import { API } from "../config/api";
import Choose from '../assets/Vector5.png'
import styleDetail2 from '../pages/DetailProduct.module.css'

const Ceklis = ({image, name, price, id}) =>{
    const [add, setAdd] = useState(false)

    const handleAdd = async() => {
        setAdd(!add)
        const response = await API.get(`/order/${id}`)
        // console.log(data);
        // response.find(item => item.id === id).add = !add
    }

    return (
        <div onClick={handleAdd}>
            <div className={styleDetail2.TopingMAIN}>
                    <div className={styleDetail2.variant1}>
                        {add && <img src={Choose} className={styleDetail2.choose}/>}
                      <img className={styleDetail2.imgToping} src={image} alt=""/>
                    </div>
                        <p style={{color: "rgb(236, 58, 58)", marginTop: "-35px", marginLeft: "10px"}}>{price}</p>
                    <p style={{fontWeight: "bold", color : "rgb(236, 58, 58)", marginTop: "-20px", marginLeft: "5px"}}>{name}</p>
                </div>
        </div>
    )
}

export default Ceklis
