import { createElement } from 'lwc';
import Message from 'c/message';
import { propsWithAutoClose, propsWithoutAutoClose } from './data';
import { ClearMessageEvent } from '../event';

// Helper function to create and set props for the component
function createMessage(props) {
    const element = createElement('c-member-info', {
        is: Message
    });

    Object.assign(element, props);

    document.body.appendChild(element);

    return element;
}

describe('c-message', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('should render the component successfully', () => {
        // GIVEN WHEN
        const element = createMessage(propsWithoutAutoClose);

        // THEN
        expect(element).toMatchSnapshot();
    });

    it('should emit ClearMessageEvent when autoClose is true', async () => {
        // GIVEN
        const element = createMessage(propsWithAutoClose);

        const eventListener = jest.fn();
        element.addEventListener(ClearMessageEvent.type, eventListener);

        // Act
        document.body.appendChild(element);

        const wait = () => {
            return new Promise(resolve => setTimeout(resolve, element.visibilityTime));
        };
        await wait();

        // THEN
        expect(eventListener).toHaveBeenCalled();
        expect(eventListener.mock.calls[0][0]).toBeInstanceOf(CustomEvent);
    });
});
