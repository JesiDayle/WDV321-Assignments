import { showToast } from "./toast.js";

// ---------- DEFAULT RECIPES ----------
export const defaultRecipes = [
    {
        id: "spaghetti",
        name: "Classic Spaghetti",
        image: "images/placeholder.png",
        servings: 4,
        time: "30 min",
        difficulty: "Easy",
        ingredients: [
            { amount: 1, unit: "lb", item: "Spaghetti" },
            { amount: 2, unit: "cups", item: "Marinara Sauce" }
        ],
        instructions: [
            "Boil pasta until tender.",
            "Heat sauce and combine with pasta."
        ]
    },
    {
        id: "pancakes",
        name: "Fluffy Pancakes",
        image: "images/placeholder.png",
        servings: 6,
        time: "20 min",
        difficulty: "Medium",
        ingredients: [
            { amount: 2, unit: "cups", item: "Flour" },
            { amount: 1.5, unit: "cups", item: "Milk" }
        ],
        instructions: [
            "Mix ingredients.",
            "Cook on a griddle until golden."
        ]
    },
    {
        id: "crockpot-chili",
        name: "Crockpot Chili",
        image: "images/placeholder.png",
        servings: 6,
        time: "6 hr",
        difficulty: "Medium",
        ingredients: [
            { amount: 2, unit: "tbsp", item: "Cooking Oil" },
            { amount: 1, unit: "cup", item: "Onion, chopped" },
            { amount: 1, unit: "cup", item: "Chopped Peppers" },
            { amount: 4, unit: "tbsp", item: "Chili Powder" },
            { amount: 1, unit: "tsp", item: "Hot Chili Powder (optional)" },
            { amount: 1, unit: "lb", item: "Ground Beef or Chicken" },
            { amount: 2, unit: "cans", item: "Red Beans" },
            { amount: 2, unit: "cans", item: "Kidney Beans" },
            { amount: 2, unit: "cans", item: "Tomato Puree" },
            { amount: 2, unit: "cans", item: "Tomato Sauce" },
            { amount: 1, unit: "cup", item: "Shredded Cheese (optional)" },
            { amount: 0.5, unit: "cup", item: "Sour Cream (optional)" }
        ],
        instructions: [
            "Heat cooking oil in a skillet.",
            "Saute onions and peppers for 5 minutes.",
            "Add spices and stir for 30 seconds.",
            "Add meat and cook until browned (about 15 minutes).",
            "Pour contents into crockpot.",
            "Add rinsed beans, tomato puree, and sauce.",
            "Cover and cook on low for 6 hours.",
            "Serve with cheese and sour cream if desired."
        ]
    }
];

// ---------- LOCALSTORAGE HELPERS ----------
export const storage = {
    initializeRecipes(recipes) {
        if (!localStorage.getItem("recipes")) {
            localStorage.setItem("recipes", JSON.stringify(recipes));
        }
    },
    getRecipes() {
        return JSON.parse(localStorage.getItem("recipes")) || [];
    },
    deleteRecipe(id) {
        const recipes = this.getRecipes().filter(r => r.id !== id);
        localStorage.setItem("recipes", JSON.stringify(recipes));
    },
    addRecipe(recipe) {
        const recipes = this.getRecipes();
        const index = recipes.findIndex(r => r.id === recipe.id);
        if (index > -1) {
            recipes[index] = recipe;
        } else {
            recipes.push(recipe);
        }
        localStorage.setItem("recipes", JSON.stringify(recipes));
    }
};

// Initialize recipes
storage.initializeRecipes(defaultRecipes);

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
        container.innerHTML = `<p class="no-results">No recipes found.</p>`;
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

// ---------- INITIAL DISPLAY ----------
displayRecipeCards();
