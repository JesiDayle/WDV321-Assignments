// Only create recipes if not already in localStorage
if (!localStorage.getItem('recipes')) {

    let recipes = [
        {
            name: "Crockpot Chili",
            image: "images/placeholder.jpg",
            servings: 6,
            prepTime: "25 min",
            cookTime: "6 hr",
            difficulty: "Medium",
            ingredients: [
                { qty: "2 tbsp", item: "cooking oil" },
                { qty: "1 cup", item: "onion" },
                { qty: "1 cup", item: "chopped peppers" },
                { qty: "4 tbsp", item: "Chili powder" },
                { qty: "1 tsp", item: "Hot chili powder (optional)" },
                { qty: "1 lb", item: "ground beef or chicken" },
                { qty: "2 cans", item: "Red Beans" },
                { qty: "2 cans", item: "Kidney Beans" },
                { qty: "2 cans", item: "Tomato Puree" },
                { qty: "2 cans", item: "Tomato Sauce" },
                { qty: "1 cup", item: "shredded cheese (optional)" },
                { qty: "1/2 cup", item: "sour cream (optional)" }
            ],
            instructions: [
                "Heat cooking oil in 2 quart skillet.",
                "Saute onions and peppers for 5 minutes.",
                "Add spices and stir for 30 seconds.",
                "Add meat and cook until browned (about 15 minutes).",
                "Pour contents of skillet into 3 quart crock pot.",
                "Rinse beans and place in crockpot.",
                "Add tomato puree and sauce.",
                "Cover crockpot and cook on low for 6 hours.",
                "Serve into bowls and top with sour cream and cheese."
            ]
        }
        // Add more recipes here later
    ];

    // Save to localStorage
    localStorage.setItem('recipes', JSON.stringify(recipes));
}
