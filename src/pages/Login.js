import styleLogin from './style.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import React from 'react'



export default class LoginForm extends React.Component{
    constructor(){
        super()
        this.state = {
            email:null,
            password:null
        }
    }
    dataToAPI(e){
        const baseURL = 'http://localhost:5000/api/v1/login'
        const user = {
            email: this.state.email,
            password:this.state.password,
        }
        axios.post(baseURL, user)
    }

    
render(){
    return  (<div className={styleLogin.containerPopupLogin}>
                    <form className={styleLogin.formContainerLogin} method='post' onSubmit={(e)=>this.dataToAPI(e)} >
                            <p className={styleLogin.title}>Login</p>
                        <div>
                            <input type="email" className={styleLogin.email} placeholder="Email" id="email" name='email'  onChange={(e)=>{this.setState({email:e.target.value})}}/>
                        </div>
                        <br/>
                        <div>
                            <input type="password" className={styleLogin.password} placeholder="Password" id="password" name='password'  onChange={(e)=>{this.setState({password: e.target.value})}}/>
                        </div>
                        <br/>
                        <div>
                            <button className={styleLogin.button1} type="submit">Login</button>
                        </div>
                        <p className={styleLogin.formText}>Don't have an account? klik <Link to={('/Register')} className={styleLogin.signUp}>Here</Link></p>
                    </form>
                </div>)
                }
}