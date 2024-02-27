const recipeListContainer = document.querySelector(".recipe-list");

const loader = document.querySelector(".loader");
const recipeListDetails = document.querySelector(".recipe-details");

function showLoader() {
  loader.classList.add("show");
  recipeListContainer.classList.add("hide");
}
function removeLoader() {
  loader.classList.remove("show");
  recipeListContainer.classList.remove("hide");
}

async function fetchListOfRecipes() {
    showLoader()
  const response = await fetch("https://dummyjson.com/recipes", {
    method: "GET",
  });
  const result = await response.json();

  if (result && result.recipes && result.recipes.length > 0) {
    removeLoader()
    displayRecipeList(result.recipes);
  }
}

function displayRecipeList(getRecipeList) {
  getRecipeList.forEach((recipeItem) => {
    const { id, image, name, cuisine, ingredients, rating, mealType } =
      recipeItem;

    const recipeItemWraper = document.createElement("div");
    recipeItemWraper.classList.add("recipe-item");

    //name
    const recipeName = document.createElement("p");
    recipeName.textContent = name;
    recipeName.classList.add("recipe-name");

    //image
    const recipeImg = document.createElement("img");
    recipeImg.src = image;
    recipeImg.classList.add("recipe-image");

    //cuisine
    const recipeCuisine = document.createElement("p");
    recipeCuisine.textContent = cuisine;
    recipeCuisine.classList.add("recipe-cuisine");

    //ingredients
    const recipeIngredients = document.createElement("div");
    recipeIngredients.textContent = ingredients.map((item) => item).join(",");
    recipeIngredients.classList.add("recipe-ingredients");

    //mealType
    const recipeMealType = document.createElement("p");
    recipeMealType.textContent = mealType;
    recipeMealType.classList.add("recipe-mealtype");

    //recipeRating
    const recipeRating = document.createElement("p");
    recipeRating.textContent = rating;
    recipeRating.classList.add("recipe-rating");

    // recipe details button
    const recipeDetailsButton = document.createElement("button");
    recipeDetailsButton.innerText = "Recipe Details";
    recipeDetailsButton.classList.add("recipe-details-button");
    recipeDetailsButton.addEventListener("click", () =>
      handleRecipeDetails(id)
    );

    recipeItemWraper.appendChild(recipeName);
    recipeItemWraper.appendChild(recipeImg);
    recipeItemWraper.appendChild(recipeCuisine);
    recipeItemWraper.appendChild(recipeIngredients);
    recipeItemWraper.appendChild(recipeMealType);
    recipeItemWraper.appendChild(recipeRating);
    recipeItemWraper.appendChild(recipeDetailsButton);
    recipeListContainer.appendChild(recipeItemWraper);
  });
}

async function handleRecipeDetails(getId) {
  const response = await fetch(`https://dummyjson.com/recipes/${getId}`);
  const result = await response.json();
  if (result) {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
    displayRecipeDetailsData(result);
  }
}
fetchListOfRecipes();

function displayRecipeDetailsData(getRecipeData) {
  recipeListDetails.innerHTML = `
    <h1>
    Selected Recipe
    </h1>
    <h1>${getRecipeData.name}</h1>
    `;
}
