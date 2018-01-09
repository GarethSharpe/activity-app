import { Component, OnInit } from '@angular/core';
import { DataAPIService } from './data-api.service'
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAs15rTOLpbClT0pcKPnHYkl5X8f4GlUek",
    authDomain: "activity-app-ocas.firebaseapp.com",
    databaseURL: "https://activity-app-ocas.firebaseio.com",
    projectId: "activity-app-ocas",
    storageBucket: "activity-app-ocas.appspot.com",
    messagingSenderId: "255508259276"
  };
firebase.initializeApp(config);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';

  constructor(private dataAPI: DataAPIService) { }

  ngOnInit() {
  }
}
