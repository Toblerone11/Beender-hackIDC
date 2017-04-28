import { Component, OnInit, Input } from '@angular/core';
import { Day } from "app/day";
import { Location } from "app/location";
import { UserService } from "app/user.service";
import { ActivatedRoute,Params } from "@angular/router";
import 'rxjs/add/operator/switchMap';
import { Timeline } from "app/timeline";
import { Observable } from "rxjs/Observable";

// interface marker {
// 	lat: number;
// 	lng: number;
// 	label?: string;
// }
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',  
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
   timeline : Timeline ;
  // lat: number = 51.678418;
  // lng: number = 7.809007;
  constructor(private service: UserService,
              private route: ActivatedRoute ) {
              
    // (+) converts string 'id' to a number
     
       
    // alert(service.getUser())            
  }
  // markers: marker[] = [
	//   {
	// 	  lat: 51.673858,
	// 	  lng: 7.815982,
	// 	  label: 'A',		  
	//   },
	//   {
	// 	  lat: 51.373858,
	// 	  lng: 7.215982,
	// 	  label: 'B',		  
	//   },
	//   {
	// 	  lat: 51.723858,
	// 	  lng: 7.895982,
	// 	  label: 'C',		  
	//   }
  // ]
  ngOnInit() {
    this.route.params.subscribe((params: Params) => 
         {
          this.service.getTimeline(params["user_id"],+params["timeline_id"]).subscribe(
            (timeline:Timeline)=>this.timeline = timeline
          );
          //  console.log(this.timeline);
          //  for(var i in this.timeline.coords){
          //    this.markers.push({lat:this.timeline.coords[i][0],
          //      lng:this.timeline.coords[i][1],
          //     label:i.toString()
        });
           }        
  }
  

