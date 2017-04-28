import { Component, OnInit, Input } from '@angular/core';
import { Day } from "app/day";
import { Location } from "app/location";

@Component({
  selector: 'day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  @Input() title : string 
  @Input() day : Location[]
  constructor() {     
  }

  ngOnInit() {
    // console.log(this.day)
  }

}
