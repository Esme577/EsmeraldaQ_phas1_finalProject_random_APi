
const results = document.getElementById("results");
const searchInput = document.getElementById("search-input");
const dialog = document.getElementById("popup-dialog");
const drinkTitle = document.getElementById("drink-title");
const dialogContent = document.getElementById("dialog-content");
const closeDialogButton = document.getElementById("close-dialog");

function debounce(func, wait) {
  let timeout;

  return function (...args) {
    const context = this;

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}



function displayDrinks(drinks){
  const listOfDrinks = drinks.map(drink => {
    return `<li><a data-url="${drink.url}">${drink.strDrink}</li>`
  }).join(" ");

  results.innerHTML = `<ul class="drink">${listOfDrinks}</ul>`;
}


async function searchForDrink(query) {
    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json(); 
        if (data.drinks) {
            data.drinks.forEach(drink => {
      console.log(drink.strDrink);
      displayDrinks(data.drinks)
    });
        } else {
            throw new Error('Drink not found ');
        }
    } catch (error) {
        console.error('Error:', error); 
    }
}

const debouncedSearch = debounce(searchForDrink, 500)

// Adding an event listener that listens to whenever the user types something into the search bar
searchInput.addEventListener("input", function (e) {
  // Get the value of the input
  const input = e.target.value;
  //console.log(input);
  //searchForDrink(input);
  debouncedSearch(input);
})

const links = document.querySelectorAll('.drinks a');
// For each link, lets add an event listener that listens for the click event.
links.forEach(link => {
  link.addEventListener('click', () => {
    const drinkUrl = link.getAttribute('data-url');
    console.log(drinkUrl);
  });
});

function openDrinkDialog(drinkApiUrl) {
  dialog.showModal();
  fetch(drinkApiUrl)
  .then(resp => resp.json())
  .then(data => {

    drinkTitle.innerText = data.strDrink;



    dialogContent.innerHTML = `
 <p><strong>Pic:</strong> ${data.strDrinkThumb}</p>
 <p><strong>Ingredients:</strong> ${data.strAlcoholic}</p>
 <p><strong>Liquor:</strong> ${data.strIngredient1},${data.strIngredient1}                 
 </p>
 <p><strong>Instructions:</strong> ${data.strInstructions}</p>`;

}).catch(err => {
    console.log(err);
});

}
