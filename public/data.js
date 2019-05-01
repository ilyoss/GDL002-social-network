initFirebase();

function initFirebase(){
  // Initialize Firebase
  let config = {
    apiKey: "AIzaSyC69KcGgAiDrajAsi-Fbi2tjvrRMHzH9So",
    authDomain: "veggiehappy-c15fa.firebaseapp.com",
    databaseURL: "https://veggiehappy-c15fa.firebaseio.com",
    projectId: "veggiehappy-c15fa",
    storageBucket: "veggiehappy-c15fa.appspot.com",
    messagingSenderId: "982911036256"
  };
  firebase.initializeApp(config);
}
