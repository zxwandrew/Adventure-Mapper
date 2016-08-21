import { Component, OnInit, Input } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Adventure } from './adventure.model'

@Component({
  selector: 'app-adventure',
  templateUrl: 'adventure.component.html',
  styleUrls: ['adventure.component.css']
})
export class AdventureComponent implements OnInit {
  @Input() adventure: Observable<Adventure>;

  constructor() { }

  ngOnInit() {
  }

}
