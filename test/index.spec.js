require('../src/index.js');

// Steps to install jest fetch mock
// 1. Run in terminal:  npm install --save-dev jest-fetch-mock
// 2. create a file setupJest.js and write: global.fetch = require('jest-fetch-mock')
// 3. update package.json
//      "jest": {
//          "automock": false,
//          "setupFiles": [ "./setupJest.js"]
//      }
describe('fetchContent method test cases', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('debe devolver un string con el html', () => {
        // 1 Mock the fetch method
        fetch.mockResponseOnce("<div><div>");

        // 2 Expectations
        const expectedHTMLString = "<div><div>";
        
        // 3 Actual execution
        fetchContent("templates/test_template.html").then(
            actualResult => {
                // 4 Assert expectations
                expect(actualResult).toEqual(expectedHTMLString);
            }
        );
    });
});