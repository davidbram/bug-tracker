import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import {signIn} from '../../../Controllers/Redux/authSlice';
import './login.css';
import { useHistory } from 'react-router-dom'


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
        dispatch(signIn(formInput));
        e.preventDefault();
    }

    return(
        <div className="loginBG">
            <form className="login-panel" onSubmit={submit}>
                <h1>Login:</h1>
                <input name="username" placeholder="Name" onChange={inputChanged} value={formInput.username}/>
                <input name="password" type="password" placeholder="Password" onChange={inputChanged} value={formInput.password}/>
<<<<<<< HEAD
                <button type="submit" className="login-btn">Login</button>
                <button className="login-btn" onClick= {() =>{history.push('/signup')}}>Create an account</button>
            </form> 
=======
                <button type="submit" className="login-btn" onClick={submit}>Login</button>
                <p>New User ? <a href="/signup">Click here</a></p>
            </form>
>>>>>>> 8b3167a485836a47196e7774290361f45126fc7a
        </div>
    )
}