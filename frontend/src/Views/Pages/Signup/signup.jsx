import {createUser} from "../../../Controllers/Redux/authSlice";
import {useDispatch} from 'react-redux';
import React, { useState } from "react";
import "./signup.css";

function Signup(){

    const dispatch = useDispatch();
    const [details,setDetails] = useState({
        username:"",
        email:"",
        password:"",
        passwordc:""
    })

    function updateDetails(event){
        const { name, value} = event.target;
        setDetails({
            ...details,
            [name]:value
        })
    }

    function handleSubmit(event){
        console.log(details);
        dispatch(createUser(details));
        event.preventDefault();
    }

    return(
        <div className="loginBG">
            <form className="login-panel" onSubmit={handleSubmit}>
                <h1>Signup:</h1>
                <input name="username" type="text" placeholder="Name" onChange={updateDetails} value={details.username}/>
                <input name ="email" type="email" placeholder="Email" onChange={updateDetails} value={details.email}/>
                <input name="password" type="password" placeholder="Password" onChange={updateDetails} value={details.password}/>
                <input name="passwordc" type="password" placeholder="Confirm Password" onChange={updateDetails} value={details.passwordc}/>
                <button type="submit" className="login-btn">Signup</button>
                <p margin="50">Already existing user ? Login <a href="/login">here</a></p>
            </form> 
        </div>
    )
}

export default Signup