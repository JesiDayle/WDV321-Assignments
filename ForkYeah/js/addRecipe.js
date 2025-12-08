import { storage } from "./displayRecipes.js";
import { showToast } from "./toast.js";

// --- Get form & URL param ---
const form = document.getElementById("addRecipeForm");
const urlParams = new URLSearchParams(window.location.search);
const editId = urlParams.get("id");

let recipeToEdit = null;
if (editId) {
    recipeToEdit = storage.getRecipes().find(r => r.id === editId);
    document.getElementById("formTitle").textContent = "Edit Recipe";
}

// --- Containers & buttons ---
const ingContainer = document.getElementById("ingredientsContainer");
const instContainer = document.getElementById("instructionsContainer");
const addIngBtn = document.getElementById("addIngredientBtn");
const addInstBtn = document.getElementById("addInstructionBtn");

// --- Functions to add rows ---
function addIngredientRow(amount = "", unit = "", item = "") {
    const row = document.createElement("div");
    row.className = "dynamic-group ingredient-row";

    row.innerHTML = `
        <input type="number" placeholder="Amount" class="ing-amount" value="${amount}">
        <input type="text" placeholder="Unit" class="ing-unit" value="${unit}">
        <input type="text" placeholder="Ingredient" class="ing-item" value="${item}">
        <button type="button" class="removeIngBtn remove-btn">❌</button>
    `;

    row.querySelector(".removeIngBtn").addEventListener("click", () => row.remove());
    ingContainer.appendChild(row);
}

function addInstructionRow(text = "") {
    const row = document.createElement("div");
    row.className = "dynamic-group instruction-row";

    row.innerHTML = `
        <input type="text" class="inst-text" placeholder="Instruction step" value="${text}">
        <button type="button" class="removeInstBtn remove-btn">❌</button>
    `;

    row.querySelector(".removeInstBtn").addEventListener("click", () => row.remove());
    instContainer.appendChild(row);
}

// --- Button events ---
addIngBtn.addEventListener("click", () => addIngredientRow());
addInstBtn.addEventListener("click", () => addInstructionRow());

// --- Prefill if editing ---
if (recipeToEdit) {
    document.getElementById("recipeTitle").value = recipeToEdit.name;
    document.getElementById("recipeImage").value = recipeToEdit.image;
    document.getElementById("servings").value = recipeToEdit.servings;
    document.getElementById("time").value = recipeToEdit.time;
    document.getElementById("difficulty").value = recipeToEdit.difficulty;

    recipeToEdit.ingredients.forEach(i => addIngredientRow(i.amount || "", i.unit || "", i.item));
    recipeToEdit.instructions.forEach(step => addInstructionRow(step));
} else {
    addIngredientRow();
    addInstructionRow();
}

// --- Submit form ---
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const ingredients = [...document.querySelectorAll(".ingredient-row")].map(row => ({
        amount: parseFloat(row.querySelector(".ing-amount").value) || "",
        unit: row.querySelector(".ing-unit").value,
        item: row.querySelector(".ing-item").value
    }));

    const instructions = [...document.querySelectorAll(".instruction-row")].map(row =>
        row.querySelector(".inst-text").value
    );

    const recipeData = {
        id: editId || Date.now().toString(),
        name: document.getElementById("recipeTitle").value,
        image: document.getElementById("recipeImage").value || "images/placeholder.png",
        servings: parseInt(document.getElementById("servings").value),
        time: document.getElementById("time").value,
        difficulty: document.getElementById("difficulty").value,
        ingredients,
        instructions
    };

    if (editId) {
        storage.addRecipe(recipeData); 
        showToast("Recipe updated!");
    } else {
        storage.addRecipe(recipeData);
        showToast("Recipe added!");
    }

    setTimeout(() => window.location.href = "index.html", 500);
});
