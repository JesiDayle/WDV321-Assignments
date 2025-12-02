var expect = require('chai').expect;
var validateComparison = require('../app/validateComparison');

describe("validateComparison Tests", function() {

    it("5 and 6 should return 6", function() {
        expect(validateComparison(5, 6)).to.equal(6);
    });

    it("4 and 3 should return 4", function() {
        expect(validateComparison(4, 3)).to.equal(4);
    });

    it("3 and 3 should return 'The amounts are equal'", function() {
        expect(validateComparison(3, 3)).to.equal("The amounts are equal");
    });

    it("'a' and 5 should return 'Please enter a number in Value 1'", function() {
        expect(validateComparison("a", 5)).to.equal("Please enter a number in Value 1");
    });

    it("5 and 'a' should return 'Please enter a number in Value 2'", function() {
        expect(validateComparison(5, "a")).to.equal("Please enter a number in Value 2");
    });

    it("empty string and 5 should return 'Please enter a number in Value 1'", function() {
        expect(validateComparison("", 5)).to.equal("Please enter a number in Value 1");
    });

    it("5 and empty string should return 'Please enter a number in Value 2'", function() {
        expect(validateComparison(5, "")).to.equal("Please enter a number in Value 2");
    });

    it("-1 and 5 should return 5", function() {
        expect(validateComparison(-1, 5)).to.equal(5);
    });

    it("+34 and -30 should return 34", function() {
        expect(validateComparison("+34", -30)).to.equal(34);
    });

    it("-5 and -6 should return -5", function() {
        expect(validateComparison(-5, -6)).to.equal(-5);
    });

    it("5 and -1 should return 5", function() {
        expect(validateComparison(5, -1)).to.equal(5);
    });

    it("1.5 and 2 should return 2", function() {
        expect(validateComparison(1.5, 2)).to.equal(2);
    });

    it("2 and 1.5 should return 2", function() {
        expect(validateComparison(2, 1.5)).to.equal(2);
    });

    it("3/4 and 1 should return 'Please enter a number in Value 1'", function() {
        expect(validateComparison("3/4", 1)).to.equal("Please enter a number in Value 1");
    });

    it("5b and 3 should return 'Please enter a number in Value 1'", function() {
        expect(validateComparison("5b", 3)).to.equal("Please enter a number in Value 1");
    });

    it("3 and 5b should return 'Please enter a number in Value 2'", function() {
        expect(validateComparison(3, "5b")).to.equal("Please enter a number in Value 2");
    });
});
