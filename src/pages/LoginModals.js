import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styleLogin from './style.module.css'
import { API } from "../config/api";
import { UserContext } from '../context/userContext'
import swal from 'sweetalert'
import close from '../assets/close.png'



export default function LoginModal (props) {
  console.clear()
    const history = useNavigate()
    const [state, dispatch] = useContext(UserContext);
    const [form, setForm] = useState({
        email: "",
        password: "",
      });
    
      const { email, password } = form;
    
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

          const response = await API.post("/login", body, config);
          console.log(response);

          if (response?.status == 200) {
            dispatch({
              type: "LOGIN_SUCCESS",
              payload: response.data.data.user,
            });
    
            if (response.data.data.user.role == "admin") {
              history("/page-admin");
            } if (response.data.data.user.role == "customer"){
              history("/page-user");
            }
            swal("Login Success!", "You clicked the button!", "success"); 
          }
      }catch(error){
        swal("Email & Password Not Match!", "You clicked the button!", "error");
      }
    }

    const handleRegister = () => {
        history("/register")
    }


    

    return  (props.trigger) ? (<div className={styleLogin.containerPopupLoginModals}>
                    <form className={styleLogin.formContainerLoginModals} method="post" onSubmit={handleSubmit}>
                        <img src={close} alt="" onClick={()=>props.setTrigger(false)} style={{width: "20px", margin: "10px"}}/>
                            <p className={styleLogin.title}>Login</p>
                        <div>
                            <input className={styleLogin.email} placeholder="Email" value={email}
                            name="email"
                            onChange={handleChange}/>
                        </div>
                        <br/>
                        <div>
                            <input type="password" className={styleLogin.password} placeholder="Password" id="password" value={password}
                            name="password"
                            onChange={handleChange}/>
                        </div>
                        <br/>
                        <div>
                            <button className={styleLogin.button1} type="submit">Login</button>
                        </div>
                        <p className={styleLogin.formText}>Don't have an account? klik <span onClick={handleRegister} className={styleLogin.signUp}>Here</span></p>
                    </form>
                </div>) : "";

}