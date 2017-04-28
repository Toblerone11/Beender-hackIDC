import { Injectable } from '@angular/core';
import { User } from "app/user";
import { Day } from "app/day";
import { Location } from "app/location";

@Injectable()
export class UserService {

  constructor() { 
    
  }

  create_user(){
    var locations:Location[] = [new Location ("Starbucks","Resturant","Place to drink expensive coffee"),
    new Location ("Fun attraction","Funland","Have some funny fun")]
    var days = []
    for (var i = 0; i < 5; i++) {
      var day_id = "Day"+i.toString();
      var day = new Day(day_id,locations)
      // days[day_id] = new Day(day_id,locations);      
      days.push(day)
    }
    return new User(1,'Jimmy',null,'nowhere',{1:days});
  }

  getUsers() { 
    return [this.create_user()]
  }

  getUser(id:number) { 
    return this.create_user()
  }

  getTimeline(user_id:number,timeline_id:number){
    return <Day[]> this.create_user().timelines[timeline_id]
  }
}
