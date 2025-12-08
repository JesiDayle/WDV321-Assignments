// ---------- STORAGE.JS ----------

const storage = {
    // Get all recipes from LocalStorage
    getRecipes: function() {
        const stored = localStorage.getItem("recipes");
        return stored ? JSON.parse(stored) : [];
    },

    // Save recipes array to LocalStorage
    saveRecipes: function(recipes) {
        localStorage.setItem("recipes", JSON.stringify(recipes));
    },

    // Add a new recipe
    addRecipe: function(recipe) {
        const recipes = this.getRecipes();
        recipes.push(recipe);
        this.saveRecipes(recipes);
    },

    // Update an existing recipe by ID
    updateRecipe: function(updatedRecipe) {
        const recipes = this.getRecipes().map(r => r.id === updatedRecipe.id ? updatedRecipe : r);
        this.saveRecipes(recipes);
    },

    // Delete a recipe by ID
    deleteRecipe: function(id) {
        const recipes = this.getRecipes().filter(r => r.id !== id);
        this.saveRecipes(recipes);
    },

    // Initialize LocalStorage with default recipes if empty
    initializeRecipes: function(defaultRecipes) {
        if (!localStorage.getItem("recipes")) {
            this.saveRecipes(defaultRecipes);
        }
    }
};

