 /**
 *
 * @name:       temmejs
 * @version:    1.0.0
 * @author:     EOussama
 * @license     MIT
 * @source:     https://github.com/EOussama/temmejs
 * 
 * Everything that has to do with validation, from
 * data checks to value matching goes in here.
 *
 */


const options = require('../build/modules/options').options;


describe('Option checks.', () => {

    test('Checking of all options are loaded.', () => {

        expect(options.length).toBe(12);
    })
});
