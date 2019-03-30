//Function to flip "card", alternate between login or register visual
function flip() {
  console.log("flip");
  //I get my card, or element which holds my visuals
  let element = document.getElementById("card");
  //I toggle the class of the element to flipped
  element.classList.toggle("flipped");
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
document.getElementById("signup").addEventListener("click", signUp);

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