import React,{useEffect, useState} from 'react';
import Card from '../Components/Dashboard/card';
import {useDispatch,useSelector} from 'react-redux';
import {getBugs} from '../../Controllers/Redux/bugSlice';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import bugModel from '../../Models/bugModel';

const BUG_TRACKER_SERVER = process.env.REACT_APP_BUG_TRACKER_SERVER;
export default() =>{
    const [bugs, setBugs] = useState([]);
    const dispatch = useDispatch();
    // const bugs = useSelector(state=>state.bugs);
    const browserHistory = useHistory();
    let midCount = 0;
    let highCount = 0;
    let lowCount = 0;

    if(bugs !== undefined){
        highCount = filterBugs(1);
        midCount = filterBugs(2);
        lowCount = filterBugs(3);
    }

    function filterBugs(priority){
        return bugs.filter((bug)=>{return bug.priority === priority});
    }

    function redirect(){
        browserHistory.push('/viewbugs');
    }

    useEffect(() => {
        axios.get(BUG_TRACKER_SERVER + "/api/bug")
       .then((response) => {
            const data = response.data.map(bug => new bugModel(bug));
            setBugs(data);
          });
    }, []);

    useEffect(()=>{
        axios.get(BUG_TRACKER_SERVER + "/api/bug")
       .then((response) => {
            const data = response.data.map(bug => new bugModel(bug));
            setBugs(data);
          });
    },[bugs === undefined]
    );
    
    return(
        <div className="page-container">
            <Card priority='1' count={highCount.length} clicked={redirect}/>
            <Card priority='2' count={midCount.length} clicked={redirect}/>
            <Card priority='3' count={lowCount.length} clicked={redirect}/>
        </div>

    );
}
