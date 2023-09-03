import { createElement } from 'lwc';
import Main from 'c/main';
import { getListUi } from 'lightning/uiListApi';
import { teamListData } from './data';
import { MemberAddedEvent } from '../../memberSkills/event';

describe('c-main', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('should render the component successfully', () => {
        // GIVEN
        const element = createElement('c-main', {
            is: Main
        });

        // WHEN
        getListUi.emit(teamListData);
        document.body.appendChild(element);

        // THEN
        expect(element).toMatchSnapshot();
    });

    it('should handle the member change event', () => {
        // GIVEN
        const element = createElement('c-main', {
            is: Main
        });

        getListUi.emit(teamListData);
        document.body.appendChild(element);
        const memberSkillsComponent = element.shadowRoot.querySelector('c-member-skills');
        
        // WHEN
        memberSkillsComponent.dispatchEvent(new MemberAddedEvent());


        // THEN
        expect(element).toMatchSnapshot();
    });
});