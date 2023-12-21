const math = require('./mathOperations');

describe('mathOperations', () => {

    it('should return the correct result for addition', () => {
        // Arrange
        const a = 123;
        const b = 456;
        const expectedSum = 579;

        // Act
        const sum = math.add(a, b);

        // Assert
        expect(sum).toBe(expectedSum);
    });

    it('should correctly add a negative and a positive number', () => {
        // Arrange
        const a = -32;
        const b = 64;
        const expectedSum = 32;

        // Act
        const sum = math.add(a, b);

        // Assert
        expect(sum).toBe(expectedSum);
    });


    it('should return the correct result for subtraction', () => {
        // Arrange
        const a = 1000;
        const b = 333;
        const expectedDifference = 667;

        // Act
        const difference = math.subtract(a, b);

        // Assert
        expect(difference).toBe(expectedDifference);
    });

    it('should correctly subtract a number from a negative number', () => {
        // Arrange
        const a = -150;
        const b = 50;
        const expectedDifference = -200;

        // Act
        const difference = math.subtract(a, b);

        // Assert
        expect(difference).toBe(expectedDifference);
    });


    it('should return the correct result for multiplication', () => {
        // Arrange
        const a = 12;
        const b = 11;
        const expectedProduct = 132;

        // Act
        const product = math.multiply(a, b);

        // Assert
        expect(product).toBe(expectedProduct);
    });

    it('should correctly multiply two negative numbers', () => {
        // Arrange
        const a = -7;
        const b = 8;
        const expectedProduct = -56;

        // Act
        const product = math.multiply(a, b);

        // Assert
        expect(product).toBe(expectedProduct);
    });


    it('should return the correct result for division', () => {
        // Arrange
        const a = 144;
        const b = 12;
        const expectedQuotient = 12;

        // Act
        const quotient = math.divide(a, b);

        // Assert
        expect(quotient).toBe(expectedQuotient);
    });

    it('should correctly divide a negative number by a positive number', () => {
        // Arrange
        const a = -100;
        const b = 25;
        const expectedQuotient = -4;

        // Act
        const quotient = math.divide(a, b);

        // Assert
        expect(quotient).toBe(expectedQuotient);
    });

    it('should throw an error on division by 0', () => {
        // Arrange
        const a = 1;
        const b = 0;

        // Act & Assert
        expect(() => {
            math.divide(a, b);
        }).toThrow("Division by zero is not allowed.");
    });


    it('should return the correct result for modulus', () => {
        // Arrange
        const a = 101;
        const b = 10;
        const expectedModulus = 1;

        // Act
        const modulus = math.modulus(a, b);

        // Assert
        expect(modulus).toBe(expectedModulus);
    });

    it('should correctly find the modulus of two numbers', () => {
        // Arrange
        const a = 77;
        const b = 6;
        const expectedModulus = 5;

        // Act
        const modulus = math.modulus(a, b);

        // Assert
        expect(modulus).toBe(expectedModulus);
    });


    it('should return the correct result for exponentiation', () => {
        // Arrange
        const base = 3;
        const exponent = 4;
        const expectedValue = 81;

        // Act
        const value = math.exponentiate(base, exponent);

        // Assert
        expect(value).toBe(expectedValue);
    });

    it('should correctly exponentiate a number', () => {
        // Arrange
        const base = 7;
        const exponent = 2;
        const expectedValue = 49;

        // Act
        const value = math.exponentiate(base, exponent);

        // Assert
        expect(value).toBe(expectedValue);
    });
});
