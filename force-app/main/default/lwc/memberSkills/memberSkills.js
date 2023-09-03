import { createRecord } from 'lightning/uiRecordApi';
import { api, LightningElement, track } from 'lwc';
import { MESSAGE } from './constants';
import { MemberAddedEvent } from './event';
import { useTemplate } from './utils';

export default class MemberSkills extends LightningElement {
	@api teams;
	@track errors;
	@track message;

	handleSubmit(event) {
		event.preventDefault();

		const formData = new FormData(event.target);
		const memberName = formData.get('member-name');
		const teamName = formData.get('member-team-name');
		const memberSkills = formData.get('member-skills');
		const fields = {
			Name: memberName,
			Skills__c: memberSkills,
			Team__c: teamName
		}
		createRecord({ apiName: 'TeamMember__c', fields })
			.then(result => {
				this.message = useTemplate(MESSAGE.MEMBER_CREATION.SUCCESSFULL, { MEMBER_NAME: result.fields.Name.value });
				this.dispatchEvent(new MemberAddedEvent({ bubbles: true }));
				const form = this.template.querySelector('form');
				form.reset();
			})
			.catch(error => {
				this.errors = error.message;
			});
	}

	handleClearMessage() {
		this.message = null;
	}

	get errorsToBeShown() {
		return useTemplate(MESSAGE.MEMBER_CREATION.ERROR.GENERIC, { ERRORS: this.errors });
	}
}