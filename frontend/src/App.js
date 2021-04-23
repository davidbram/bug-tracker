import React from 'react';
import {useSelector} from 'react-redux';
import Login from './Views/Pages/Login/login';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Sidebar from './Views/sidebar/sidebar';
import ViewBugPage from './Views/Pages/viewBugs';
import CreateBug from './Views/Pages/createBug';
import Dashboard from '../src/Views/Pages/dashboard';
import Signup from "../src/Views/Pages/Signup/signup";
import ViewProject from "./Views/Pages/Project/viewProject";

function App() {
  const {auth} = useSelector(state => state);
  return (
    <Router>
    <Switch>
      <Route exact path='/'><Login /></Route>
      <Route exact path='/signup' component={Signup}/>
      {auth.LoggedIn && <>
        <Sidebar />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/viewbugs" component={ViewBugPage} />
        <Route exact path="/viewproject" component={ViewProject} />
        <Route exact path="/create" component={CreateBug} />
      </>}
    </Switch>
    </Router>
  );
}

export default App;
