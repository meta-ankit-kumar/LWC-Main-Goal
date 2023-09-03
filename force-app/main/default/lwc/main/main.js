import { getListUi } from 'lightning/uiListApi';
import { LightningElement, track, wire } from 'lwc';
export default class Main extends LightningElement {
	@track teams;
	@wire(getListUi, { objectApiName: 'Team__c', listViewApiName: 'All' })
	wiredTeams({ data, error }) {
		if (data) {
			console.log('data', JSON.stringify(data));
			this.teams = JSON.parse(JSON.stringify(data.records.records.map(record => ({
				id: record.fields.Id.value,
				name: record.fields.Name.value
			}))));
			console.log('this.teams', JSON.stringify(this.teams));
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