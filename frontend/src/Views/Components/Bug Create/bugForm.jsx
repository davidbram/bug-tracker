import React,{useEffect, useState} from 'react';
import './bugForm.css';
import BugModel from '../../../Models/bugModel';
import axios from "axios";
import qs from "qs";

import CloseIcon from '@material-ui/icons/Close';

// axios.defaults.headers.common = {
// 	"Content-Type": "application/json"
//   }
export default (props)=>{
const BUG_TRACKER_SERVER = process.env.REACT_APP_BUG_TRACKER_SERVER;
console.log(BUG_TRACKER_SERVER);

	const [bugObject,setBugObject] = useState(new BugModel(props.bug));
	const [projects,setProjects] = useState([{"name":"testProject","description":"test Description"}])
  useEffect(()=>{
    // GET request using axios inside useEffect React hook
    axios.get(BUG_TRACKER_SERVER+'api/project')
        .then(response => {
          console.log(response.data);
          setProjects(response.data)
        })
        .catch(error => {console.log("There was error ", error);})

// empty dependency array means this effect will only run once (like componentDidMount in classes)
},[])

	function inputChanged(e){
		const {name, value} = e.target;
		setBugObject({
			...bugObject,
			[name]:value
		});
	}
	
	function submitHandler(e){
		e.preventDefault()
		//console.log(bugObject);
		if (props.title === "Edit Bug") {
			console.log("Bug is edited");
			axios({
				method: 'patch',
				url: `/api/bug/${bugObject._id}`,
				data: qs.stringify(bugObject),
				headers: {
				  'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
				}
			  })
		} else {
			console.log(bugObject);
			axios({
				method: 'post',
				url: '/api/bug',
				data: qs.stringify(bugObject),
				headers: {
				  'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
				}
			  })
		}
	}


	return(
		<div className='bug-create'>
			{props.title === "Edit Bug" &&<button className='close-btn' onClick={props.close}><CloseIcon /></button>}
			<h1>{props.title}</h1>
			<form onSubmit={submitHandler}>
				<label>Name:</label>
				<input name='name' placeholder='Bug Name' required onChange={inputChanged} value={bugObject.name}></input>
        <label>Project Name:</label>
        <select name="project_id" onChange={e=>(setBugObject({
			...bugObject,
			project_id:e.currentTarget.value
		}))}>
          {
            projects.map((p) => (
              <option key={p._id} value={p._id}>{p.name}</option>
            ))
          }
        </select>
        <label>Details:</label>
				<textarea name='details' placeholder='Detailed description on the bug' required onChange={inputChanged} value={bugObject.details}></textarea>
				<label>Steps:</label>
				<textarea name='steps' placeholder='Steps to recreate the bug' required onChange={inputChanged} value={bugObject.steps}></textarea>
				<label>Priority:</label>
				<select name='priority' onChange={inputChanged} value={bugObject.priority}>
					<option value='1' selected>High</option>
					<option value='2'>Mid</option>
					<option value='3'>Low</option>
				</select>
				<label>Assigned</label>
				<select name='assigned' onChange={inputChanged} value={bugObject.assigned}>
					<option value='1' selected>David</option>
					<option value='2'>Ruturaj</option>i
					<option value='3'>Vinay</option>
				</select>
				<label>Creator:</label>
				<input name='creator' placeholder='Your Name' required onChange={inputChanged} value={bugObject.creator}></input>
				<label>Application Version:</label>
				<input name='version' placeholder='Application Version' onChange={inputChanged} value={bugObject.version}></input>
				<button type='submit'>{props.title}</button>
			</form>
		</div>
	)
}