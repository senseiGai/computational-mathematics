function choleskyDecomposition(A: number[][]): number[][] {
    const n = A.length;
    const L: number[][] = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j <= i; j++) {
            let sum = 0;

            for (let k = 0; k < j; k++) {
                sum += L[i][k] * L[j][k];
            }

            if (i === j) {
                L[i][j] = Math.sqrt(A[i][i] - sum);
            } else {
                L[i][j] = (A[i][j] - sum) / L[j][j];
            }
        }
    }
    return L;
}

function forwardSubstitution(L: number[][], b: number[]): number[] {
    const n = b.length;
    const y: number[] = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        let sum = 0;
        for (let j = 0; j < i; j++) {
            sum += L[i][j] * y[j];
        }
        y[i] = (b[i] - sum) / L[i][i];
    }
    return y;
}

function backwardSubstitution(LT: number[][], y: number[]): number[] {
    const n = y.length;
    const x: number[] = new Array(n).fill(0);

    for (let i = n - 1; i >= 0; i--) {
        let sum = 0;
        for (let j = i + 1; j < n; j++) {
            sum += LT[i][j] * x[j];
        }
        x[i] = (y[i] - sum) / LT[i][i];
    }
    return x;
}

function solveCholesky(A: number[][], b: number[]): number[] {
    const L = choleskyDecomposition(A);
    const y = forwardSubstitution(L, b);
    const LT = L.map((row, i) => row.map((_, j) => L[j][i]));
    return backwardSubstitution(LT, y);
}

// const A = [
//     [5.68, 1.12, 0.95, 1.32, 0.83],
//     [1.12, 3.78, 2.12, 0.57, 0.91],
//     [0.95, 2.12, 6.63, 1.29, 1.57],
//     [1.32, 0.57, 1.29, 4.07, 1.25],
//     [0.83, 0.91, 1.57, 1.25, 5.71],
// ];

// const b = [7.24, 3.21, 3.23, 6.25, 6.00];

// const solution = solveCholesky(A, b);
// console.log("Solution:", solution);
