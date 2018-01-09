import { Member } from '../classes/member';

export class Comment {

	private member: Member;
	private comment: string;

	constructor(member: Member, comment: string) { 
		this.member = member;
		this.comment = comment;
	}

	getMember(this: Comment): Member {
		return this.member;
	}

	getComment(this: Comment): string {
		return this.comment;
	}
}