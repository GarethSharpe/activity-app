import { ActivityInterface } from '../interfaces/activity.interface'
import { Member } from '../classes/member';
import { Comment } from '../classes/comment';

export class Activity {

	private title: string;
	private genre: string;
	private hostFirst: string;
	private hostLast: string;
	private hostEmail: string;
	private hostPhone: string;
	private date: string;
  private time: string;
	private description: string;
	private cost: number;
	private address: string;
	private city: string;
	private province: string;
	private src: string;
	private members: Member[] = [];
	private comments: Comment[] = [];

	constructor(data: ActivityInterface) { 
		this.title = data.title;
		this.genre = data.genre;
		this.hostFirst = data.hostFirst;
		this.hostLast = data.hostLast;
		this.hostEmail = data.hostEmail;
		this.hostPhone = data.hostPhone;
		this.date = data.date;
		this.time = data.time;
		this.description = data.description;
		this.cost = data.cost;
		this.address = data.address;
		this.city = data.city;
		this.province = data.province;
		this.src = data.src;
		this.members = data.members;
		this.comments = data.comments;
	}

	setMember(this: Activity, member: Member): void {
		this.members.push(member);
	}

	setComment(this: Activity, comment: Comment): void {
		this.comments.push(comment)
	}

	getKey(this: Activity): string {
		return this.title;
	}

	getHostEmail(this: Activity): string {
		return this.hostEmail;
	}

	getMemberCount(this: Activity): number {
		return this.members.length;
	}

	getGenre(this: Activity): string {
		return this.genre;
	}

}
