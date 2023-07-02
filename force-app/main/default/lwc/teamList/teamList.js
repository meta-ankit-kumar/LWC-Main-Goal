import { api, LightningElement, track, wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import { refreshApex } from '@salesforce/apex';

export default class TeamList extends LightningElement {
	@track allTeamMembers;
	@track selectedTeam;
	@api teams;
	@track messages;
	wiredTeamMembersResult;
	@wire(getListUi, { objectApiName: 'TeamMember__c', listViewApiName: 'Members_with_team' })
	wiredTeamMembers(result) {
		this.wiredTeamMembersResult = result;
		this.initializeTeamMembersList(result);
	}

	initializeTeamMembersList(result) {
		const { error, data } = result;
		if (data) {
			this.allTeamMembers = data.records.records.map(record => ({
				id: record.fields.Id.value,
				name: record.fields.Name.value,
				skills: record.fields.Skills__c.value,
				teamName: record.fields.Team__r.value.fields.Name.value,
				teamId: record.fields.Team__r.value.fields.Id.value
			}))

			this.selectedTeam = this.allTeamMembers.length ? this.allTeamMembers[0].teamId : '';
		}
		else if (error) {
			this.messages = error.message;
		}
	}

	@api
	refreshList() {
		console.log('Refresh List called');
		refreshApex(this.wiredTeamMembersResult)
		.then(() => {
			this.initializeTeamMembersList(this.wiredTeamMembersResult)
		})
		.catch((error) => {
			this.messages = error.message;
		})
	}

	get teamMembers() {
		const membersList = this.allTeamMembers.filter(memberInfo => memberInfo.teamId === this.selectedTeam);
		return membersList;
	}

	get isTeamEmpty() {
		const membersList = this.allTeamMembers.filter(memberInfo => memberInfo.teamId === this.selectedTeam);
		return membersList.length === 0;
	}

	handleTeamNameChange(event) {
		console.log('event.taget.value', event.target.value);
		this.selectedTeam = event.target.value;
	}
}