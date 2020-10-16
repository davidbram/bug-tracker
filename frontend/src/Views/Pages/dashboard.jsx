import React,{useEffect} from 'react';
import Card from '../Components/Dashboard/card';
import {useDispatch,useSelector} from 'react-redux';
import {getBugs} from '../../Controllers/Redux/bugSlice';

export default() =>{
    const dispatch = useDispatch();
    const bugs = useSelector(state=>state.bugs);
    let midCount = 0;
    let highCount = 0;
    let lowCount = 0;

    if(bugs != undefined){
        highCount = filterBugs(1);
        midCount = filterBugs(2);
        lowCount = filterBugs(3);
    }

    function filterBugs(priority){
        return bugs.filter((bug)=>{return bug.priority == priority});
    }

    useEffect(()=>{
        dispatch(getBugs)
    },[bugs == undefined]
    )
    return(
        <div className="page-container">
            <Card priority='1' count="10" />
            <Card priority='2' count="10"/>
            <Card priority='3' count="10"/>
        </div>
        
    );
}