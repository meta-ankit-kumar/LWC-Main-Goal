import { createElement } from 'lwc';
import MemberSkills from 'c/memberSkills';
import { createRecord } from 'lightning/uiRecordApi';
import { teamsTestData } from './data';

jest.mock('lightning/uiRecordApi', () => ({
    createRecord: jest.fn(),
}));

describe('c-member-skills', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('should submit the form and handle success', async () => {
        // GIVEN
        const memberInformation = {
            Name: 'Test Member Name',
            Skills__c: 'Test skills',
            Team__c: `${teamsTestData[1].id}`
        }
        const element = createElement('c-member-skills', {
            is: MemberSkills,
        });
        element.teams = teamsTestData;
        document.body.appendChild(element);

        createRecord.mockResolvedValue({
            fields: {
                Name: { value: memberInformation.Name },
            },
        });

        // WHEN
        const form = element.shadowRoot.querySelector('form');
        const input = element.shadowRoot.querySelectorAll('input');
        const teamSelection = element.shadowRoot.querySelector('select');
        console.log('input', input);
        input[0].value = memberInformation.Name;
        input[1].value = memberInformation.Skills__c;
        teamSelection.value = memberInformation.Team__c;
        form.dispatchEvent(new CustomEvent('submit'));

        // THEN
        expect(createRecord).toHaveBeenCalledWith({
            apiName: 'TeamMember__c',
            fields: memberInformation
        });

        const wait = () => {
            return new Promise(resolve => setTimeout(resolve, 1000));
        }
        await wait();
        expect(element).toMatchSnapshot();
    });

    it('should handle form submission error', async () => {
        // GIVEN
        const element = createElement('c-member-skills', {
            is: MemberSkills,
        });
        element.teams = teamsTestData;
        document.body.appendChild(element);

        const errorMessage = 'Error message from createRecord';
        createRecord.mockRejectedValue({ message: errorMessage });
        const form = element.shadowRoot.querySelector('form');

        // WHEN
        form.dispatchEvent(new Event('submit'));

        // THEN
        const wait = () => {
            return new Promise(resolve => setTimeout(resolve, 1000));
        }
        await wait();
        expect(element).toMatchSnapshot();
    });
});
