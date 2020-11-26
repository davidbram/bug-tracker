import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import {signIn} from '../../../Controllers/Redux/authSlice';
import './login.css';

export default ()=>{
    const dispatch = useDispatch();
    const [formInput, setFormInput] = useState({
        name:"",
        password:""
    });

    function inputChanged(e){
        setFormInput({
            ...formInput,
            [e.target.name]:e.target.value
        })
    }

    function submit(e){
        dispatch(signIn(formInput));
        e.preventDefault();
    }

    return(
        <div className="loginBG">
            <form className="login-panel">
                <h1>Login:</h1>
                <input name="name" placeholder="Name" onChange={inputChanged} value={formInput.name}/>
                <input name="password" type="password" placeholder="Password" onChange={inputChanged} value={formInput.password}/>
                <button type="submit" className="login-btn" onClick={submit}>Login</button>
                <p>New User ? <a href="/signup">Click here</a></p>
            </form>
        </div>
    )
}