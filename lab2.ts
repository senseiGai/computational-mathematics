type Matrix = number[][];
type Vector = number[];

function gaussianElimination(A: Matrix, b: Vector): Vector {
    const n = b.length;

    for (let i = 0; i < n; i++) {
        if (A[i][i] === 0) {
            let swapped = false;
            for (let k = i + 1; k < n; k++) {
                if (A[k][i] !== 0) {
                    [A[i], A[k]] = [A[k], A[i]];
                    [b[i], b[k]] = [b[k], b[i]];
                    swapped = true;
                    break;
                }
            }
            if (!swapped) {
                throw new Error("Singular matrix detected. Cannot proceed.");
            }
        }

        for (let j = i + 1; j < n; j++) {
            const factor = A[j][i] / A[i][i];
            for (let k = i; k < n; k++) {
                A[j][k] -= factor * A[i][k];
            }
            b[j] -= factor * b[i];
        }
    }

    const x: Vector = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
        let sum = 0;
        for (let j = i + 1; j < n; j++) {
            sum += A[i][j] * x[j];
        }
        x[i] = (b[i] - sum) / A[i][i];
    }

    return x;
}

const alphaValues = Array.from({ length: 5 }, (_, k) => 0.2 * k);
const betaValues = Array.from({ length: 6 }, (_, k) => 0.2 * k);

for (const alpha of alphaValues) {
    for (const beta of betaValues) {
        const A: Matrix = [
            [8.30, 2.62 + alpha, 4.10, 1.90],
            [3.92, 8.45, 7.78 - alpha, 2.46],
            [3.77, 7.21 + alpha, 8.04, 2.28],
            [2.21, 3.65 - alpha, 1.69, 6.99]
        ];

        const b: Vector = [
            -10.65 + beta,
            12.21,
            15.45 - beta,
            -8.35
        ];

        try {
            const solution = gaussianElimination(A.map(row => [...row]), [...b]);
            console.log(`Solution for alpha=${alpha}, beta=${beta}:`, solution);
        } catch (error) {
            if (error instanceof Error) {
                console.log(`For alpha=${alpha}, beta=${beta}:`, error.message);
            } else {
                console.log(`For alpha=${alpha}, beta=${beta}: An unknown error occurred.`);
            }
        }
    }
}
