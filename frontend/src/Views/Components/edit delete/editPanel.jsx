import React from 'react';
import './editPanel.css';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default (props)=>{
    return(
        <div className='edit-panel'>
            <button onClick={props.editClicked}><EditIcon/></button>
            <button onClick={() => {
                props.deleteClicked(props.bugId);
            }}><DeleteIcon /></button>
        </div>
    )
}