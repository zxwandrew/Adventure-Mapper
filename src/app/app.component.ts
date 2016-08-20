import { Component, ViewChild } from '@angular/core';
import { MapComponent } from './map';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  directives: [MapComponent],
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']

})
export class AppComponent {
  @ViewChild(MapComponent) mapComponent:MapComponent;
  title = 'Map Title';
  items: FirebaseListObservable<any[]>;

  constructor(af: AngularFire){
    this.items = af.database.list('items');
    // af.database.list('items').subscribe(items => console.log(items));
  }
}
