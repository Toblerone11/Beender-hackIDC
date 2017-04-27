import { Component, OnInit, Input } from '@angular/core';
import { Day } from "app/day";
import { Location } from "app/location";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
   @Input() days : Day[] ;

  constructor() { 
    var locations:Location[] = [new Location ("Starbucks","Resturant","Place to drink expensive coffee"),
    new Location ("Fun attraction","Funland","Have some funny fun")]
    this.days = []
    for (var i = 0; i < 5; i++) {
      var day = new Day("Day"+i.toString(),locations);
      this.days.push(day)
    }
    
  }
  
  ngOnInit() {
  }

}
