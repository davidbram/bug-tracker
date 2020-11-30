import React from "react"
import "./project.css"

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

    var projectList = [
        {
            name: "Test Project",
            desc : "Test Desc"
        },
        {
            name: "Test Project1",
            desc : "Test Desc1"
        },
        {
            name: "Test Project2",
            desc : "Test Desc2"
        }
    ]


    return <div className="page-container">
        <div>
        <h1 style={{color:"black"}}>Select Project :</h1>
        <DisplayTable projectList={projectList}/>
        </div>
    </div>
}