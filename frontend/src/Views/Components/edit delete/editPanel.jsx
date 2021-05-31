import React from 'react';
import './editPanel.css';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default (props) => {
  return (
    <div className="edit-panel">
      <span onClick={props.editClicked}>
      <i style={{color:"#ef6c57",marginRight:"15px",cursor:"pointer"}} class="fas fa-edit fa-lg"></i>
      </span>
      
      <span
        onClick={() => {
          props.deleteClicked(props.bugId);
        }}
      >
        <i style={{color:"#ef6c57",cursor:"pointer"}} class="fas fa-trash-alt fa-lg"></i>
      </span>
    </div>
  );
};
