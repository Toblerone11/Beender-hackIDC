import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
   days = ['Sunday','Monday','Tuesday'];

  constructor() { }
  
  ngOnInit() {
  }

}
