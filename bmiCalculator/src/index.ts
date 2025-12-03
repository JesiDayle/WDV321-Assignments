window.addEventListener("DOMContentLoaded", () => {
    // Select DOM elements
    const weightInput = document.getElementById("weight") as HTMLInputElement;
    const heightFeetInput = document.getElementById("heightFeet") as HTMLInputElement;
    const heightInchesInput = document.getElementById("heightInches") as HTMLInputElement;
    const calculateBtn = document.getElementById("calculateBtn") as HTMLButtonElement;
    const clearBtn = document.getElementById("clearBtn") as HTMLButtonElement;
    const resultDiv = document.getElementById("result") as HTMLDivElement;

    // Function to validate input
    function validateInput(value: string): boolean {
        const num = Number(value);
        return !isNaN(num) && num > 0;
    }

    // Function to calculate BMI
    function calculateBMI(weightLbs: number, feet: number, inches: number): number {
        const heightInches = feet * 12 + inches;
        return (weightLbs / (heightInches * heightInches)) * 703;
    }

    // Function to get BMI category and color
    function getBMICategory(bmi: number): { category: string; color: string } {
        if (bmi < 18.5) return { category: "Underweight", color: "blue" };
        else if (bmi < 25) return { category: "Normal", color: "green" };
        else if (bmi < 30) return { category: "Overweight", color: "orange" };
        else return { category: "Obese", color: "red" };
    }

    // Event: Calculate BMI
calculateBtn.addEventListener("click", () => {
    const weight = weightInput.value.trim();
    const feet = heightFeetInput.value.trim();
    const inches = heightInchesInput.value.trim();

    // Reset previous highlights
    weightInput.style.borderColor = "";
    heightFeetInput.style.borderColor = "";
    heightInchesInput.style.borderColor = "";
    resultDiv.textContent = "";

    let valid = true;
    let errorMessages: string[] = [];

    // Validate weight
    const weightNum = Number(weight);
    if (!validateInput(weight) || weightNum > 999) {
        weightInput.style.borderColor = "red";
        valid = false;
        errorMessages.push("Weight must be 1-999 lbs.");
    }

    // Validate height feet
    const feetNum = Number(feet);
    if (!validateInput(feet) || feetNum > 8) {
        heightFeetInput.style.borderColor = "red";
        valid = false;
        errorMessages.push("Height (feet) must be 1-8.");
    }

    // Validate height inches
    const inchesNum = Number(inches);
    if (inches === "" || isNaN(inchesNum) || inchesNum < 0 || inchesNum > 11) {
        heightInchesInput.style.borderColor = "red";
        valid = false;
        errorMessages.push("Height (inches) must be 0-11.");
    }

    if (!valid) {
        resultDiv.textContent = errorMessages.join(" ");
        resultDiv.style.color = "red";
        return;
    }

    const bmi = calculateBMI(weightNum, feetNum, inchesNum);
    const { category, color } = getBMICategory(bmi);

    resultDiv.textContent = `Your BMI is ${bmi.toFixed(1)} (${category}). Ideal BMI: 18.5 - 24.9`;
    resultDiv.style.color = color;
});

// Event: Clear Form
    clearBtn.addEventListener("click", () => {
        weightInput.value = "";
        heightFeetInput.value = "";
        heightInchesInput.value = "";
        resultDiv.textContent = "";
        weightInput.style.borderColor = "";
        heightFeetInput.style.borderColor = "";
        heightInchesInput.style.borderColor = "";
    });
});
