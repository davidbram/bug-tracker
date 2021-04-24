import React, {useState} from 'react';
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
  const [formInput, setFormInput] = useState({
    username:"",
    password:""
});

  return (
    <Router>
    <Switch>
      <Route exact path='/' ><Login formInput={formInput} setFormInput={setFormInput} /></Route>
      <Route exact path='/signup' component={Signup}/>
      {auth.LoggedIn && <>
        <Sidebar username={formInput.username} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/viewbugs" component={ViewBugPage} />
        <Route exact path="/viewproject" component={ViewProject} />
        {formInput.username === "admin" && <Route exact path="/create" component={CreateBug} />}
      </>}
    </Switch>
    </Router>
  );
}

export default App;
