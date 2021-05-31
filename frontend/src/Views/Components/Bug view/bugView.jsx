import React, { useState } from 'react';
import ViewSection from './component/bugViewSection';
import './bugView.css';
import BugModel from '../../../Models/bugModel';
import { useDispatch } from 'react-redux';
//import {markComplete} from '../../../Controllers/Redux/bugSlice';
import EditPanel from '../edit delete/editPanel';
import EditBug from '../Bug Create/bugForm';
import axios from 'axios';


const BUG_TRACKER_SERVER = process.env.REACT_APP_BUG_TRACKER_SERVER; 
export default (props)=>{
    const dispatch = useDispatch();
    const bug = new BugModel(props.bug);

    const [editBugDetails, setEditBugDetails] = useState({});
    const [displayEdit, setDisplayEdit] = useState(false);
    function editClicked() {
      setDisplayEdit(!displayEdit);
    }

    function deleteClicked(bugId){
        axios.delete(BUG_TRACKER_SERVER + `/api/bug/${bugId}`)
        .then(res => {
            console.log(res);
            axios.get(BUG_TRACKER_SERVER + "/api/bug").then((response) => {
                let data = response.data.map((bug) => new BugModel(bug));
                data = data.filter((bug) => bug.status === props.mode);
                const sorted = data.sort((a, b) => {
                  return a.priority - b.priority;
                });
                props.clicked(bugId);
                props.setBugs(sorted);
              });
        })
        .catch(err => console.log(err));
    }


  function handleChange() {}


    function markComplete(bugId) {
        axios.patch(BUG_TRACKER_SERVER + `/api/bug/complete/${bugId}`)
        .then(res => {
            console.log(res);
            axios.get(BUG_TRACKER_SERVER + "/api/bug").then((response) => {
                let data = response.data.map((bug) => new BugModel(bug));
                data = data.filter((bug) => bug.status === props.mode);
                const sorted = data.sort((a, b) => {
                  return a.priority - b.priority;
                });
                props.clicked(bugId);
                props.setBugs(sorted);
              });})
        .catch(err => console.log(err));
    }

    return(
        <>
        <div className='bug-view'>
            <EditPanel editClicked={editClicked} deleteClicked={deleteClicked} bugId={bug._id} />
            <span style={{color:'#ef6c57',cursor:"pointer"}} onClick={props.clicked} ><i class="far fa-times-circle fa-2x close-btn"></i></span>
            <h2 style={{color:"white"}}>{bug.name}</h2><br></br>
            <ViewSection name='details' title='Details' info={bug.details} onEdit={handleChange} />
            <ViewSection name='steps' title='Steps' info={bug.steps} onEdit={handleChange} />
            <ViewSection name='priority' title='Priority' info={bug.priority} onEdit={handleChange} />
            <ViewSection name='creator' title='Creator' info={bug.creator} onEdit={handleChange} />
            <ViewSection name='version' title='App Version' info={bug.version} onEdit={handleChange} />
            <ViewSection name='time' title='Time Created' info={bug.time} onEdit={handleChange} />
            {bug.status !== "completed" && <button onClick={() => markComplete(bug._id)}>Mark Complete</button>}
        </div>
        {displayEdit && <EditBug title="Edit Bug" bug={bug} close={editClicked} setBugs={props.setBugs} />}
        </>
    )
}
