import { api, LightningElement } from 'lwc';

export default class MemberInfo extends LightningElement {
	@api name;
	@api teamName;
	@api skills;
}