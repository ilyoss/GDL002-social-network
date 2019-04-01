//BUTTONS
//All buttons
const signInBtn = document.getElementById("signIn"); //Sign in!
const signUpBtn = document.getElementById("signUpBtn"); //Sign up
const logOutBtn = document.getElementById("logOut"); //Log Out

//INPUTS
//Login form
// const loginEmail = document.getElementById('loginEmail');
// const loginPassword = document.getElementById('loginPassword');
//Registration form
const registerName = document.getElementById('name');
const registerLast = document.getElementById('lastname');
const registerCity = document.getElementById('city');
const registerEmail = document.getElementById('email');
const registerPassword = document.getElementById('password');
const cardElement = document.getElementById("card");

//EVENT LISTENERS
// signInBtn.addEventListener("click", login);
// signUpBtn.addEventListener("click", register);
// logOut.addEventListener("click", logout);

//FUNCTIONS

//Function to flip "card", alternate between login or register visual
function flip() {
  //I toggle the class of the element to flipped
  cardElement.classList.toggle("flipped");
}

//Function in which I login the user, as long as the user and password exists in the data base
function login(email, password) {
  //
  // const email = document.getElementById('loginEmail').value;
  // const password = document.getElementById('loginPassword').value;

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
  });
}

function register(){

  let userEmail = registerEmail.value;
  let userPassword = registerPassword.value;
  //Firebase function to create a new user in the registration area, with email and password
  firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).catch(function failure(error) {
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
      saveData(uid);
      onNavItemClick('/newsfeed');
    // ...
    } else {
      // User is signed out.
      // ...
    }
  });
}

//Escribir en la base de datos
function saveData(uid){
let user = {
nombre: registerName.value,
apellido: registerLast.value,
ciudad: registerCity.value,
email: registerEmail.value,
password: registerPassword.value,
}
//Dentro de mi rama de usuarios, guardo el usuario con su uid
firebase.database().ref("users/" + uid)
.set(user);
clearInputs();
}

function clearInputs(){
registerName.value = "";
registerLast.value = "";
registerCity.value = "";
registerEmail.value = "";
registerPassword.value = "";
}

function logout() {

firebase.auth().signOut().then(function() {
// Sign-out successful.
}).catch(function(error) {
// An error happened.
});
}

const socialNetwork = {
  login: login,
};
