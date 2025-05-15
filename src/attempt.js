/*
const results = document.getElementById("results");
const searchInput = document.getElementById("search-input");


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


document.addEventListener("DOMContentLoaded", function(){
fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`).then(resp => resp.json()).then(data => {
 console.log(data.drinks)
 const listOfDrinks= data.results.map(drink => {
    return `<li>${drink.strDrink}</li>`
 });
 results.innerHTML = `<ul class="drink">${listOfDrinks}</ul>`}).join(" ");

}).catch(e => {
 console.log(e);
 results.innerText = "Drink not found "
})


function displayDrinks(drinks){
  const listOfDrinks = drinks.map(drink => {
    return `<li>${drink.strDrink}</li>`
  }).join(" ");

  results.innerHTML = `<ul class="drink">${listOfDrinks}</ul>`;
}

document.addEventListener("DOMContentLoaded", function () {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`).then(resp => resp.json()).then(data => {
    console.log(data)
    displayDrinks(data.results);
  }).catch(e => {
    console.log(e);
    results.innerText = "Drinks not found";
  })
})

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
*/

async function drinkIngredients() {

try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`);
        const data = await response.json(); 
        if (data.drinks) {
            let ingredMeasList ="";
            for(i=0,i<=16;i++){
        const ingredient = data[`strIngredient${i}`];
        const measure = data[`strMeasure${i}`];

        if (ingredient) {
          ingredMeasList += `<li>${ingredient}${measure ? ` - ${measure}` : ''}</li>`;
        } else {
            throw new Error('Drink not found ');
        }
    } catch (error) {
        console.error('Error:', error); 
    }
}
drinkIngredients()

  fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
    .then(resp => resp.json())
    .then(data => {
    data.drinks.for(drink => {
      console.log(drink.strDrink);
    });
  })
  .catch(err => console.error(err));