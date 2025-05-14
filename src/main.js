
  /*
  fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
  //fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${}`)
  //https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${}
    .then(resp => resp.json())
    .then(data => {
    data.drinks.forEach(drink => {
      console.log(drink.strDrink);
    });
  })
  .catch(err => console.error(err));
*/
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
/*
document.addEventListener("DOMContentLoaded", function(){
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`).then(resp => resp.json()).then(data => {
console.log(data)
const listOfDrink = data.results.map(drink => {
   return `<li>${drink.strDrink}</li>`
});
results.innerHTML = `<ul>${listOfDrink}</ul>`;
  }).catch(e => {
console.log(e);
results.innerText = "Drink not available";
  })
})

function displaySesrcherDrink(drinks){
  const listOfDrink = data.results.map(drink => {
    return `<li>${drink.strDrink}</li>`
  }).join(" ");

  results.innerHTML = `<ul class="characters">${listOfDrink}</ul>`;
}


const results = document.getElementById("results");

*/

////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
/*
const results = document.getElementById("results");
// Getting the search input
const searchInput = document.getElementById("search-input");

// Adding an event listener that listens to whenever the user types something into the search bar
searchInput.addEventListener("input", function (e) {
  // Get the value of the input
  const input = e.target.value;
  console.log(input);
  searchForDrink(input)
})



async function searchForDrink(query) {
    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json(); 
        if (data.drinks) {
            data.drinks.forEach(drink => {
      console.log(drink.strDrink);
    });
        } else {
            throw new Error('Drink not found ');
        }
    } catch (error) {
        console.error('Error:', error); 
    }
}
searchForDrink();*/
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



function displayDrinks(drinks){
  const listOfDrinks = drinks.map(drink => {
    return `<li>${drink.strDrink}</li>`
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