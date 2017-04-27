import { Component, OnInit, Input } from '@angular/core';
import { Day } from "app/day";
import { Location } from "app/location";

@Component({
  selector: 'day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  @Input() day : Day
  constructor() { 
    var locations:Location[] = [new Location("Starbucks","Resturant","Place to drink expensive coffee")]
    this.day = new Day("Day1",locations)
  }

  ngOnInit() {
  }

}
