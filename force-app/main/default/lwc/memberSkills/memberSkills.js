import { getListUi } from 'lightning/uiListApi';
import { createRecord } from 'lightning/uiRecordApi';
import { api, LightningElement, track, wire } from 'lwc';
import { MESSAGE } from './constants';
import { MemberAddedEvent } from './event';
import { useTemplate } from './utils';

export default class MemberSkills extends LightningElement {
	@api teams;
	@track errors;
	@track message;
	// @wire(getListUi, { objectApiName: 'Team__c', listViewApiName: 'All' })
	// wiredTeams({ data, error }) {
	// 	if (data) {
	// 		this.teams = JSON.parse(JSON.stringify(data.records.records.map(record => ({
	// 			id: record.fields.Id.value,
	// 			name: record.fields.Name.value
	// 		}))))
	// 	} else if (error) {
	// 		this.errors = error.message;
	// 	}
	// }

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

	handleClearMessage(event) {
		this.message = null;
	}

	get errorsToBeShown() {
		return useTemplate(MESSAGE.MEMBER_CREATION.ERROR, { ERRORS: this.errors });
	}
}