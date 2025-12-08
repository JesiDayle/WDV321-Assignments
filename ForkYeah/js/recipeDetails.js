import { showToast } from "./toast.js";

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const recipeId = params.get("id");

    const titleEl = document.getElementById("recipeTitle");
    const imgEl = document.getElementById("recipeImage");
    const ingredientListEl = document.getElementById("ingredientList");
    const instructionsEl = document.getElementById("instructionList");

    const addAllBtn = document.getElementById("addAllToGrocery");
    const backBtn = document.getElementById("backButton");
    const deleteBtn = document.getElementById("deleteButton");

    const servingsSelect = document.getElementById("servingsSelect");
    const customServingsInput = document.getElementById("customServings");

    function getRecipes() {
        return JSON.parse(localStorage.getItem("recipes")) || [];
    }

    function getGroceryList() {
        return JSON.parse(localStorage.getItem("groceryList")) || [];
    }

    function saveGroceryList(list) {
        localStorage.setItem("groceryList", JSON.stringify(list));
    }

    const recipes = getRecipes();
    const recipe = recipes.find(r => r.id === recipeId);

    if (!recipe) {
        titleEl.textContent = "Recipe not found";
        return;
    }

    // Save original values for scaling
    const baseServings = recipe.servings;
    const baseIngredients = JSON.parse(JSON.stringify(recipe.ingredients));

    // Render recipe title + image
    titleEl.textContent = recipe.name;
    imgEl.src = recipe.image || "images/placeholder.png";

    // Function to render ingredients with scaling + checkboxes
    function renderIngredients(multiplier = 1) {
        ingredientListEl.innerHTML = "";

        const groceryList = getGroceryList();

        baseIngredients.forEach((ing) => {
            const li = document.createElement("li");
            li.className = "ingredient-item";
            li.style.display = "flex";
            li.style.alignItems = "center";
            li.style.gap = "10px";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";

            const scaledAmount = (ing.amount * multiplier).toFixed(1);
            const itemText = `${scaledAmount} ${ing.unit} ${ing.item}`;

            const label = document.createElement("span");
            label.textContent = itemText;

            // Sync checkbox state
            if (groceryList.includes(itemText)) {
                checkbox.checked = true;
            }

            checkbox.addEventListener("change", () => {
                let list = getGroceryList();

                if (checkbox.checked) {
                    if (!list.includes(itemText)) {
                        list.push(itemText);
                        saveGroceryList(list);
                        showToast("Added to grocery list");
                    }
                } else {
                    const index = list.indexOf(itemText);
                    if (index > -1) {
                        list.splice(index, 1);
                        saveGroceryList(list);
                        showToast("Removed from grocery list");
                    }
                }
            });

            li.appendChild(checkbox);
            li.appendChild(label);
            ingredientListEl.appendChild(li);
        });
    }

    // Render instructions
    function renderInstructions() {
        instructionsEl.innerHTML = "";
        recipe.instructions.forEach(step => {
            const li = document.createElement("li");
            li.textContent = step;
            instructionsEl.appendChild(li);
        });
    }

    // Initial render
    renderIngredients(1);
    renderInstructions();

    // Servings dropdown logic
    servingsSelect.addEventListener("change", () => {
        const value = servingsSelect.value;

        if (value === "custom") {
            customServingsInput.style.display = "inline-block";
            return;
        }

        customServingsInput.style.display = "none";
        renderIngredients(parseFloat(value));
    });

    // Custom servings input
    customServingsInput.addEventListener("input", () => {
        const customValue = parseFloat(customServingsInput.value);
        if (!isNaN(customValue) && customValue > 0) {
            renderIngredients(customValue);
        }
    });

    // Add All button
    addAllBtn.addEventListener("click", () => {
        let groceryList = getGroceryList();
        let added = 0;

        const multiplier = servingsSelect.value === "custom"
            ? parseFloat(customServingsInput.value) || 1
            : parseFloat(servingsSelect.value);

        baseIngredients.forEach(ing => {
            const scaledAmount = (ing.amount * multiplier).toFixed(1);
            const item = `${scaledAmount} ${ing.unit} ${ing.item}`;

            if (!groceryList.includes(item)) {
                groceryList.push(item);
                added++;
            }
        });

        saveGroceryList(groceryList);
        showToast(`${added} item(s) added to grocery list`);
    });

    // Back
    backBtn.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    // Delete
    deleteBtn.addEventListener("click", () => {
        if (!confirm("Delete this recipe?")) return;

        const updatedRecipes = recipes.filter(r => r.id !== recipeId);
        localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
        showToast("Recipe deleted!");
        window.location.href = "index.html";
    });
});
