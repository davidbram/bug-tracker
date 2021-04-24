import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import {signIn} from '../../../Controllers/Redux/authSlice';
import './login.css';
import { useHistory } from 'react-router-dom';


export default ()=>{
    const history = useHistory();
    const dispatch = useDispatch();
    const [formInput, setFormInput] = useState({
        username:"",
        password:""
    });

    function inputChanged(e){
        setFormInput({
            ...formInput,
            [e.target.name]:e.target.value
        })
    }

    function submit(e){
        console.log(formInput);
        if((formInput.username === "admin" && formInput.password === "admin") || (formInput.username === "test" && formInput.password === "test") )
        {
            dispatch(signIn(formInput));
            e.preventDefault();
            history.push("/dashboard");
        }
    }

    return(
        <div className="loginBG">
            <form className="login-panel" onSubmit={submit}>
                <h1>Login:</h1>
                <input name="username" placeholder="Name" onChange={inputChanged} value={formInput.username}/>
                <input name="password" type="password" placeholder="Password" onChange={inputChanged} value={formInput.password}/>
                <button type="submit" className="login-btn">Login</button>
                <button className="login-btn" onClick= {() =>{history.push('/signup')}}>Create an account</button>
            </form>
        </div>
    )
}
