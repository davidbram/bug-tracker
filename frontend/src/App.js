import React from 'react';
import {useSelector} from 'react-redux';
import Login from './Views/Pages/Login/login';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Sidebar from './Views/sidebar/sidebar';
import ViewBugPage from './Views/Pages/viewBugs';
import CreateBug from './Views/Components/Bug Create/bugForm';
import Dashboard from '../src/Views/Pages/dashboard'
function App() {
  const {auth} = useSelector(state => state);
  return (
    <Router>
    {!auth.LoggedIn ? <Login /> : 
      <>
      <Sidebar />
      <Switch>
        <Route path="/dashboard"><Dashboard /></Route>
        <Route path="/viewbugs"><ViewBugPage /></Route>
        <Router path="/create"><div className='page-container'><CreateBug title="Create Bug" /></div>
        </Router>
      </Switch>
      </>
    }
    </Router>
  );
}

export default App;
