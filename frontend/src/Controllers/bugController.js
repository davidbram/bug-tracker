import bugModel from '../Models/bugModel';
import axios from 'axios';

export function retrieveBugs(){

    let data;

    // data.push(new bugModel({
    //     _id: 12313,
    //     name:"Crash on Load",
    //     details: "crashes after 3 secs",
    //     steps: "Open app and it will crash",
    //     version: "v2.0",
    //     assigned: "David Abraham",
    //     creator: "Richard Hendrix",
    //     priority:1,
    //     time:"3:47",
    // }));

    // data.push(new bugModel({
    //     _id: 12314,
    //     name:"Won't Load",
    //     details: "crashes after 3 secs",
    //     steps: "Open app and it will crash",
    //     version: "v3.5",
    //     assigned: "David Abraham",
    //     creator: "Richard Hendrix",
    //     priority:3,
    //     time:"3:47",
    // }));

    axios.get(process.env.REACT_APP_BUG_TRACKER_SERVER + '/api/bug')
    .then(res => {
        data = Object.assign([], data);
        res.data.forEach(bug => data.push(new bugModel(bug)));
        let sorted = data.sort((a,b)=>{return a.priority-b.priority;});
        // console.log(data);
        // console.log(sorted);
        return sorted;
    })
    .catch(err => {
        console.log(err);
    });
}