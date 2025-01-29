//Horner’s Method

const hornerMethod = (coefficients: number[], x: number) => {
    let result = coefficients[0];
    for (let i = 1; i < coefficients.length; i++) {
        result = result * x + coefficients[i];
    }
    return result
}

const coefficientsA = [7.54, 11.08, 3.82, 0.44, -0.48]; // Exercise (a)
const coefficientsG = [15.65, 17.58, 21.7, 2.78, 1.34]; // Exercise (g)

const xValue = 3.25;

const resultA = hornerMethod(coefficientsA, xValue);
const resultG = hornerMethod(coefficientsG, xValue);

console.log(`P(x) for Exercise (a) at x = ${xValue} is ${resultA}`);
console.log(`P(x) for Exercise (g) at x = ${xValue} is ${resultG}`);
