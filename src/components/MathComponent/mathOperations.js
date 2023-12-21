function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        throw new Error("Division by zero is not allowed.");
    }
    return a / b;
}

function modulus(a, b) {
    return a % b;
}

function exponentiate(base, exponent) {
    return Math.pow(base, exponent);
}

module.exports = {
    add,
    subtract,
    multiply,
    divide,
    modulus,
    exponentiate
};