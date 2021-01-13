import React, {useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {getBugs} from '../../Controllers/Redux/bugSlice';
import BugCard from '../Components/Bug Card/bugCard';
import BugView from '../Components/Bug view/bugView.jsx';
import bugModel from '../../Models/bugModel';
import axios from "axios";



export default()=>{
    const [bugs, setBugs] = useState([]);

    const [DISPLAY_BUG, SET_DISPLAY_BUG]=useState({
        name:"",
        isDisplayed:false
    });
    // const dispatch = useDispatch();
    // const { bugs } = useSelector(state=>state.data);

    useEffect(() => {
       axios.get("/api/bug")
       .then((response) => {
            const data = response.data.map(bug => new bugModel(bug));
            const sorted = data.sort((a,b)=>{return a.priority-b.priority;});
            setBugs(sorted);
          });
    }, []);

    // useEffect(()=> {
    //     dispatch(getBugs("/api/bug"));
    // },[bugs.length < 1]);

    function BugClicked(name){
        SET_DISPLAY_BUG({
            isDisplayed: !DISPLAY_BUG.isDisplayed,
            name:name,
        });

    }

    // axios.get("/api/bug")
    //     .then((response) => {
    //         let data = [];
    //         response.data.forEach(b => data.push(new bugModel(b)));
    //         let sorted = data.sort((a,b)=>{return a.priority-b.priority;});
    //         setBugs1(sorted);
    //         // console.log(bugs1);
    //       });


    return(
    <div className="page-container">
        {bugs.map((bug,key)=>(
            <BugCard key ={key} bug={bug} clicked={BugClicked} />
            ))}
        {DISPLAY_BUG.isDisplayed && <BugView clicked={BugClicked} bug={bugs.filter((bug) => bug.name === DISPLAY_BUG.name)[0]} />}
    </div> 

    )
}