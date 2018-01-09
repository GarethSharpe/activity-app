import { Injectable } from '@angular/core';
import { Activity } from './classes/activity';
import { Member } from './classes/member';
import { Comment } from './classes/comment';

import { } from '@types/googlemaps';

import * as firebase from 'firebase';

@Injectable()
export class DataAPIService {

	private activities: Activity[] = [];

  constructor() { }

  getActivitiesRef(): Activity[] {
    return this.activities;
  }

  getActivities(): Promise<Activity[]> {
  	return new Promise((resolve, reject) => {
  		let activitiesRef = firebase.database().ref('activities');
  		activitiesRef.once('value').then(snapshot => {
  			snapshot.forEach(activitySnapshot => {
  				const activity = new Activity(activitySnapshot.val());
  				this.activities.push(activity);
  			});
  		});
      resolve(this.activities);
  	});
  }

  getMembers(activity: Activity): Promise<Member[]> {
    var members = [];
    return new Promise((resolve, reject) => { 
      const activityKey = activity.getKey();
      let membersRef = firebase.database().ref('activities').child(activityKey).child('members');
      membersRef.once('value').then(snapshot => {
        snapshot.forEach(memberSnapshot => {
          const member = new Member(memberSnapshot.val());
          members.push(member);
        })
      });
      resolve(members);
    });
  }

  getComments(activity: Activity): Promise<Comment[]> {
    var comments = [];
    return new Promise((resolve, reject) => { 
      const activityKey = activity.getKey();
      let commentsRef = firebase.database().ref('activities').child(activityKey).child('comments');
      commentsRef.once('value').then(snapshot => {
        snapshot.foreach(commentsSnapshot => {
          const member = new Member(commentsSnapshot.val().member);
          const message = commentsSnapshot.val().comment;
          const comment = new Comment(member, message);
          comments.push(member);
        })
      });
      resolve(comments);
    });
  }

  setActivity(activity: Activity): void {
    const activityKey = activity.getKey();
  	this.activities.push(activity);
  	firebase.database().ref('activities/').child(activityKey).set(activity);
  }

  setMember(activity: Activity, member: Member): void {
    const activityKey = activity.getKey();
    const memberKey = this.encodeEmail(member.getEmail());
    firebase.database().ref('activities/' + activityKey + '/members').child(memberKey).set(member);
  }

  setComment(activity: Activity, comment: Comment): void {
    const activityKey = activity.getKey();
    firebase.database().ref('activities/' + activityKey + '/comments').push(comment);
  }

  removeMember(activity: Activity, member: Member): void {
    const activityKey = activity.getKey();
    let memberKey = (member.getEmail() == activity.getHostEmail()) ? '0' : this.encodeEmail(member.getEmail());
    firebase.database().ref('activities/' + activityKey + '/members').child(memberKey).remove();
  }

  removeActivity(activity: Activity): void {
    const activityKey = activity.getKey();
    firebase.database().ref('activities/').child(activityKey).remove();
  }

  searchActivities(thisGenre: string): Promise<Activity[]> {
    this.activities = [];
    return new Promise((resolve, reject) => {
      let activitiesRef = firebase.database().ref('activities');
      activitiesRef.once('value').then(snapshot => {;
        snapshot.forEach(activitySnapshot => {
          let activity = new Activity(activitySnapshot.val());
          const otherGenre = activity.getGenre();
          if (thisGenre == otherGenre) {
            this.activities.push(activity);
          }
        });
      });
    });
  }

  Geocode(address: string): Promise<any> {
    return new Promise((resolve, reject) => {
      var lat: number;
      var lng: number;
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address': address}, function(results, status) {
        if (status[0] == 'O') {
          lat = results[0].geometry.location.lat();
          lng = results[0].geometry.location.lng();
          var latlng = {lat, lng};
        } else {
          console.log("Error");
        }
        resolve(latlng);
      });
    })
  }

  getStaticImage(address: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.Geocode(address).then(latlng => {
        let src = 'https://maps.googleapis.com/maps/api/staticmap?center=' 
        + latlng.lat + ',' + latlng.lng + 
        '&zoom=18&size=400x400&key=AIzaSyCcfO5l6v_tEjqBTr8QB2_GWEQ96FqXzDM'
        + '&markers=color:blue|' + latlng.lat + ',' + latlng.lng
        resolve(src);
      });
    });
  }

  encodeEmail(email: string): string {
    return email.replace('.', '-');
  }

  decodeEmail(email: string): string {
    return email.replace('-', '.');
  }

}
