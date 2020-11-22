import React, {useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {getBugs} from '../../Controllers/Redux/bugSlice';
import BugCard from '../Components/Bug Card/bugCard';
import BugView from '../Components/Bug view/bugView.jsx';
import axios from "axios";



export default()=>{
    var bugs1
    const [DISPLAY_BUG, SET_DISPLAY_BUG]=useState({
        name:"",
        isDisplayed:false
    });
    const dispatch = useDispatch();
    const { bugs } = useSelector(state=>state);

    useEffect(()=> {
        dispatch(getBugs());
    },[bugs.length < 1]);

    function BugClicked(name){
        SET_DISPLAY_BUG({
            isDisplayed: !DISPLAY_BUG.isDisplayed,
            name:name,
        });

    }
    axios.get("http://localhost:3001/bug")
        .then((response) => {
            
            console.log(bugs);
            bugs1 = response.data
            console.log(bugs1);
          });
    return(
    <div className="page-container">
        {bugs.map((bug,key)=>(
            <BugCard key ={key} bug={bug} clicked={BugClicked} />
            ))}
        {DISPLAY_BUG.isDisplayed && <BugView clicked={BugClicked} bug={bugs.filter((bug) => bug.name == DISPLAY_BUG.name)[0]} />}
    </div> 

    )
}