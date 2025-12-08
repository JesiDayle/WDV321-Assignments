import { showToast } from "./toast.js";

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("groceryListContainer");
    const clearBtn = document.getElementById("clearGrocery");

    function getGroceryList() {
        return JSON.parse(localStorage.getItem("groceryList")) || [];
    }

    function saveGroceryList(list) {
        localStorage.setItem("groceryList", JSON.stringify(list));
    }

    function renderGroceryList() {
        container.innerHTML = "";
        const groceryList = getGroceryList();

        groceryList.forEach((item, index) => {
            const li = document.createElement("li");
            li.className = "grocery-item";
            li.style.display = "flex";
            li.style.alignItems = "center";
            li.style.justifyContent = "space-between";
            li.style.padding = "5px 0";

            const label = document.createElement("label");
            label.style.display = "flex";
            label.style.alignItems = "center";
            label.style.gap = "10px";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = false;
            checkbox.addEventListener("change", () => {
                li.style.textDecoration = checkbox.checked ? "line-through" : "none";
            });

            const span = document.createElement("span");
            span.textContent = item;

            label.appendChild(checkbox);
            label.appendChild(span);

            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.className = "btn-danger";
            removeBtn.addEventListener("click", () => {
                groceryList.splice(index, 1);
                saveGroceryList(groceryList);
                renderGroceryList();
                showToast("Item removed from grocery list!");
            });

            li.appendChild(label);
            li.appendChild(removeBtn);
            container.appendChild(li);
        });
    }

    clearBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to clear the grocery list?")) {
            saveGroceryList([]);
            renderGroceryList();
            showToast("Grocery list cleared!");
        }
    });

    renderGroceryList();
});
