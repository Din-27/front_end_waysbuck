import React, { useEffect } from 'react'
import styleDetail2 from '../pages/DetailProduct.module.css'
import Choose from '../assets/Vector5.png'
import { useState } from 'react'






export default function TopingCard({item, index}) {
    const [add, setAdd] = useState()

    


  return (
      <div className={styleDetail2.TopingMAIN}>
          <div className={styleDetail2.variant1}>
            {add && (<img src={Choose} className={styleDetail2.choose}/>)}
            <img className={styleDetail2.imgToping} src={item.image} alt="" onClick={() => setAdd(!add)} />
          </div>
              <p style={{color: "rgb(236, 58, 58)", marginTop: "-35px", marginLeft: "10px"}}>{item.price}</p>
          <p style={{fontWeight: "bold", color : "rgb(236, 58, 58)", marginTop: "-20px", marginLeft: "5px"}}>{item.name}</p>
      </div>
  )
}
