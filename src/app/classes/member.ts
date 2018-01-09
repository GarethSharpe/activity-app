import { MemberInterface } from '../interfaces/member.interface'

export class Member {

	private first;
	private last;
	private email;

	constructor(data: MemberInterface) { 
		this.first = data.first;
		this.last = data.last;
		this.email = data.email;
	}

	getEmail(this: Member): string {
		return this.email;
	}
	
}
