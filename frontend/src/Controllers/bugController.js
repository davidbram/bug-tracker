import bugModel from '../Models/bugModel';

export function retrieveBugs(){
    let data = [];
    data.push(new bugModel({
        _id: 12313,
        name:"Crash on Load",
        details: "crashes after 3 secs",
        steps: "Open app and it will crash",
        version: "V3.5",
        assigned: "David Abraham",
        creator: "Richard Hendrix",
        priority:1,
        time:"3:47",
    }));

    data.push(new bugModel({
        _id: 12314,
        name:"Won't Load",
        details: "crashes after 3 secs",
        steps: "Open app and it will crash",
        version: "V3.5",
        assigned: "David Abraham",
        creator: "Richard Hendrix",
        priority:3,
        time:"3:47",
    }));

    let sorted = data.sort((a,b)=>{return a.priority-b.priority;});
    return sorted;
}