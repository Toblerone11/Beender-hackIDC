import { Injectable } from '@angular/core';
import { User } from "app/user";
import { Day } from "app/day";
import { Location } from "app/location";
import { Timeline } from "app/timeline";

const DUMMY_USER = `
{"id":"Ron","name":"Ron","email":null,"picture":null,"tl":[{"name":"San Fransisco","days":[[{"name":"Golden Gate Bridge","duration":null,"time":"15:29:15","desc":"The Golden Gate Bridge is a suspension bridge spanning the Golden Gate strait, the one-mile-wide, one-point-seven-mile-long channel between San Francisco Bay and the Pacific Ocean. ","category":"Bridge","url":"http://www.goldengatebridge.org/","loc":"Golden Gate Brg S San Francisco, CA United States","pic":"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/P-51D_California_ANG_in_1948_%284930698213%29.jpg/200px-P-51D_California_ANG_in_1948_%284930698213%29.jpg","lat":"37.81937852444599","lot":"-122.47846126556396"},{"name":"Rainforest Cafe","duration":null,"time":"17:22:23","desc":"Great Lakes Crossing Outlets is an enclosed shopping mall, super-regional in size, located in the city of Auburn Hills, a suburb on the northern outskirts of metro Detroit, Michigan, United States. ","category":"Theme Restaurant","url":"http://www.rainforestcafe.com","loc":"145 Jefferson St (at Mason St) San Francisco, CA 94133 United States","pic":"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Boudin%2C_San_Francisco_USA_-_panoramio.jpg/200px-Boudin%2C_San_Francisco_USA_-_panoramio.jpg","lat":"37.80824604646537","lot":"-122.41459178499589"},{"name":"Candy Baron","duration":null,"time":"17:38:30","desc":"","category":"Candy Store","url":"","loc":"Pier 39 San Francisco, CA 94133 United States","pic":"https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/San_Francisco_Pier_39.-_Fisherman%27s_Wharf_%284%29.jpg/200px-San_Francisco_Pier_39.-_Fisherman%27s_Wharf_%284%29.jpg","lat":"37.81098103055366","lot":"-122.41072565596475"}],[{"name":"Tunnel View","duration":null,"time":"12:00:31","desc":"Tunnel View is a scenic overlook on State Route 41 in Yosemite National Park. The iconic and expansive view of Yosemite Valley from the view point have been seen and documented by visitors since it opened in 1933. ","category":"Scenic Lookout","url":"https://en.wikipedia.org/wiki/Tunnel_View","loc":"Wawona Rd. Yosemite National Park, CA 95389 United States","pic":"https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Tunnel_View_in_Yosemite_National_Park%2C_California.jpg/200px-Tunnel_View_in_Yosemite_National_Park%2C_California.jpg","lat":"37.71564009770839","lot":"-119.67696115173936"},{"name":"Washburn Point","duration":null,"time":"13:00:22","desc":"Glacier Point is a viewpoint above Yosemite Valley, in California, United States. It is located on the south wall of Yosemite Valley at an elevation of 7,214 feet, 3,200 feet above Curry Village. ","category":"Scenic Lookout","url":"https://en.wikipedia.org/wiki/Glacier_Point","loc":"Yosemite National Park, CA 95389 United States","pic":"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/View_from_Washburn_Point.jpg/200px-View_from_Washburn_Point.jpg","lat":"37.72045678675634","lot":"-119.57287816117862"},{"name":"Lower Yosemite Falls","duration":null,"time":"15:38:47","desc":"Yosemite Falls is the highest waterfall in Yosemite National Park, dropping a total of 2,425 feet from the top of the upper fall to the base of the lower fall. ","category":"Scenic Lookout","url":"https://en.wikipedia.org/wiki/Yosemite_Falls","loc":"Yosemite National Park, CA 95389 United States","pic":"https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Dogwood_Flower_-_Yosemite_National_Park_CA.jpg/200px-Dogwood_Flower_-_Yosemite_National_Park_CA.jpg","lat":"37.74613104878007","lot":"-119.59585893527007"}],[{"name":"Vernal Falls","duration":null,"time":"13:04:27","desc":"Vernal Fall is a 317-foot waterfall on the Merced River just downstream of Nevada Fall in Yosemite National Park, California. Like its upstream neighbor, Vernal Fall is clearly visible at a distance, from Glacier Point, as well as close up, along the Mist Trail. ","category":"Trail","url":"https://en.wikipedia.org/wiki/Vernal_Fall","loc":"Yosemite National Park, CA United States","pic":"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Yosemite_-_Upper_Pines_Campground_-_panoramio_-_Andrew_Burnham.jpg/200px-Yosemite_-_Upper_Pines_Campground_-_panoramio_-_Andrew_Burnham.jpg","lat":"37.73252976290415","lot":"-119.5626689588715"},{"name":"Forst Haus","duration":null,"time":"17:21:47","desc":"","category":"Hotel","url":"","loc":"7309 Yosemite Park Way California United States","pic":"https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Chevy_Suburban_interior.jpg/200px-Chevy_Suburban_interior.jpg","lat":"37.651243","lot":"-119.721286"}]],"meanLat":"37.715230484710844","meanLon":"-121.4813310455804"}]}
`
@Injectable()
export class UserService {

  constructor() { 
    
  }

  create_user(){

    let user_data: User = JSON.parse(DUMMY_USER);
    var user = new User(user_data);
    
    console.log(user);
    return user;
    // var locations:Location[] = [new Location ("Starbucks","Resturant","Place to drink expensive coffee"),
    // new Location ("Fun attraction","Funland","Have some funny fun")]
    // var days = []
    // for (var i = 0; i < 5; i++) {
    //   var day_id = "Day"+i.toString();
    //   var day = new Day(day_id,locations)
    //   // days[day_id] = new Day(day_id,locations);      
    //   days.push(day)
    // }
    // return new User(1,'Jimmy',null,'nowhere',{1:days});
  }

  getUsers() { 
    return [this.create_user()]
  }

  getUser(id:number) { 
    return this.create_user()
  }

  getTimeline(user_id:number,timeline_id:number){
    return <Timeline> this.create_user().timeline[0];
  }
}
