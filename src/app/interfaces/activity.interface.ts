import { Member } from '../classes/member';
import { Comment } from '../classes/comment';

export interface ActivityInterface {
	title: string,
	genre: string,
	hostFirst: string,
	hostLast: string,
	hostEmail: string,
	hostPhone: string,
	date: string,
	time: string,
	description: string,
	cost: number,
	address: string,
	city: string,
	province: string,
	src: string,
	members: Member[],
	comments: Comment[]
}
