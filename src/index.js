//Div in my main html file where I will push my content, depending on the route
let contentDiv = document.getElementById('content');
//I set up my routes for the webpage, and assign them my htmls
let routes = {
  '/src/': './templates/login.html',
  '/src/index.html': './templates/login.html',
  '/src/newsfeed': './templates/newsfeed.html',
};
//
window.onpopstate = () => {
  fetchContent(routes[window.location.pathname])
  .then(html => contentDiv.innerHTML = html);
}
//Function that I use when the interaction on my DOM requires to change page
let onNavItemClick = (pathName) => {
  window.history.pushState({}, pathName, window.location.origin + pathName);
  //I fetch my html content and send it to the innerHTML
  fetchContent(routes[window.location.pathname])
  .then(html => contentDiv.innerHTML = html);
}
//My fetchContent function, which gets the data in my htmls and translates it to text, which I then can use
const fetchContent = (url) => fetch(url)
    .then(function(response) {
        // When the page is loaded convert it to text
        return response.text()
    })
    .then(function(html) {
        //Returns my html section
        return html;
    })
    .catch(function(err) {
        console.log('Failed to fetch page: ', err);
    });

fetchContent(routes[window.location.pathname])
.then(html => contentDiv.innerHTML = html);


/*function createUser() {
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let city = document.getElementById("city").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    insertUser(firstName, lastName, city, email, password);
}

function addPost() {
  let userId = "K1fOYzBObY7jJcr9sy0S";
  let message = document.getElementById("message").value;
  insertPost(userId, message);
}

function insertUser(firstName, lastName, city, email, password) {
  // Add a new document with a generated id.
  db.collection("users").add({
      firstName: firstName,
      lastName: lastName,
      email: email,
      city: city,
      password: password
  })
  .then(function(docRef) {
      console.log("User added with ID: ", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
}

function insertPost(userId, message) {

  db.collection("users").doc(userId).collection('posts').add({
    message: message
  }).then(function(docRef) {
      console.log("post added with ID: ", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
}
*/
