// Zeidels method


function seidelMethod(
    A: number[][],
    b: number[],
    epsilon: number,
    maxIterations: number = 100
): { solution: number[]; iterations: number } {
    const n = A.length;
    let x: number[] = new Array(n).fill(0);
    let xNew: number[] = [...x];
    let iterations = 0;

    for (iterations = 0; iterations < maxIterations; iterations++) {
        let maxDiff = 0;

        for (let i = 0; i < n; i++) {
            let sum1 = 0, sum2 = 0;
            for (let j = 0; j < i; j++) sum1 += A[i][j] * xNew[j];
            for (let j = i + 1; j < n; j++) sum2 += A[i][j] * x[j];

            xNew[i] = (b[i] - sum1 - sum2) / A[i][i];
            maxDiff = Math.max(maxDiff, Math.abs(xNew[i] - x[i]));
        }

        if (maxDiff < epsilon) break;
        x = [...xNew];
    }

    return { solution: xNew, iterations };
}

const A = [
    [24.21, 2.42, 3.85],
    [2.31, 31.49, 1.52],
    [3.49, 4.85, 28.72]
];
const b = [30.24, 40.95, 42.81];
const epsilon = 1e-4;

const { solution, iterations } = seidelMethod(A, b, epsilon);

console.log(`Solution found in ${iterations} iterations:`);
console.log(`x1 = ${solution[0].toFixed(6)}`);
console.log(`x2 = ${solution[1].toFixed(6)}`);
console.log(`x3 = ${solution[2].toFixed(6)}`);
