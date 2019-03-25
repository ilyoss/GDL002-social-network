//Function to flip "card", alternate between login or register visual
function flip() {
  //I get my card, or element which holds my visuals
  let element = document.getElementById("card");
  //I toggle the class of the element to flipped
  element.classList.toggle("flipped");
}
