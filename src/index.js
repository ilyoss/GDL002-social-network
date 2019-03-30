//Div in my main html file where I will push my content, depending on the route
let contentDiv = document.getElementById('content');
//I set up my routes for the webpage, and assign them my htmls
let routes = {
  '/': './templates/login.html',
  '/index.html': './templates/login.html',
  '/newsfeed': './templates/newsfeed.html',
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
