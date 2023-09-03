import { createElement } from 'lwc';
import MemberInfo from 'c/memberInfo';
import { props } from './data';

// Helper function to create and set props for the component
function createMemberInfo(props) {
    const element = createElement('c-member-info', {
        is: MemberInfo
    });

    Object.assign(element, props);

    document.body.appendChild(element);

    return element;
}

describe('c-member-info', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('should render the component successfully', () => {
        // GIVEN WHEN
        const element = createMemberInfo(props);

        // THEN
        expect(element).toMatchSnapshot();
    });
});
