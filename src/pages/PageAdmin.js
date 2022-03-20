import styleModuleLogin from './Page1.module.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import NavbarAdmin from '../navbar/NavbarAdmin'
import { API, setAuthToken } from '../config/api'
import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { useEffect } from 'react'
import swal from 'sweetalert'
import { Table } from 'react-bootstrap'
import Edit from '../assets/edit.png'
import close from '../assets/close.png'









function Page1 () {

    const navigate = useNavigate()
    const [edit, setEdit] = useState()

    console.clear()
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
          }else if(state.data.role === "customer"){
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


      const [products, setProducts] = useState([]);

      const getProducts = async () => {
        try {
          const response = await API.get("/products");
          setProducts(response.data.data);
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(() => {
        getProducts();
      }, []);

      const [idDelete, setIdDelete] = useState([])

      let handleDelete = async (id)=>{
        try {
          // console.log(setIdDelete);
          swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async (willDelete) => {
            if (willDelete) {
              const res = await API.delete(`/product/${id}`)
              setIdDelete(res.data.data.id)
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
              navigate('/page-admin')
            } else {
              swal("Your imaginary file is safe!");
            }
          });
        } catch (error) {
          console.log(error);
        }
      }

      const [topings, setTopings] = useState([]);

      const getTopings = async () => {
        try {
          const response = await API.get("/topings");
          setTopings(response.data.data);
          // console.log(response);
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getTopings();
      }, []);


      const handleEdit = (id) => {
        navigate("/update-Product/" + id);
      };


      const handleEditToping = (id) => {
        navigate("/update-toping/" + id);
      };

      const [deleteToping, setDeleteToping] = useState([])

      let handleDeleteToping = async (id)=>{
        try {
          swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async (willDelete) => {
            if (willDelete) {
              const res = await API.delete(`/toping/${id}`)
              setDeleteToping(res.data.data.id)
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
              navigate('/page-admin')
            } else {
              swal("Your imaginary file is safe!");
            }
          });
        } catch (error) {
          console.log(error);
        }
      }

      


    return ( <div>
                <NavbarAdmin/>
                      <div className={styleModuleLogin.mainLanding}>
                        <div>
                          <h3 style={{color: "red", marginBottom: "0", marginTop: "20px"}}>Product List</h3>
                          <div className={styleModuleLogin.contentOrder}>
                            <Table striped bordered hover>
                            <thead style={{textAlign: "center"}}>
                              <tr>
                                <th>Image</th>
                                <th>Name Product</th>
                                <th>Price</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                          {products.map(products => 
                            <tbody>
                              <tr>
                                  <td><img src={products.image} alt="" style={{width: "50px", height: "70px"}}/></td>
                                  <td>{products.name}</td>
                                  <td>{products.price}</td>
                                <td>
                                  <img src={close} alt="" onClick={()=>handleDelete(products.id)} style={{width: "20px", margin: "10px"}} />
                                  <img src={Edit} alt="" onClick={()=>handleEdit(products.id)} style={{width: "20px", margin: "10px"}} />
                                </td>
                              </tr>
                            </tbody>)}
                          </Table>
                          </div>
                            <h3 style={{color: "red", marginBottom: "0", marginTop: "20px"}}>Toping List</h3>
                          <div className={styleModuleLogin.contentOrder}>
                              <Table striped bordered hover>
                                  <thead style={{textAlign: "center"}}>
                                    <tr>
                                      <th>Image</th>
                                      <th>Name Toping</th>
                                      <th>Price</th>
                                      <th>Edit</th>
                                    </tr>
                                  </thead>
                          {
                            topings.map(topings=>
                                  <tbody>
                                    <tr>
                                        <td><img src={topings.image} alt="" style={{width: "50px", height: "50px"}} /></td>
                                        <td>{topings.name}</td>
                                        <td>{topings.price}</td>
                                      <td>
                                      <img src={close} alt="" onClick={()=>handleDeleteToping(topings.id)} style={{width: "20px", margin: "10px"}} />
                                      <img src={Edit} alt="" onClick={()=>handleEditToping(topings.id)} style={{width: "20px", margin: "10px"}} />
                                      </td>
                                    </tr>
                                  </tbody>)}
                                </Table>
                          </div>
                        </div>
                      </div>
        </div>
    )
    
}

export default Page1;
