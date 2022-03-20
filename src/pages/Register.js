import styleRegister from './style.module.css'
import React, { useState } from 'react';
import { API } from '../config/api'
import swal from 'sweetalert';
import close from '../assets/close.png'



export default function Register(props){

    const [message, setMessage] = useState(null);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
      })

    const { name, email, password } = form;
    const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    };

    const handleSubmit = async (e) => {
        try{
          e.preventDefault();
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
          const body = JSON.stringify(form);
          const response = await API.post("/register", body, config);
          console.log(response);
          if (response.data.status === "success") {
            swal("Register Success!", "You clicked the button!", "success")
            setForm({
              name: "",
              email: "",
              password: "",
            });
          } else {
            swal("Register Failed!", "You clicked the button!", "error")
          }
        }catch(e){
          swal("Register Failed!", "Password length must be at least 8!", "error")

        }
      }

    
        return (props.trigger) ? 
        (<div className={styleRegister.containerPopupRegister}>
            <form className={styleRegister.formContainerRegister} method="post" onSubmit={handleSubmit}>
            <img src={close} alt=""  style={{width: "20px", margin: "10px"}} onClick={()=> props.setTrigger(false)}/>
                <p className={styleRegister.title}>Register</p>
                <div>
                    <input className={styleRegister.name} placeholder="Name" value={name}
                    name="name"
                    onChange={handleChange}  required />
                </div>
                <br />
                <div>
                    <input type="email" className={styleRegister.email} placeholder="Email"value={email}
                    name="email"
                    onChange={handleChange}required />
                </div>
                <br/>
                <div>
                    <input type="password" className={styleRegister.password} placeholder="Password" value={password}
                    name="password"
                    onChange={handleChange} required />
                </div>
                <br/>
                <div>
                    <button className={styleRegister.button1} type="submit">Register</button>
                </div>
                <p className={styleRegister.formText}>Don't have an account? klik <span onClick={()=> props.setTrigger(false)} className={styleRegister.signUp}>Here</span></p>
            </form>
        </div>) : "";
}
