
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
    console.log("Attempt 2" + drink)
    return `<li><a data-name ="${drink.strDrink}">${drink.strDrink}</li>`
  }).join(" ");

  results.innerHTML = `<ul class="drink">${listOfDrinks}</ul>`;
}


async function searchForDrink(query) {
    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json(); 
        if (data.drinks[0]) {
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
    openDrinkDialog(drinkUrl)
  });
});
function openDrinkDialog(drinkApiUrl) {
  dialog.showModal();
  fetch(drinkApiUrl)
  .then(resp => resp.json())
  .then(data => {
    const drink = data.drinks;
    console.log(`this is unnested : ${drink}`)
  
     drinkTitle.innerText = data.strDrink;
        let drinksIngMeasList ="";
        drinks.forEach(drink => {
                  for(let item=1;item<=15; item++){
            let ingredient = drink[`strIngredient${item}`];
            let measure = drink[`strMeasure${item}`];

            if (ingredient){
                console.log(`${measure || ""}${ingredient}`)
                drinksIngMeasList += `${measure || ""}${ingredient}`
                //drinksIngMeasList += `<li>${measure || ""}${ingredient}</li>`;
            }

        }
            
        });



    dialogContent.innerHTML = `
        <img src="${drink.strDrinkThumb}"/>
        <p><strong>Ingredients:</strong> ${drink.strAlcoholic}</p>
        <p><strong>Liquor:</strong> ${drinksIngMeasList}</p>
        <p><strong>Instructions:</strong> ${drink.strInstructions}</p>`;

}).catch(err => {
    console.log(err);
});

}

async function openDrinkDialog(drinkName) {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`);
    const data = await response.json();
    const drink = data.drinks[0]; // Use first match

    drinkTitle.innerText = drink.strDrink;

    let drinksIngMeasList = "";
    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];
      if (ingredient) {
        drinksIngMeasList += `<li>${measure || ""} ${ingredient}</li>`;
      }
    }

    dialogContent.innerHTML = `
      <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" style="width:200px;">
      <ul><strong>Ingredients:</strong> ${drinksIngMeasList}</ul>
      <p><strong>Instructions:</strong> ${drink.strInstructions}</p>
    `;

    dialog.showModal();
  } catch (err) {
    console.error("Error fetching drink details:", err);
  }
}
