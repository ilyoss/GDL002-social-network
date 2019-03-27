let contentDiv = document.getElementById('content');

let routes = {
  '/': homepage,
  '/index.html': homepage,
  '/newsfeed': newsfeed,
};

window.onpopstate = () => {
  contentDiv.innerHTML = routes[window.location.pathname];
}

let onNavItemClick = (pathName) => {
  window.history.pushState({}, pathName, window.location.origin + pathName);
  contentDiv.innerHTML = routes[pathName];
}

contentDiv.innerHTML = routes[window.location.pathname];

// function loginPage() {
//
//   fetch('login.html')
//       .then(function(response) {
//           // When the page is loaded convert it to text
//           return response.text()
//       })
//       .then(function(html) {
//           // Initialize the DOM parser
//           var parser = new DOMParser();
//
//           // Parse the text
//           var doc = parser.parseFromString(html, "text/html");
//
//           // You can now even select part of that html as you would in the regular DOM
//           // Example:
//           // var docArticle = doc.querySelector('article').innerHTML;
//
//           console.log(doc);
//       })
//       .catch(function(err) {
//           console.log('Failed to fetch page: ', err);
//       });
// }
