//Div in my main html file where I will push my content, depending on the route
let contentDiv = document.getElementById('content');
//I set up my routes for the webpage, and assign them my htmls
let routes = {
  '/': './templates/login.html',
  '/newsfeed': './templates/newsfeed.html',
  '/profile': './templates/profile.html',
  '/aboutus': './templates/aboutus.html',
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
  .then(html => contentDiv.innerHTML = html)
  .then(() => addEventListeners());
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
.then(html => contentDiv.innerHTML = html)
.then(() => addEventListeners());

//Function to add event listeners after loading my template
function addEventListeners(){
  const btnList = document.querySelectorAll(".jsBtn");

  for (let i = 0; i < btnList.length; i++) {
    //Variable to make the flip-card work
    let card = document.getElementById("card");
    if(window.location.pathname == "/"){
      btnList[i].addEventListener("click", function(event) {
        event.preventDefault();
        socialNetwork[event.target.dataset.next](document.getElementById(event.target.dataset.mail).value,
        document.getElementById(event.target.dataset.password).value);
      });
    }
    else{
      btnList[i].addEventListener("click", function(event) {
        event.preventDefault();
        socialNetwork[event.target.dataset.next]();
      });
    }
  }
}
