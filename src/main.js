<<<<<<< HEAD
let cardElement; 
let registerName;
let registerLast;
let registerCity;
let registerEmail;
let registerPassword;
let loginEmail;
let loginPassword;
let signInBtn;
let signUpBtn;
let logOutBtn;

                      //BUTTONS
window.onload = function () {
  console.log("onload");
  //All buttons
  signInBtn = document.getElementById("signIn"); //Sign in!
  signUpBtn = document.getElementById("signUpBtn"); //Sign up
  logOutBtn = document.getElementById("logOut"); //Log Out

                        //INPUTS
  //Login form
  loginEmail = document.getElementById('loginEmail');
  loginPassword = document.getElementById('loginPassword');
  //Registration form
  registerName = document.getElementById('name');
  registerLast = document.getElementById('lastname');
  registerCity = document.getElementById('city');
  registerEmail = document.getElementById('email');
  registerPassword = document.getElementById('password');
  cardElement = document.getElementById("card");

                        //EVENT LISTENERS
  signInBtn.addEventListener("click", login);
  signUpBtn.addEventListener("click", register);

  // logOut.addEventListener("click", logout);
}
                      //FUNCTIONS
=======
//Object to change my button input from string to a "call-effective" function
const socialNetwork = {
  login: login,
  register: register,
  logout: logout,
  // publish: publish,
};
>>>>>>> e3db3cd8b31b06c517e556099b774b1513b453d1
//Function to flip "card", alternate between login or register visual
function flip() {
  //I toggle the class of the element to flipped
  card.classList.toggle("flipped");
}
//Function in which I login the user, as long as the user and password exists in the data base
<<<<<<< HEAD
function login() {

  let email = loginEmail.value;
  let password = loginPassword.value;

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    console.log("user id: " + firebase.auth().currentUser.uid);
    // // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert("Something went wrong :( " + errorMessage);
    // ...
=======
function login(email, password) {
  //I sign in to an existing account with email and password
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(() =>
    onNavItemClick('/newsfeed')
  )
  .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  alert("Something went wrong :( " + errorMessage);
  // ...
>>>>>>> e3db3cd8b31b06c517e556099b774b1513b453d1
  });
}
//Function to refister as a new user
function register(email, password){
  //Firebase function to create a new user in the registration area, with email and password
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function failure(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorCode + "- Oh no, something went wrong :( " + errorMessage);
  });
  //After the user is created I check that the user is signed in
  firebase.auth().onAuthStateChanged(function(user) {
    //If my new user is logged in (which is true, because after registration it logs in automatically)
    if (user) {
      //I save the uid in a variable
      let uid = user.uid;
      //I call my save data function and send the uid
      saveData(uid, email, password);
      onNavItemClick('/newsfeed');
      // ...
    } else {
      // User is signed out.
      // ...
    }
  });
}
//Function to log out the current user
function logout() {
  //Firebase function to log out the current user
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    alert("You've correctly logged out of your account. See you soon!");
    onNavItemClick('/');
    }).catch(function(error) {
    // An error happened.
  });
}
<<<<<<< HEAD

/**
 * Checks in firebase of the user and email provided in the inputs are present in the database
 */
function signIn() {
  let email = document.querySelector("#signInEmail").value;
  let password = document.querySelector("#signInPassword").value;

  // Query firebase database for users that match the email from the input
  firebase.database().ref("users").orderByChild("email").equalTo(email).on("child_added", function(reponseFromFireBase) {
    let userFromDatabase = reponseFromFireBase.val();
    console.log(userFromDatabase);
    if (userFromDatabase.password != password) {
      alert("User or password incorrect!");
    } else {
      // Go to home page
      alert("Valid user. Redirect to Home Page");
    }
  });
}

function signUp() {
  let name = document.querySelector("#name").value;
  let lastName = document.querySelector("#lastName").value;
  let city = document.querySelector("#city").value;
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;

  registerNewUser(name, lastName, email, password, city);

}

function editUserDetails() {
  let name = document.querySelector("#name").value;
  let lastName = document.querySelector("#lastName").value;
  let city = document.querySelector("#city").value;
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;

  updateUser(name, lastName, email, password, city);
}

function signGoogle() {
registerWithGoogle (provider);

}

=======
//Function to record new user data in database
function saveData(uid, email, password){
  let user = {
    nombre: document.getElementById('name').value,
    apellido: document.getElementById('lastName').value,
    ciudad: document.getElementById('city').value,
    email: email,
    password: password,
  }
  //Dentro de mi rama de usuarios, guardo el usuario con su uid
  firebase.database().ref("users/" + uid).set(user);
}

//Function to save data from new post
// function writeNewPost(uid, username, picture, title, body) {
//   // A post entry.
//   let postData = {
//     author: username,
//     uid: uid,
//     body: body,
//     title: title,
//     starCount: 0,
//     authorPic: picture
//   };
//
//   // Get a key for a new Post.
//   let newPostKey = firebase.database().ref("users/" + uid + "/").child('posts').push().key;
//
//   // Write the new post's data simultaneously in the posts list and the user's post list.
//   let updates = {};
//   updates['/posts/' + newPostKey] = postData;
//   updates['/user-posts/' + uid + '/' + newPostKey] = postData;
//
//   return firebase.database().ref().update(updates);
// }
>>>>>>> e3db3cd8b31b06c517e556099b774b1513b453d1
