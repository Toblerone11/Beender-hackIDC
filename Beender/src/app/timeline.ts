import {Location} from 'app/location'
export class Timeline {
  public name:string;
  public longitude:number;
  public latitude:number;
  public days:Location[][];
  public coords:number[][];
constructor(
    obj:any    
  ){
    this.name = obj.name;
    this.days = [];
    this.latitude = +obj.meanLat;
    this.longitude = +obj.meanLon;
    this.coords = [];
    for(var i in obj.days){
      var one_day = [];      
      for(var j in obj.days[i]){
        
        var loc = new Location(obj.days[i][j]);
        this.coords.push([loc.lat,loc.lot]);
        one_day.push(loc);
      }
      this.days.push(one_day);
    }
  }
}