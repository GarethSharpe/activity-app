import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';

import { DataAPIService } from '../../data-api.service'
import { Activity } from '../../classes/activity';
import { Member } from '../../classes/member';
import { Comment } from '../../classes/comment';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

	public activities: Activity[] = [];

  constructor(
  	private dataAPI: DataAPIService,
  	public dialog: MatDialog) { }

  ngOnInit() {
  	this.dataAPI.getActivities().then(activities => {
  		this.activities = activities;
  	})
  }

  openDetailsDialog(activity: Activity): void {
    let dialogRef = this.dialog.open(DetailsDialog, {
      width: '50%',
      data: { activity: activity }
  	});
	}	

	openJoinDialog(activity: Activity): void {
    let dialogRef = this.dialog.open(JoinDialog, {
      width: '30%',
      data: { memberComment: null, activity: activity }
  	});
	}

	openLeaveDialog(activity: Activity): void {
    let dialogRef = this.dialog.open(LeaveDialog, {
      width: '30%',
      data: { activity: activity }
  	});
	}	
}

@Component({
  selector: 'dialog-details',
  templateUrl: './dialogs/details-dialog.dialog.html',
  styleUrls: ['./dialogs/details-dialog.dialog.css']
})
export class DetailsDialog {

  constructor(
  	private dataAPI: DataAPIService,
    public dialogRef: MatDialogRef<DetailsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}	

@Component({
  selector: 'dialog-join',
  templateUrl: './dialogs/join-dialog.dialog.html',
  styleUrls: ['./dialogs/join-dialog.dialog.css']
})
export class JoinDialog implements OnInit {

	private members: Member[] = [];

  constructor(
  	private snackBar: MatSnackBar,
  	private dataAPI: DataAPIService,
  	public dialog: MatDialog,
    public dialogRef: MatDialogRef<JoinDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  joinActivity(data): void {
  	const memberData = { first: data.memberFirst, last: data.memberLast, email: data.memberEmail }
    const member = new Member(memberData);
    const comment = new Comment(member, data.memberComment);
    
    if (member.getEmail() == data.activity.getHostEmail()) {
      this.onHost();
    } else {
      this.dataAPI.setMember(data.activity, member);
      if (comment.getComment()) {
				this.dataAPI.setComment(data.activity, comment);
    	}
      this.onSuccess();
      this.dataAPI.getMembers(data.activity).then(result => {
      	this.openMembersDialog(result);
      });
    }

    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSuccess(): void {
  	this.snackBar.open("You've joined the activity!", "Okay", {
      duration: 3000,
    });
  }

  onHost(): void {
    this.snackBar.open("You're already the host!", "Okay", {
      duration: 3000,
    });
  }

  openMembersDialog(members: Member[]): void {
  	console.log(members);
    let dialogRef = this.dialog.open(MembersDialog, {
      width: '25%',
      data: { members: members }
  	});
	}	

}

@Component({
  selector: 'dialog-leave',
  templateUrl: './dialogs/leave-dialog.dialog.html',
  styleUrls: ['./dialogs/leave-dialog.dialog.css']
})
export class LeaveDialog implements OnInit{

  constructor(
    private snackBar: MatSnackBar,
    private dataAPI: DataAPIService,
    public dialogRef: MatDialogRef<LeaveDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  leaveActivity(data): void {
  	const member = new Member(data);

  	if (member.getEmail() == data.activity.getHostEmail()) {
  		this.dataAPI.removeActivity(data.activity);
  		this.onHostLeave();
  	} else {
  		this.dataAPI.removeMember(data.activity, member);
   		this.onSuccess();
  	}

    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSuccess(): void {
    this.snackBar.open("You have left the activity!", "Okay", {
      duration: 3000,
    });
  }

  onHostLeave(): void {
  	this.snackBar.open("The activity has been cancelled.", "Okay", {
      duration: 3000,
    });
  }

}

@Component({
  selector: 'dialog-members',
  templateUrl: './dialogs/members-dialog.dialog.html',
  styleUrls: ['./dialogs/members-dialog.dialog.css']
})
export class MembersDialog {

  constructor(
  	private dataAPI: DataAPIService,
    public dialogRef: MatDialogRef<MembersDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}