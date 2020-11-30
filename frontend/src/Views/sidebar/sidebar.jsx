import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {signOut} from '../../Controllers/Redux/authSlice';
import './sidebar.css';

export default ()=>{
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
              '/'><h1 className='brand'>Bug-Tracker</h1></Link>
              <ul>
              <li><Link to='/' className='nav-link'>Dashboard</Link></li>
                  <li><Link to='/viewbugs' className='nav-link'>View Bugs</Link></li>
                 {auth.admin && <li><Link to='/create' className='nav-link'>Create Bug</Link></li>}
              </ul>
              <button className='nav-link logout' onClick={SignOut}>Logout</button>

          </div>
    )
}