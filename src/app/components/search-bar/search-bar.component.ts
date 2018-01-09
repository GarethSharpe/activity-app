import { Component, OnInit } from '@angular/core';
import { DataAPIService } from '../../data-api.service'
import { Activity } from '../../classes/activity';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  public value = "Try 'Sports'";
	private activities: Activity[] = [];

  constructor(private dataAPI: DataAPIService) { }

  ngOnInit() {
  	this.activities = this.dataAPI.getActivitiesRef();
  }

  search(value) {
    if (value == '')
      this.dataAPI.getActivities();
    else
      this.dataAPI.searchActivities(value);
  }

}
