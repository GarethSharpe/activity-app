import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
import { ActivityInterface } from '../../interfaces/activity.interface'

import { Activity } from '../../classes/activity';
import { Member} from '../../classes/member';

import { DataAPIService } from '../../data-api.service';

@Component({
  selector: 'dialog-host',
  templateUrl: 'host-dialog.dialog.html',
  styleUrls: ['./host-dialog.dialog.css']
})
export class HostDialog {

  private nowDate = Date.now();
  public minDate = new Date(this.nowDate);
  public genres = ["Sport", "Card Game", "Board Game", 
  "Exercise", "Video Game", "Trivia", "Hackathon", "Hobby",
  "Learn", "Theater"
  ].sort();
  
  constructor(
  	private snackBar: MatSnackBar,
  	private dataAPI: DataAPIService,
    public dialogRef: MatDialogRef<HostDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ActivityInterface) { }

  hostActivity(data: ActivityInterface): void {
    this.dialogRef.close();
  	this.onSuccess();
    const fullAddress = data.address + ',' + data.city + ',' + data.province;
    this.dataAPI.getStaticImage(fullAddress).then(src => {
      data.src = src;
      data.date = data.date.toString().slice(0, 15);
      data.members = []; data.comments = [];
      const memberData = { 
        first: data.hostFirst, 
        last: data.hostLast, 
        email: data.hostEmail, 
        phone: data.hostPhone }
      const activity = new Activity(data);
      this.dataAPI.setActivity(activity);
    });
  }

  cancelActivity(): void {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSuccess(): void {
  	this.snackBar.open("You have hosted an Activity!", "Okay", {
      duration: 3000,
    });
  }

}

@Component({
  selector: 'app-host-dialog',
  templateUrl: './host-dialog.component.html',
  styleUrls: ['./host-dialog.component.css']
})
export class HostDialogComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(HostDialog, {
      width: '50%',
      height: '80%',
      data: { }
  	});
	}	

}
