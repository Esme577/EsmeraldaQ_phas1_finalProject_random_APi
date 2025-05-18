/*
let drinks = [
    {"idDrink":"11007",
        "strDrink":"Margarita",
        "strDrinkAlternate":null,"strTags":"IBA,ContemporaryClassic",
        "strVideo":null,
        "strCategory":"Ordinary Drink",
        "strIBA":"Contemporary Classics",
        "strAlcoholic":"Alcoholic",
        "strGlass":"Cocktail glass",
        "strInstructions":"Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.","strInstructionsES":"Frota el borde del vaso con la rodaja de lima para que la sal se adhiera a \u00e9l. Procure humedecer s\u00f3lo el borde exterior y espolvorear la sal sobre \u00e9l. La sal debe presentarse en los labios del imbibidor y nunca mezclarse en el c\u00f3ctel. Agite los dem\u00e1s ingredientes con hielo y vi\u00e9rtalos con cuidado en el vaso.",
        "strInstructionsDE":"Reiben Sie den Rand des Glases mit der Limettenscheibe, damit das Salz daran haftet. Achten Sie darauf, dass nur der \u00e4u\u00dfere Rand angefeuchtet wird und streuen Sie das Salz darauf. Das Salz sollte sich auf den Lippen des Genie\u00dfers befinden und niemals in den Cocktail einmischen. Die anderen Zutaten mit Eis sch\u00fctteln und vorsichtig in das Glas geben.",
        "strInstructionsFR":"Frotter le bord du verre avec la tranche de citron vert pour faire adh\u00e9rer le sel. Veillez \u00e0 n'humidifier que le bord ext\u00e9rieur et \u00e0 y saupoudrer le sel. Le sel doit se pr\u00e9senter aux l\u00e8vres du buveur et ne jamais se m\u00e9langer au cocktail. Secouez les autres ingr\u00e9dients avec de la glace, puis versez-les d\u00e9licatement dans le verre.","strInstructionsIT":"Strofina il bordo del bicchiere con la fetta di lime per far aderire il sale.\r\nAvere cura di inumidire solo il bordo esterno e cospargere di sale.\r\nIl sale dovrebbe presentarsi alle labbra del bevitore e non mescolarsi mai al cocktail.\r\nShakerare gli altri ingredienti con ghiaccio, quindi versarli delicatamente nel bicchiere.","strInstructionsZH-HANS":null,"strInstructionsZH-HANT":null,
        "strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/5noda61589575158.jpg",
        "strIngredient1":"Tequila",
        "strIngredient2":"Triple sec",
        "strIngredient3":"Lime juice",
        "strIngredient4":"Salt",
        "strIngredient5":null,
        "strIngredient6":null,
        "strIngredient7":null,
        "strIngredient8":null,
        "strIngredient9":null,
        "strIngredient10":null,
        "strIngredient11":null,
        "strIngredient12":null,
        "strIngredient13":null,
        "strIngredient14":null,
        "strIngredient15":null,
        "strMeasure1":"1 1\/2 oz ",
        "strMeasure2":"1\/2 oz ",
        "strMeasure3":"1 oz ",
        "strMeasure4":null,
        "strMeasure5":null,
        "strMeasure6":null,"strMeasure7":null,"strMeasure8":null,"strMeasure9":null,"strMeasure10":null,"strMeasure11":null,"strMeasure12":null,"strMeasure13":null,"strMeasure14":null,"strMeasure15":null,"strImageSource":"https:\/\/commons.wikimedia.org\/wiki\/File:Klassiche_Margarita.jpg",
        "strImageAttribution":"Cocktailmarler",
        "strCreativeCommonsConfirmed":"Yes",
        "dateModified":"2015-08-18 14:42:59"}];

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
  
        //console.log(`<ul>${drinksIngMeasList}</ul>`);
*/
        async function catImage() {
  console.log("see if we get to the dog image start");
    try {
        const response = await fetch(`https://dog.ceo/api/breeds/image/random`);
        const data = await response.json();
        console.log(data);
        const dogImageContainer = document.getElementById("dogImageContainer")
        

        if (data.message) {
            const dogImage = document.createElement("img");
            dogImage.classList.add("dogImage")
            dogImage.src = response;
            dogImage.alt = "random do image"
            dogImageContainer.appendChild(dogImage);
        }
    }catch (error) {
        console.error('Error:', error); 
    }}
catImage();
