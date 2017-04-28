import { Component, OnInit, Input } from '@angular/core';
import { Day } from "app/day";
import { Location } from "app/location";
import { UserService } from "app/user.service";
import { ActivatedRoute,Params } from "@angular/router";
import 'rxjs/add/operator/switchMap';
import { Timeline } from "app/timeline";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
   @Input() timeline : Timeline ;
  lat: number = 51.678418;
  lng: number = 7.809007;
  constructor(private service: UserService,
              private route: ActivatedRoute ) {
              
    // (+) converts string 'id' to a number
       
       
    // alert(service.getUser())            
  }
  
  ngOnInit() {
    this.route.params.subscribe((params: Params) => 
         {
           this.timeline = this.service.getTimeline(+params["user_id"],+params["timeline_id"]);
           console.log(this.timeline)
        });
  }
  

}
