//Object to change my button input from string to a "call-effective" function
const socialNetwork = {
  login: login,
  register: register,
  logout: logout,
  publish: publish,
};
//Function to flip "card", alternate between login or register visual
function flip() {
  //I toggle the class of the element to flipped
  card.classList.toggle("flipped");
}
//Function in which I login the user, as long as the user and password exists in the data base
function login(email, password) {
  //I sign in to an existing account with email and password
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(() =>
    onNavItemClick('/newsfeed')
  )
  .then(() =>
    printPosts()
  )
  .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  alert("Something went wrong :( " + errorMessage);
  // ...
  });
}

//Function to refister as a new user
function register(email, password){
  //Firebase function to create a new user in the registration area, with email and password
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .catch(function failure(error) {
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
      printPosts();
    }
  });
}
//Function to log out the current user
function logout() {
  //Firebase function to log out the current user
  firebase.auth().signOut()
    .then(function() {
      // Sign-out successful.
      alert("You've correctly logged out of your account. See you soon!");
      onNavItemClick('/');
    })
    .catch(function(error) {
    // An error happened.
    });
}
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

function publish() {
  const uid = firebase.auth().currentUser.uid;
  const textpost = document.getElementById("postContent").value;

  writeNewPost(uid, textpost);
}

//Function to create new post
function writeNewPost(uid, textpost) {
  // A post entry.

  firebase.database().ref('/users/' + uid).once('value')
  .then(function(snapshot) {
    //Saving the name of the username, so we can save it in general posts as well
    let username = (snapshot.val().nombre + " " + snapshot.val().apellido);
    //Setting the data object
    let postData = {
      usuario: username,
      body: textpost,
      starCount: 0,
    };
    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('posts').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    //Pushing the posts to a common place, so we can build our newsfeed
    updates['/posts/' + newPostKey] = postData;
    //Saving the posts directly under the current user
    updates['/users/' + uid + '/posts/' + newPostKey] = postData;

    return firebase.database().ref().update(updates);
  });
}

function printPosts(){

  //Grab current user
  const user = firebase.auth().currentUser.uid;
  //Getting general posts list
  firebase.database().ref('/posts').on('value', function(snapshot) {
    let array = snapshotToArray(snapshot);
    array.reverse();

    print(array);

    function print(array){
      document.getElementById("allPosts").innerHTML = `
      ${array.map(postTemplate).join("")}`;
    }

  });

  function postTemplate(post){
    return `
    <div class="post">
      <h2 class="createPostTitle">${post.usuario}</h2>
      <textarea class="postContent" name="name" rows="6" cols="40" id="postContent">${post.body}</textarea>
    </div>
    `;
  }

  function snapshotToArray(snapshot) {
      var returnArr = [];

      snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
          item.key = childSnapshot.key;

          returnArr.push(item);
      });
      return returnArr;
  };
}

function printProfile() {
  let uid = firebase.auth().currentUser.uid;

  firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) {
    //Saving the user's data in variables before printing
    let name = snapshot.val().nombre + " " + snapshot.val().apellido;
    let ciudad = snapshot.val().ciudad;
    let email = snapshot.val().email;
    //Printing in DOM the profile
    document.getElementById("profileName").innerHTML = name;
    document.getElementById("profileCiudad").innerHTML = ciudad;
    document.getElementById("profileEmail").innerHTML = email;
  // ...
  });
}
