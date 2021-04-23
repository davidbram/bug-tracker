import React,{useState} from 'react';
import ViewSection from './component/bugViewSection';
import './bugView.css';
import BugModel from '../../../Models/bugModel';
import {useDispatch} from 'react-redux';
//import {markComplete} from '../../../Controllers/Redux/bugSlice';
import EditPanel from '../edit delete/editPanel';
import EditBug from '../Bug Create/bugForm';
import axios from 'axios';

import CloseIcon from '@material-ui/icons/Close';
//import { markComplete } from '../../../../../backend/controllers/bug';

const REACT_APP_BUG_TRACKER_SERVER = process.env.REACT_APP_BUG_TRACKER_SERVER; 
export default (props)=>{
    const dispatch = useDispatch();
    const bug = new BugModel(props.bug);

    const [editBugDetails, setEditBugDetails] = useState({});
    const [displayEdit,setDisplayEdit] = useState(false);
    function editClicked(){
        setDisplayEdit(!displayEdit);
    }

    function deleteClicked(bugId){
        axios.delete(REACT_APP_BUG_TRACKER_SERVER + `/api/bug/${bugId}`)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    function handleChange(){
    }

    function markComplete(bugId) {
        console.log(bugId);
        axios.patch(REACT_APP_BUG_TRACKER_SERVER + `/api/bug/complete/${bugId}`)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    return(
        <>
        <div className='bug-view'>
            <EditPanel editClicked={editClicked} deleteClicked={deleteClicked} bugId={bug._id} />
            <button onClick={props.clicked} className='close-btn'><CloseIcon /></button>
            <h1>{bug.name}</h1>
            <ViewSection name='details' title='Details' info={bug.details} onEdit={handleChange} />
            <ViewSection name='steps' title='Steps' info={bug.steps} onEdit={handleChange} />
            <ViewSection name='priority' title='Priority' info={bug.priority} onEdit={handleChange} />
            <ViewSection name='creator' title='Creator' info={bug.creator} onEdit={handleChange} />
            <ViewSection name='version' title='App Version' info={bug.version} onEdit={handleChange} />
            <ViewSection name='time' title='Time Created' info={bug.time} onEdit={handleChange} />
            {bug.status !== "completed" && <button onClick={() => markComplete(bug._id)}>Mark Complete</button>}
        </div>
        {displayEdit && <EditBug title="Edit Bug" bug={bug} close={editClicked} />}
        </>
    )
}
