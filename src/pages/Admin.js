import React from 'react'
import './admin.css'
import {useState} from 'react'
import NavbarAdmin from '../navbar/NavbarAdmin'
import { API } from '../config/api'
import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import swal from 'sweetalert'



function Admin() {

    const {id} = useParams()
    const [buyer, setBuyer] = useState([])
    const navigate = useNavigate()


    console.log(buyer);
    const getBuyer = async () =>{
        try {
            const response = await API.get('/transactions')
            setBuyer(response.data.data.transactions)
            // setBuyerBody(response.data.data.transactions[0])
            // console.log(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleActionSuccess = async () =>{
         const response = API.patch(`/transaction/${id}`)       
        // console.log(response);
        swal("Success!", "You clicked the button!", "success");
        navigate('/admin')  
    }

    const handleActionCancel = async () =>{
        const response = API.patch(`/transaction-cancel/${id}`)            
        // console.log(response);
        swal("Success Cancel Action!", "You clicked the button!", "success");
        navigate('/admin')
    }

    const handleActionOTW = async () =>{
        const response = API.patch(`/transaction-otw/${id}`)            
        // console.log(response);
        swal("Success OTW Action!", "You clicked the button!", "success");
        navigate('/admin')
    }

    
    useEffect(()=>{
        getBuyer()
    }, [])

    return (
        <div>
            <NavbarAdmin/>
            <div className="container-admin">
                <h2>income Transactions</h2>
                <div className="table-main">
                    <table>
                        <thead style={{textAlign: "center"}}>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Postcode</th>
                                <th>Income</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        { buyer && buyer.map((item, index)=>(
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.address}</td>
                                <td>{item.postcode}</td>
                                <td>
                                    <p
                                        style={{
                                            textDecoration: "none"
                                        }}>{item.order.product.price + item.order.toping.price}</p>
                                </td>
                                <td
                                style={{
                                    color: "rgba(255, 153, 0, 1)"
                                }}>{item.status}</td>
                                <td>
                                <Link to={`/Admin/` + item.id} style={{ textDecoration: "none" }} key={item.id}>
                                    <button
                                        style={{
                                            backgroundColor: "rgba(255, 7, 66, 1)",
                                            border: "none",
                                            color: "white",
                                            borderRadius: "5px",
                                            marginRight: "10px"
                                        }}
                                        onClick={handleActionCancel}
                                        >Cancel</button>
                                    <button
                                        style={{
                                            backgroundColor: "blue",
                                            border: "none",
                                            color: "white",
                                            borderRadius: "5px",
                                            marginLeft: "10px"
                                        }}
                                        onClick={handleActionOTW}
                                        >On The Way</button>
                                    <button
                                        style={{
                                            backgroundColor: "rgba(10, 207, 131, 1)",
                                            border: "none",
                                            color: "white",
                                            borderRadius: "5px",
                                            marginLeft: "10px"
                                        }}
                                        onClick={handleActionSuccess}
                                        >Approve</button>
                                    </Link>
                                </td>
                            </tr>))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Admin