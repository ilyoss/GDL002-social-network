const test = require('../src/data.js');

describe('Firebase intialization test cases', () => {
    // Mocking firebase object
    window.firebase = jest.fn();

    // Mocking initializaApp method from firebase
    firebase.initializeApp = jest.fn();

    it('Test init firebase', () => {
        initFirebase();
        // Validating initializaApp mehod was called
        expect(firebase.initializeApp).toHaveBeenCalled();
    });
});
