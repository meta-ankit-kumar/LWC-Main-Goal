export class MemberAddedEvent extends CustomEvent {
	static type = 'memberadded';
	constructor(value) {
		super(MemberAddedEvent.type, {
			detail: value
		})
	}
}