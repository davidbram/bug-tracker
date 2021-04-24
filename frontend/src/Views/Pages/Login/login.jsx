import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import {signIn} from '../../../Controllers/Redux/authSlice';
import './login.css';
import { useHistory } from 'react-router-dom';


export default (props)=>{
    const history = useHistory();
    const dispatch = useDispatch();
    function inputChanged(e){
        props.setFormInput({
            ...props.formInput,
            [e.target.name]:e.target.value
        })
      }

    function submit(e){
        console.log(props.formInput);
        if((props.formInput.username === "admin" && props.formInput.password === "admin") || (props.formInput.username === "test" && props.formInput.password === "test") )
        {
            dispatch(signIn(props.formInput));
            e.preventDefault();
            history.push("/dashboard");
        }
    }

    return(
        <div className="loginBG">
            <form className="login-panel" onSubmit={submit}>
                <h1>Login:</h1>
                <input name="username" placeholder="Name" onChange={inputChanged} value={props.formInput.username}/>
                <input name="password" type="password" placeholder="Password" onChange={inputChanged} value={props.formInput.password}/>
                <button type="submit" className="login-btn">Login</button>
                <button className="login-btn" onClick= {() =>{history.push('/signup')}}>Create an account</button>
            </form>
        </div>
    )
}
