import { Component, OnInit } from '@angular/core';
import { DataAPIService } from '../../data-api.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataAPI: DataAPIService) { }

  ngOnInit() {
  }

  host() {
  	console.log('host()');
  }

}
