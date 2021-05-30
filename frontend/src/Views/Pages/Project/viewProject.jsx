import React, { useState, useEffect } from "react"
import axios from "axios";
import "./project.css"
import BasicTable from '../../Components/Table/table'


const BUG_TRACKER_SERVER = process.env.REACT_APP_BUG_TRACKER_SERVER;

function DisplayTable(props){
    var border={color:"black",margin:50,borderWidth:"1px", borderColor:"#aaaaaa", borderStyle:'solid'}
    return (<div>
        <table >
            <thead >
                <tr>
                    <th>Name</th>
                    <th>description</th>
                </tr>
            </thead>
            <tbody >
                {props.projectList.map((item,key)=><tr >
                    <td>{item.name}</td>
                    <td>{item.desc}</td>
                </tr>)}
            </tbody>
        </table>
    </div>
  );
}

export default() =>{

    const [projects, setProjects] = useState([]);

    const addProject = project => {
        
        axios.post(BUG_TRACKER_SERVER + "/api/project", project).then(response => {
            const createdProject = response.data;
            setProjects(prevProjects => ({
            ...prevProjects,
            createdProject}));
    })
}

    const removeProject = projectId => {
        axios.delete(BUG_TRACKER_SERVER + `/api/project/${projectId}`).then(response => {
            setProjects(prevProjects => {
                return prevProjects.filter(project => project._id !== projectId);
            })
        })
    }

    useEffect(() => {
        axios.get(BUG_TRACKER_SERVER + "/api/project").then((response) => {            
            setProjects(response.data);
          });
    }, [])

    useEffect(() => {
        axios.get(BUG_TRACKER_SERVER + "/api/project").then((response) => {            
            setProjects(response.data);
          });
    }, [projects.length])

    return (<div className="page-container">
        <BasicTable data={projects} addProject={addProject} removeProject={removeProject} />
    </div>
  );
};
