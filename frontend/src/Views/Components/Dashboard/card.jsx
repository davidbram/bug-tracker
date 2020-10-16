import React from 'react';
import './card.css';
import Priority from '../../../Controllers/priorityController'

export default(props) =>{
    const {level,color} = Priority(props.Priority);
    return(
        <div className='dashboard-card'>
            <h2>Total: {level}</h2>
            <p>{props.count}</p>
        </div>
    );
}