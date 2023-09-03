import { createElement } from 'lwc';
import TeamList from 'c/teamList';
import { teamListData, teamsTestData } from './data';
import { getListUi } from 'lightning/uiListApi';

describe('c-team-list', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('should render the team list component successfully', () => {
        // GIVEN
        const element = createElement('c-team-list', {
            is: TeamList
        });

        element.teams = teamsTestData;

        getListUi.emit(teamListData.data);

        // WHEN
        document.body.appendChild(element);

        // THEN
        expect(element).toMatchSnapshot();
    });

    it('should refresh the list', async () => {
        // GIVEN WHEN
        const jestMockRefreshFunction = jest.fn();
        const element = createElement('c-team-list', {
            is: TeamList
        });

        element.teams = teamsTestData;
        element.refreshList = jestMockRefreshFunction;

        getListUi.emit(teamListData.data);

        document.body.appendChild(element);

        element.refreshList();

        // THEN
        expect(jestMockRefreshFunction).toHaveBeenCalled();
    });
});
