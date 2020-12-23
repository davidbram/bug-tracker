import React,{useState} from 'react';
import './bugForm.css';
import BugModel from '../../../Models/bugModel';
import axios from "axios";
import qs from "qs";



// axios.defaults.headers.common = {
// 	"Content-Type": "application/json"
//   }
export default (props)=>{
	const [bugObject,setBugObject] = useState(new BugModel(props.bug));
	
	function inputChanged(e){
		setBugObject({
			...bugObject,
			[e.target.name]:e.target.value
		})
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
			{props.title === "Edit Bug" &&<button className='close-btn' onClick={props.close}>Close</button>}
			<h1>{props.title}</h1>
			<form onSubmit={submitHandler}>
				<label>Name:</label>
				<input name='name' placeholder='Bug Name' required onChange={inputChanged} value={bugObject.name}></input>
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