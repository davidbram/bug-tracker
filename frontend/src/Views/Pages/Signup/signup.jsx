import React, { useState } from "react"

function Signup(){

    const [details,setDetails] = useState({
        name:"",
        email:"",
        password:"",
        passwordc:""
    })

    function updateDetails(event){
        setDetails({
            ...details,
            [event.target.name]:event.target.value
        })
    }

    return(
        <div className="loginBG">
            <form className="login-panel">
                <h1>Signup:</h1>
                
                <input name="name" placeholder="Name" onChange={updateDetails} value={details.name}/>
                <input type="email" placeholder="email" name ="email" onChange={updateDetails} value={details.email}/>
                <input name="password" type="password" placeholder="Password" onChange={updateDetails} value={details.password}/>
                <input name="passwordc" type="password" placeholder="Confirm Password" onChange={updateDetails} value={details.passwordc}/>
                <button type="button" className="login-btn">Signup</button>
                <p margine="50">Alredy existing user ? <a href="/login">login</a> here</p>
            </form> 
        </div>
    )
}

export default Signup