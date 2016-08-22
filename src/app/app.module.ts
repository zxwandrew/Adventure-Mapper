import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { MdCardModule } from '@angular2-material/card';
import { MdButtonModule } from '@angular2-material/button';
import { MdToolbarModule } from '@angular2-material/toolbar/toolbar';
import { MdIconModule } from '@angular2-material/icon/icon'

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { AdventureComponent } from './adventure/adventure.component';
import { AttractionComponent } from './attraction/attraction.component';

const firebaseConfig = {
  apiKey: "AIzaSyDT76Euc50g03SZ8WaBkDZ5tterYTmiabE",
  authDomain: "attractionsmap-8f466.firebaseapp.com",
  databaseURL: "https://attractionsmap-8f466.firebaseio.com",
  storageBucket: "attractionsmap-8f466.appspot.com",
};



@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    AdventureComponent,
    AttractionComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdToolbarModule
  ],
  providers: [],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
