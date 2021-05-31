import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { signOut } from '../../Controllers/Redux/authSlice';
import './sidebar.css';

export default (props)=>{
    const history = useHistory();
    const dispatch = useDispatch();
    const {auth} = useSelector(state => state);

    function SignOut(){
        dispatch(signOut());
        history.push('/');
    }
    return(
          <div className="sidebar">
              <Link className='nav-link' to=
              '/dashboard'><h1 className='brand'>Bug-Tracker</h1><i style={{paddingLeft:"10px"}} class="fas fa-bug fa-sm"></i></Link>
              <ul>
              <li><Link to='/dashboard' className='nav-link'>Dashboard</Link></li>
                  <li><Link to='/viewbugs' className='nav-link'>View Tickets</Link></li>
                 <li><Link to='/create' className='nav-link'>Raise Ticket</Link></li>
                 {props.username === "admin" && <li><Link to="/viewproject" className="nav-link">Projects</Link> </li>}     
              </ul>
               <p>Logged in as { props.username === "admin" ? "Admin" : "Developer" } <i className="fas fa-users-cog"></i></p>
              <button className='nav-link logout' onClick={SignOut}>Logout</button>

          </div>
    )
}
