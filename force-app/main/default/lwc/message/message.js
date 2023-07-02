import { api, LightningElement } from 'lwc';
import { ClearMessageEvent } from './event';

export default class Message extends LightningElement {
	@api text;
	@api autoClose = false;
	@api visibilityTime = 2000;

	renderedCallback() {
		if (this.autoClose) this.resetText();
	}

	resetText() {
		setTimeout(() => {
			this.dispatchEvent(new ClearMessageEvent({ bubbles: true }));
		}, this.visibilityTime);
	}
}