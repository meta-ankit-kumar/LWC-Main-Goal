export class ClearMessageEvent extends CustomEvent {
	static type='clearmessage';
	constructor(value) {
		super(ClearMessageEvent.type, { detail: { value }});
	}
}