/*
WDV321 Advanced JavaScript
UNIT-8 TDD Using Mocha/Chai Automated Testing

Assignment: 8-1 Develop and test the attached test plan.

Test Plan - input two numbers, compare them and display the larger of the two

Value1   Value2   Expected Result
5        6        6
4        3        4
3        3        "The amounts are equal"
a        5        "Please enter a number in Value 1"
5        a        "Please enter a number in Value 2"
""       5        "Please enter a number in Value 1"
5        ""       "Please enter a number in Value 2"
-1       5        5
+34      -30      34
-5       -6       -5
5        -1       5
1.5      2        2
2        1.5      2
3/4      1        "Please enter a number in Value 1"
5b       3        "Please enter a number in Value 1"
3        5b       "Please enter a number in Value 2"
""       5        "Please enter a number in Value 1"
5        ""       "Please enter a number in Value 2"
*/

function validateComparison(value1, value2) {

    // Helper: valid number is integer or decimal only, no fractions like 3/4 or letters
    const isValidNumber = (val) => {
        if (val === "" || val === null || val === undefined) return false;
        if (String(val).includes("/")) return false; // reject fractions
        return !isNaN(val); // numeric check
    };

    if (!isValidNumber(value1)) {
        return "Please enter a number in Value 1";
    }

    if (!isValidNumber(value2)) {
        return "Please enter a number in Value 2";
    }

    const num1 = Number(value1);
    const num2 = Number(value2);

    if (num1 === num2) {
        return "The amounts are equal";
    }

    return num1 > num2 ? num1 : num2;
}

module.exports = validateComparison;