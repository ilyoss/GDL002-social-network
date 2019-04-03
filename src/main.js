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
//Function to flip "card", alternate between login or register visual
function flip() {
  //I toggle the class of the element to flipped
  cardElement.classList.toggle("flipped");
}

//Function in which I login the user, as long as the user and password exists in the data base
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
  });

  onNavItemClick('/newsfeed')
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
          //Change my screen to newsfeed page
          loginScreen.style.display = 'none';
          logoutScreen.style.display = 'block';
          // ...
        } else {
          // User is signed out.
          // ...
        }
      });

      onNavItemClick('/newsfeed')
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

  loginScreen.style.display = 'block';
  logoutScreen.style.display = 'none';

  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
}

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

