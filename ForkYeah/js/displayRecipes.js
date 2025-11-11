$(document).ready(function () {

    // Retrieve recipes from localStorage
    let storedRecipes = localStorage.getItem('recipes');
    let recipes = storedRecipes ? JSON.parse(storedRecipes) : [];

    const container = $('#recipeContainer');

    // Placeholder sample recipe if none exist
    if (recipes.length === 0) {
        recipes = [
            {
                name: "Crockpot Chili",
                image: "images/placeholder.png",
                servings: 6,
                prepTime: "25 min",
                cookTime: "6 hr",
                difficulty: "Medium",
                ingredients: [
                    { qty: 2, item: "tbsp cooking oil" },
                    { qty: 1, item: "cup onion" },
                    { qty: 1, item: "cup chopped peppers" },
                    { qty: 4, item: "tbsp chili powder" },
                    { qty: 1, item: "lb ground beef or chicken" },
                ],
                instructions: [
                    "Heat cooking oil in 2 quart skillet.",
                    "Saute onions and peppers for 5 minutes.",
                    "Add spices and stir for 30 seconds.",
                    "Add meat and cook until browned. Approximately 15 minutes.",
                    "Pour contents of skillet into 3 quart crock pot.",
                    "Rinse beans and place in crockpot.",
                    "Open and pour Tomato puree and sauce into crock pot.",
                    "Cover crockpot and cook on low for 6 hours.",
                    "Serve into individual bowls and top with sour cream and cheese."
                ]
            }
        ];
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }

    // Render all recipes
    function renderRecipes() {
        container.empty();

        recipes.forEach((recipe, index) => {
            const card = $(`
                <div class="recipeCard">
                    <h3>${recipe.name}</h3>
                    <img src="${recipe.image}" alt="${recipe.name}" class="recipeImage" onerror="this.onerror=null;this.src='images/placeholder.png';">
                    <p>Servings: 
                        <select class="servingsDropdown" data-index="${index}">
                            <option value="1" selected>Normal (${recipe.servings})</option>
                            <option value="0.5">Half</option>
                            <option value="2">Double</option>
                        </select>
                    </p>
                    <p>Prep Time: ${recipe.prepTime}</p>
                    <p>Cook Time: ${recipe.cookTime}</p>
                    <p>Difficulty: ${recipe.difficulty}</p>
                    <button class="showIngredients" data-index="${index}">Show Ingredients</button>
                    <div class="ingredientsList" id="ingredients-${index}" style="display:none;">
                        <ul>
                            ${recipe.ingredients.map(i => 
                                `<li data-qty="${i.qty}">
                                    ${i.qty} ${i.item}
                                    <button class="addToGrocery" data-ingredient="${i.item}">Add to Grocery List</button>
                                </li>`
                            ).join('')}
                        </ul>
                        <button class="addAllToGrocery" data-index="${index}">Add All to Grocery List</button>
                    </div>
                    <button class="showInstructions" data-index="${index}">Show Instructions</button>
                    <div class="instructionsList" id="instructions-${index}" style="display:none;">
                        <ol>
                            ${recipe.instructions.map(step => `<li>${step}</li>`).join('')}
                        </ol>
                    </div>
                </div>
            `);

            container.append(card);
        });
    }

    renderRecipes();

    // Toggle Ingredients
    $(document).on('click', '.showIngredients', function () {
        let idx = $(this).data('index');
        $(`#ingredients-${idx}`).slideToggle();
    });

    // Toggle Instructions
    $(document).on('click', '.showInstructions', function () {
        let idx = $(this).data('index');
        $(`#instructions-${idx}`).slideToggle();
    });

    // Add single ingredient to Grocery List
    $(document).on('click', '.addToGrocery', function () {
        let ingredient = $(this).data('ingredient');
        let groceryList = JSON.parse(localStorage.getItem('groceryList')) || [];
        if (!groceryList.includes(ingredient)) groceryList.push(ingredient);
        localStorage.setItem('groceryList', JSON.stringify(groceryList));
        alert(`${ingredient} added to Grocery List!`);
    });

    // Add all ingredients to Grocery List
    $(document).on('click', '.addAllToGrocery', function () {
        let idx = $(this).data('index');
        let groceryList = JSON.parse(localStorage.getItem('groceryList')) || [];
        recipes[idx].ingredients.forEach(i => {
            if (!groceryList.includes(i.item)) groceryList.push(i.item);
        });
        localStorage.setItem('groceryList', JSON.stringify(groceryList));
        alert('All ingredients added to Grocery List!');
    });

    // Update ingredient quantities based on servings
    $(document).on('change', '.servingsDropdown', function () {
        let idx = $(this).data('index');
        let multiplier = parseFloat($(this).val());
        recipes[idx].ingredients.forEach((i, iIndex) => {
            const li = $(`#ingredients-${idx} ul li`).eq(iIndex);
            li.text(`${(i.qty * multiplier).toFixed(2)} ${i.item}`);
            li.append(`<button class="addToGrocery" data-ingredient="${i.item}">Add to Grocery List</button>`);
        });
    });

    // Reset recipes and grocery list
    $(document).on('click', '#resetRecipes', function () {
        if (confirm("Are you sure you want to reset all recipes and grocery lists?")) {
            localStorage.removeItem('recipes');
            localStorage.removeItem('groceryList');
            location.reload();
        }
    });

});
