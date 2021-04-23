import React, { useState, useEffect } from "react"
import axios from "axios";
import "./project.css"
import BasicTable from '../../Components/Table/table'


const BUG_TRACKER_SERVER = process.env.REACT_APP_BUG_TRACKER_SERVER;

function DisplayTable(props){
    var border={color:"black",margin:50,borderWidth:"1px", borderColor:"#aaaaaa", borderStyle:'solid'}
    return <div>
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
} 

export default() =>{

    const [projects, setProjects] = useState([]);

    const addProject = project => {

        console.log(project);
        
    //     axios.post(BUG_TRACKER_SERVER + "/api/project", project).then(response => {
    //         const createdProject = response.data;
    //         setProjects(prevProjects => ({
    //         ...prevProjects,
    //         createdProject}));
    // })
}

    useEffect(() => {
        axios.get(BUG_TRACKER_SERVER + "/api/project").then((response) => {            
            setProjects(response.data);
          });
    }, [])

    return <div className="page-container">
        <BasicTable data={projects} addProject={addProject} />
    </div>
}