/**
 * Inserts a new user into firebase database
 * @param {*} firstName The first name of the user
 * @param {*} lastName Last name of the user
 * @param {*} email The user's email
 * @param {*} password The user's password
 * @param {*} city The user's city
 */
function registerNewUser(name, lastName, email, password, city) {
    console.log("inserting into firebase:" + name + "," + lastName + "," + email + "," + password + "," + city);
    firebase.database().ref('users/').push({
      firstName: name,
      lastName: lastName,
      email : email,
      password : password,
      city : city
    });
    console.log("inserting into firebase complete");
  }
let provider = new firebase.auth.GoogleAuthProvider();
function registerWithGoogle (provider){
firebase.auth().signInWithPopup(provider).then (function (result){
console.log(result.user);
});   
}

  function updateUser(userId, name, lastName, email, password, city) {
    console.log("updating firebase:" + name + "," + lastName + "," + email + "," + password + "," + city);
    firebase.database().ref('users/' + userId).set({
      firstName: name,
      lastName: lastName,
      email : email,
      password : password,
      city : city
    });
    console.log("inserting firebase complete");
  }