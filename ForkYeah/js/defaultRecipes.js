import { defaultRecipes } from "./defaultRecipes.js";

// Initialize storage with defaults if empty
storage.initializeRecipes(defaultRecipes);

// ---------- TOAST NOTIFICATIONS ----------
export function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 50);
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 500);
    }, 2000);
}

// ---------- DISPLAY RECIPE CARDS ----------
export function displayRecipeCards(filter = "") {
    const container = document.getElementById("recipeContainer");
    if (!container) return;

    const recipes = storage.getRecipes();

    const filteredRecipes = recipes.filter(r => {
        const nameMatch = r.name.toLowerCase().includes(filter.toLowerCase());
        const ingredientMatch = r.ingredients.some(i =>
            i.item.toLowerCase().includes(filter.toLowerCase())
        );
        return nameMatch || ingredientMatch;
    });

    container.innerHTML = "";

    if (filteredRecipes.length === 0) {
        const msg = document.createElement("p");
        msg.className = "no-results";
        msg.textContent = "No matching recipes found.";
        container.appendChild(msg);
        return;
    }

    filteredRecipes.forEach(recipe => {
        const card = document.createElement("div");
        card.className = "recipe-card hover-effect";

        card.innerHTML = `
            <div class="recipe-image-card">
                <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
            </div>
            <div class="recipe-content">
                <h3 class="recipe-title">${recipe.name}</h3>
                <p><strong>Servings:</strong> ${recipe.servings}</p>
                <p><strong>Time:</strong> ${recipe.time}</p>
                <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
                <div class="recipe-actions" style="margin-top:10px;">
                    <button class="btn-secondary viewRecipeBtn" data-id="${recipe.id}">View Recipe</button>
                    <button class="btn-secondary editRecipeBtn" data-id="${recipe.id}">Edit</button>
                    <button class="btn-danger deleteRecipeBtn" data-id="${recipe.id}">Delete</button>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

// ---------- EVENT LISTENERS ----------
document.addEventListener("click", e => {
    const id = e.target.dataset.id;

    if (e.target.classList.contains("viewRecipeBtn")) {
        window.location.href = `recipeDetails.html?id=${id}`;
    }

    if (e.target.classList.contains("editRecipeBtn")) {
        window.location.href = `addRecipe.html?id=${id}`;
    }

    if (e.target.classList.contains("deleteRecipeBtn")) {
        if (confirm("Are you sure you want to delete this recipe?")) {
            storage.deleteRecipe(id);
            showToast("Recipe deleted!");
            displayRecipeCards(document.getElementById("searchInput")?.value || "");
        }
    }
});

// ---------- RESET RECIPES ----------
document.getElementById("resetRecipes")?.addEventListener("click", () => {
    localStorage.removeItem("recipes");
    storage.initializeRecipes(defaultRecipes);
    displayRecipeCards(document.getElementById("searchInput")?.value || "");
    showToast("Recipes reset to default");
});

// ---------- SEARCH BAR ----------
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
const searchBtn = document.getElementById("searchBtn");

searchInput?.addEventListener("input", () => displayRecipeCards(searchInput.value));
clearSearch?.addEventListener("click", () => {
    searchInput.value = "";
    displayRecipeCards("");
});
searchBtn?.addEventListener("click", () => displayRecipeCards(searchInput.value));

// ---------- INITIAL DISPLAY ----------
displayRecipeCards();
