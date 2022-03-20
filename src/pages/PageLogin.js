import styleModuleLogin from './Page1.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Navbar from '../navbar/Navbar'
import { API, setAuthToken } from '../config/api'
import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { useEffect } from 'react'
import jumbotron from '../assets/Jumbotron.png'













function Page () {

  const navigate = useNavigate()
  const [state, dispatch] = useContext(UserContext);
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (state.isLogin === false && !localStorage.token) {
      navigate("/");
    } else {
      if (state.data.role === "admin") {
        navigate("/page-admin");
      }else if (state.data.role === "customer"){
        navigate("/page-user");
      }
    }
  }, [state]);

  const chekUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }
      let payload = response.data.data.user;
      payload.token = localStorage.token;
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    chekUser();
  }, []);

  console.clear()
      const [products, setProducts] = useState([]);
      const [topings, setTopings] = useState([]);

      const getProducts = async () => {
        try {
          const response = await API.get("/products");
          setProducts(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
  
      useEffect(() => {
        getProducts();
      }, []);



    

    return ( <div>
                <Navbar/>
                        <div className={styleModuleLogin.mainLanding}>
                            <div className={styleModuleLogin.banner}>
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
                                    <img style={{marginLeft: "30px"}} src={jumbotron} alt=""/>
                                </div>
                            </div>
                            <h4 style={{color: "red", marginLeft: "80px", marginBottom: "40px", marginTop:"20px", fontWeight: "bold"}}>Products</h4>
                          <div>
                              <div className={styleModuleLogin.contentOrder}>
                                {products.map(products => 
                              <Link to={`/product/${products.id}`} style={{ textDecoration: "none" }} key={products.id}>
                                    <div className={styleModuleLogin.order1}>
                                        <img src={products.image} alt={products.name}/>
                                        <div className='descriptOrder1'>
                                            <p style={{fontWeight: "bold", marginBottom: "5px"}}>{products.name}</p>
                                            <p>{products.price}</p>
                                        </div>
                                    </div>
                              </Link>)}
                            </div>
                          </div>
                        </div>
        </div>
    )
    
}

export default Page;
