import React,{useState} from 'react';
import ViewSection from './component/bugViewSection';
import './bugView.css';
import BugModel from '../../../Models/bugModel';
import {useDispatch} from 'react-redux';
import {markComplete} from '../../../Controllers/Redux/bugSlice';
import EditPanel from '../edit delete/editPanel';
import EditBug from '../Bug Create/bugForm';
import axios from 'axios';

export default (props)=>{
    const dispatch = useDispatch();
    const bug = new BugModel(props.bug);

    const [editBugDetails, setEditBugDetails] = useState({});
    const [displayEdit,setDisplayEdit] = useState(false);
    function editClicked(){
        setDisplayEdit(!displayEdit);
    }

    function deleteClicked(){

    }

    function handleChange(){
    }

    return(
        <>
        <div className='bug-view'>
            <EditPanel editClicked={editClicked} deleteClicked={deleteClicked} />
            <button onClick={props.clicked} className='close-btn'>Close</button>
            <h1>{bug.name}</h1>
            <ViewSection name='details' title='Details' info={bug.details} onEdit={handleChange} />
            <ViewSection name='steps' title='Steps' info={bug.steps} onEdit={handleChange} />
            <ViewSection name='priority' title='Priority' info={bug.priority} onEdit={handleChange} />
            <ViewSection name='creator' title='Creator' info={bug.creator} onEdit={handleChange} />
            <ViewSection name='version' title='App Version' info={bug.version} onEdit={handleChange} />
            <ViewSection name='time' title='Time Created' info={bug.time} onEdit={handleChange} />
            <button onClick={()=>{dispatch(markComplete())}}>Mark Complete</button>
        </div>
        {displayEdit && <EditBug title="Edit Bug" bug={bug} close={editClicked} />}
        </>
    )
}
