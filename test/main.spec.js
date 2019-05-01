var test = require('../src/main.js');

describe('Firebase test cases', () => {
    // Mocking document.getElementById 
    const getElementById = jest.fn();
    
    // Mocking firebase object
    window.firebase = {
        // Mocking database
        database: () => {
            return {
                // Mocking ref function
                ref: (collection) => {
                    return {
                        // Mocking set function
                        set: (user) => {

                        }
                    }
                }
            }
        }
    };
  
    beforeEach(() => {  
        global.document.getElementById = getElementById;
    });

    it('Test save data', () => {
        // Mock value that getElementById will return
        const mockValue = { disabled: false };
        getElementById.mockReturnValue(mockValue);
        
        // Actual execution
        saveData("UID", "email@test.com", "1234");

        // Get element by id must be called
        expect(document.getElementById).toHaveBeenCalled();
    });
});