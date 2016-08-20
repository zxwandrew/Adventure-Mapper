import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';

const firebaseConfig = {
  apiKey: "AIzaSyDT76Euc50g03SZ8WaBkDZ5tterYTmiabE",
  authDomain: "attractionsmap-8f466.firebaseapp.com",
  databaseURL: "https://attractionsmap-8f466.firebaseio.com",
  storageBucket: "attractionsmap-8f466.appspot.com",
};



@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
