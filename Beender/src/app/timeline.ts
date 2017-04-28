import {Location} from 'app/location'
export class Timeline {
  public name:string;
  public days:Location[][];
constructor(
    obj:any    
  ){
    this.name = obj.name;
    this.days = [];
    for(var i in obj.days){
      var one_day = [];      
      for(var j in obj.days[i]){
        
        var loc = new Location(obj.days[i][j]);
        
        one_day.push(loc);
      }
      this.days.push(one_day);
    }
  }
}