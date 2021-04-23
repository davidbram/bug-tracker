export default bug;

function bug(bug){
    // eslint-disable-next-line
    if(bug != undefined){
        this._id = bug._id;
        this.name = bug.name;
        this.project_id=bug.project_id;
        this.details = bug.details;
        this.steps = bug.steps;
        this.version = bug.version;
        this.priority = bug.priority;
        this.assigned = bug.assigned;
        this.creator = bug.creator;
        this.time = bug.time;
        this.status = bug.status
    }
}