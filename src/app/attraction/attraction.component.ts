import { Component, OnInit, Input } from '@angular/core';
import { Attraction } from './attraction.model'

@Component({
  selector: 'app-attraction',
  templateUrl: 'attraction.component.html',
  styleUrls: ['attraction.component.css']
})
export class AttractionComponent implements OnInit {
  @Input() attraction: Attraction;

  constructor() { }

  ngOnInit() {
  }

}
