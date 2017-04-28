// "name":"Tunnel View",
//                   "duration":null,
//                   "time":"12:00:31",
//                   "desc":"Tunnel View is a scenic overlook on State Route 41 in Yosemite National Park. The iconic and expansive view of Yosemite Valley from the view point have been seen and documented by visitors since it opened in 1933. ",
//                   "category":"Scenic Lookout",
//                   "url":"",
//                   "loc":"Wawona Rd. Yosemite National Park, CA 95389 United States",
//                   "pic":"https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Tunnel_View_in_Yosemite_National_Park%2C_California.jpg/200px-Tunnel_View_in_Yosemite_National_Park%2C_California.jpg"

export class Location {
     public name: string;
      public category: string;
       public desc: string;
       public time:string;
     public url: string;
     public loc:string;
      public pic:string;
      public lat:number;
      public lot:number;
     constructor(obj:any) {
         this.name = obj.name;
         this.category = obj.category;
        
        this.desc = obj.desc;
        this.time = obj.time;
        
        this.url = obj.url;
        this.loc = obj.loc;
        this.pic = obj.pic;
        this.lat = +obj.lat;
        this.lot = +obj.lot;

      }
}
