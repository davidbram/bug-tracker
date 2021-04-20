import React,{useState} from 'react';
import './bugForm.css';
import BugModel from '../../../Models/bugModel';
import axios from "axios";
import qs from "qs";

import CloseIcon from '@material-ui/icons/Close';

const BUG_TRACKER_SERVER = process.env.REACT_APP_BUG_TRACKER_SERVER;

export default (props) => {
  const [bugObject, setBugObject] = useState(new BugModel(props.bug));

  const apiPaths = Object.freeze({
    EDIT_BUG_API: BUG_TRACKER_SERVER + `/api/bug/${bugObject._id}`,
    CREATE_BUG_API: BUG_TRACKER_SERVER + '/api/bug',
  });

  function inputChanged(e) {
    const { name, value } = e.target;
    setBugObject({
      ...bugObject,
      [name]: value,
    });
  }

  function submitHandler(e) {
    e.preventDefault();
    if (props.title === 'Edit Bug') {
      axios.patch(apiPaths.EDIT_BUG_API, bugObject)
    } else {
      console.log(bugObject);
      if(!bugObject.hasOwnProperty('priority')) {
        bugObject.priority = 1
      }
      axios.post(apiPaths.CREATE_BUG_API, bugObject);
    }
  }

  return (
    <div className="bug-create">
      {props.title === 'Edit Bug' && (
        <button className="close-btn" onClick={props.close}>
          <CloseIcon />
        </button>
      )}
      <h1>{props.title}</h1>
      <form onSubmit={submitHandler}>
        <label>Name:</label>
        <input
          name="name"
          placeholder="Bug Name"
          required
          onChange={inputChanged}
          value={bugObject.name}
        ></input>
        <label>Details:</label>
        <textarea
          name="details"
          placeholder="Detailed description on the bug"
          required
          onChange={inputChanged}
          value={bugObject.details}
        ></textarea>
        <label>Steps:</label>
        <textarea
          name="steps"
          placeholder="Steps to recreate the bug"
          required
          onChange={inputChanged}
          value={bugObject.steps}
        ></textarea>
        <label>Priority:</label>
        <select
          name="priority"
          onChange={inputChanged}
          value={bugObject.priority}
        >
          <option value="1" selected>
            High
          </option>
          <option value="2">Mid</option>
          <option value="3">Low</option>
        </select>
        <label>Assigned</label>
        <select
          name="assigned"
          onChange={inputChanged}
          value={bugObject.assigned}
        >
          <option value="1" selected>
            David
          </option>
          <option value="2">Ruturaj</option>
          <option value="3">Vinay</option>
        </select>
        <label>Creator:</label>
        <input
          name="creator"
          placeholder="Your Name"
          required
          onChange={inputChanged}
          value={bugObject.creator}
        ></input>
        <label>Application Version:</label>
        <input
          name="version"
          placeholder="Application Version"
          onChange={inputChanged}
          value={bugObject.version}
        ></input>
        <button type="submit">{props.title}</button>
      </form>
    </div>
  );
};
