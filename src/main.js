//DOM VARIABLES, so I can use them across my functions

                      //BUTTONS
//All buttons
const signInBtn = document.getElementById("signIn"); //Sign in!
const signUpBtn = document.getElementById("signUpBtn"); //Sign up
const logOutBtn = document.getElementById("logOut"); //Log Out

                      //INPUTS
//Login form
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
//Registration form
const registerName = document.getElementById('name');
const registerLast = document.getElementById('lastname');
const registerCity = document.getElementById('city');
const registerEmail = document.getElementById('email');
const registerPassword = document.getElementById('password');
const cardElement = document.getElementById("card");

                      //SCREENS
const loginScreen = document.getElementById("login"); //Log in screen
const logoutScreen = document.getElementById("newsfeed"); //Log in screen

logoutScreen.style.display = 'none';


                      //EVENT LISTENERS
signUpBtn.addEventListener("click", register);
logOut.addEventListener("click", logout);


                      //FUNCTIONS

//Function to flip "card", alternate between login or register visual
function flip() {
  //I toggle the class of the element to flipped
  cardElement.classList.toggle("flipped");
}

//Function in which I login the user, as long as the user and password exists in the data base
function login() {

  let loginEmail = loginEmail.value;
  let loginPassword = loginPassword.value;

  firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert("Something went wrong :( " + errorMessage);
    // ...
  });

  window.alert("Working!");
}

function register(){

  let userEmail = registerEmail.value;
  let userPassword = registerPassword.value;

  firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert("Something went wrong :( " + errorMessage);
    // ...
  });
  saveData();
  loginScreen.style.display = 'none';
  logoutScreen.style.display = 'block';
}

//Escribir en la base de datos
function saveData(){
  let user = {
    nombre: registerName.value,
    apellido: registerLast.value,
    ciudad: registerCity.value,
    email: registerEmail.value,
    password: registerPassword.value,
  }
  //Dentro de mi rama de usuarios, guardo el usuario con su uid
  firebase.database().ref("users/" + user.email)
  .set(newUser);
}

function logout() {

  loginScreen.style.display = 'block';
  logoutScreen.style.display = 'none';

  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
}
