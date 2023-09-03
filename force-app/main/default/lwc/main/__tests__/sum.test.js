import { sum } from '../utils';
describe('A basic sum test', () => {
	it('should add 1 + 2 to equal 3', () => {
		// GIVEN 
		const number1 = 10;
		const number2 = 20;

		// WHEN
		const result = sum(number1, number2);

        // THEN
        expect(result).toBe(30);
    });
})