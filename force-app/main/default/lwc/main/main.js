import { getListUi } from 'lightning/uiListApi';
import { LightningElement, track, wire } from 'lwc';

export default class Main extends LightningElement {
	@track teams;
	@wire(getListUi, { objectApiName: 'Team__c', listViewApiName: 'All' })
	wiredTeams({ data, error }) {
		if (data) {
			this.teams = JSON.parse(JSON.stringify(data.records.records.map(record => ({
				id: record.fields.Id.value,
				name: record.fields.Name.value
			}))));
		} else if (error) {
			this.errors = error.message;
		}
	}

	handleMemberChange(event) {
		try {
			console.log('Member change detected');
		console.log('this.template.querySelector', this.template.querySelector('c-team-list'));
		this.template.querySelector('c-team-list').refreshList();
		} catch (error) {
			console.log('In the catch', JSON.stringify(error));
		}
	}
}