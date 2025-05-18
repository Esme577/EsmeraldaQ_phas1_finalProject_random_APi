
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
  console.log("Attempt 2  params", drinks)
  const listOfDrinks = drinks.map(drink => {
  return `<li><a href="#" data-name="${drink.strDrink}">${drink.strDrink}</a></li>`;
}).join(" ");

  results.innerHTML = `<ul class="drinks">${listOfDrinks}</ul>`;

  const links = document.querySelectorAll('.drinks a');

// For each link, lets add an event listener that listens for the click event.
links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const drinkName = link.getAttribute('data-name');
    console.log(drinkName);
    openDrinkDialog(drinkName);
  });
});
}


async function searchForDrink(query) {
  console.log("User input sent to API:", query);
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
  console.log(input);
  //searchForDrink(input);
  debouncedSearch(input);
})


 async function openDrinkDialog(drinkName) {
  
    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`);
        const data = await response.json(); 
        const drink = data.drinks[0];


        drinkTitle.innerText = drink.strDrink;
        let drinksIngMeasList = "";
        for (let i = 1; i <= 15; i++) {
          const ingredient = drink[`strIngredient${i}`];
          const measure = drink[`strMeasure${i}`];
          if (ingredient) {
            drinksIngMeasList += `<li>${measure || ""} ${ingredient}</li>`;}
    }
            dialogContent.innerHTML = `
        <img src="${drink.strDrinkThumb}" alt="Alcohol drink";
                                          style="width:200px;"
                                          "height:200px;"/>
        <p><strong>Ingredients:</strong> ${drink.strAlcoholic}</p>
        <p><strong>Liquor:</strong> ${drinksIngMeasList}</p>
        <p><strong>Instructions:</strong> ${drink.strInstructions}</p>`;
        dialog.showModal();
    } catch (error) {
        console.error('Not able to retireve drink info', error); 
    }
}
closeDialogButton.addEventListener('click', () => {
  dialog.close();
});

////dog random generater
async function catImage() {
  console.log("see if we get to the dog image start");
    try {
        const response = await fetch(`https://dog.ceo/api/breeds/image/random`);
        const data = await response.json();
        console.log("data",data);
        const dogImageContainer = document.getElementById("dogImageContainer");
        

        if (data.message) {
            const dogImage = document.createElement("img");
            console.log("2data",dogImage)
            dogImage.classList.add("dogImage")
            dogImage.src = data.message;
            dogImage.alt = "random do image"
            dogImageContainer.appendChild(dogImage);
        }
    }catch (error) {
        console.error('Error:', error); 
    }}
catImage();



