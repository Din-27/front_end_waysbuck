import './Home.css'
import styleModuleLogin from './Page1.module.css'
import Header from '../assets/Header.png'
import { useState } from 'react'
import LoginModal from './LoginModals'
import Register from './Register'
import { useEffect } from 'react'
import { API } from '../config/api'
import jumbotron from '../assets/Jumbotron.png'





function Home() {
    let [isLogin, setIsLogin] = useState()
    let [isRegis, setIsRegis] = useState()
    console.clear()
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
      try {
        const response = await API.get("/products");
        setProducts(response.data.data);
        // return console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      getProducts();
    }, []);

    



    
  return (
        <div>
            <nav className='container'>
                <div className='left'>
                    <img src={Header} style={{width: "100px", height: "100px"}} alt=""/>
                </div>
                <div className='right'>
                    <button className='btnLogin' onClick={()=>setIsLogin(!isLogin)}>Login</button>
                    <button className='btnRegister' onClick={()=>setIsRegis(!isRegis)}>Register</button>
                </div>
            </nav>
                  <div className='mainLanding'>
                      <div className='banner'>
                      <div className={styleModuleLogin.banner}>
                                    {/* <div className={styleModuleLogin.content}>
                                        <div className={styleModuleLogin.descript}>
                                        <p className={styleModuleLogin.title}>WAYSBUCK</p>
                                        <p>Things are changing, but we're still here for you</p>
                                        <p>We have temporarily closed our in-store cafes, but select grocery and drive-thru locations remaining open. <span style={
                                            {fontWeight: "bold"}}>Waysbucks</span> Drivers is also available</p>
                                        <p>Let's Order...</p>
                                        </div>
                                    </div> */}
                              <img style={{marginLeft: "50px"}} src={jumbotron} alt=""/>
                          </div>
                      </div>

                      <p className='titleOrder'>Let's Order</p>


                    <div>
                        <div className={styleModuleLogin.contentOrder}>
                            {products.map(products => 
                              <div onClick={()=>setIsLogin(!isLogin)}>
                                    <div className={styleModuleLogin.order1}>
                                        <img src={products.image} alt={products.name}/>
                                        <div className='descriptOrder1'>
                                            <p style={{fontWeight: "bold", marginBottom: "5px"}}>{products.name}</p>
                                            <p>{products.price}</p>
                                        </div>
                                    </div>
                              </div>)}
                            </div>
                        </div>
                    </div>

                <LoginModal trigger={isLogin} setTrigger={setIsLogin}/>
                <Register trigger={isRegis} setTrigger={setIsRegis}/>
        </div>
  );
}

export default Home;

