// {"id":"2","name":"Ron2","email":null,"picture":null,"tl":null}
import { Timeline } from "app/timeline";

export class User {    
//   constructor(
//     public id:number,
//     public name:string,
//     public email:string,
//     public picture:string,    
//     public tl:Timeline[]   
//   ){}
    public id:number;
    public name:string;
    public email:string;
    public picture:string;
    public timeline:Timeline[];

    constructor(obj:any) {
        this.id = obj.id;
        this.name = obj.name;
        this.email = obj.email;
        this.picture = obj.picture;
        this.timeline = [];
        for(var timeline_i in obj.tl) {
            var timeline = new Timeline(obj.tl[timeline_i]);
            this.timeline.push(timeline)
        }          
    }
  
}