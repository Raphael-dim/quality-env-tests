/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable prefer-const */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

import tp1 from '../src/tp1.class';

describe('TP1', () => {
    it('Should convert a number to a string', () => {
        expect(tp1.my_alpha_number_t(1)).toBe('1');
    });

    it('Should return 0 if one of the parameters is not a number', () => {
        expect(tp1.sum('a', 2)).toBe(0);
    });

    it('Should sum two numbers', () => {
        expect(tp1.sum(1, 2)).toBe(3);
    });

    it('Should return 0 if the parameter is not a string', () => {
        expect(tp1.my_size_alpha_t(1)).toBe(0);
    });

    it('Should return the size of a string', () => {
        expect(tp1.my_size_alpha_t('abc')).toBe(3);
    });

    it('Should handle an empty string', () => {
        expect(tp1.my_size_alpha_t('')).toBe(0);
    });

    it('Should return the alphabet', () => {
        expect(tp1.my_display_alpha_t()).toBe('abcdefghijklmnopqrstuvwxyz');
    });

    it('Should return an array of characters', () => {
        expect(tp1.my_array_alpha_t('abc')).toEqual(['a', 'b', 'c']);
    });

    it('Should handle an empty string', () => {
        expect(tp1.my_array_alpha_t('')).toEqual([]);
    });

    it('Should return NEGATIVE if the number is less than or equal to 0', () => {
        expect(tp1.my_is_posi_neg_t(-1)).toBe('NEGATIVE');
    });

    it('Should return POSITIF if the number is greater than 0', () => {
        expect(tp1.my_is_posi_neg_t(1)).toBe('POSITIF');
    });

    it('Should return 0 if the number is less than or equal to 0', () => {
        expect(tp1.fibo(-1)).toBe(0);
    });

    it('Should return 1 if the number is 1 or 2', () => {
        expect(tp1.fibo(1)).toBe(1);
        expect(tp1.fibo(2)).toBe(1);
    });

    it('Should return the fibonacci number', () => {
        expect(tp1.fibo(3)).toBe(2);
        expect(tp1.fibo(4)).toBe(3);
        expect(tp1.fibo(5)).toBe(5);
        expect(tp1.fibo(6)).toBe(8);
    });

    it('Should return the alphabet in reverse', () => {
        expect(tp1.my_display_alpha_reverse_t()).toBe('zyxwvutsrqponmlkjihgfedcba');
    });

    it('Should return the length of an array', () => {
        expect(tp1.my_length_array_t([1, 2, 3])).toBe(3);
    });

    it('Should return a string containing only valid characters based on Unicode ranges', () => {
        const input = [65, 66, 67, 32, 97, 98, 99, 48, 49, 50];
        const expectedOutput = 'ABC abc012';
        expect(tp1.my_display_unicode_t(input)).toBe(expectedOutput);
    });

    it('Should ignore numbers outside the valid ranges', () => {
        const input = [64, 100, 123, 31, 33];
        const expectedOutput = 'd';
        expect(tp1.my_display_unicode_t(input)).toBe(expectedOutput);
    });

    it('Should handle an empty array as input', () => {
        const input = [];
        const expectedOutput = '';
        expect(tp1.my_display_unicode_t(input)).toBe(expectedOutput);
    });

    it('Should handle a mix of valid and invalid numbers', () => {
        const input = [65, 99, 123, 48, 32, 200];
        const expectedOutput = 'Ac0 ';
        expect(tp1.my_display_unicode_t(input)).toBe(expectedOutput);
    });

    it('Should return an empty string for an array of invalid numbers', () => {
        const input = [123, 124, 200, 300];
        const expectedOutput = '';
        expect(tp1.my_display_unicode_t(input)).toBe(expectedOutput);
    });

    it('Should process a single valid number correctly', () => {
        const input = [65];
        const expectedOutput = 'A';
        expect(tp1.my_display_unicode_t(input)).toBe(expectedOutput);
    });

    it('Should process a single invalid number correctly', () => {
        const input = [123];
        const expectedOutput = '';
        expect(tp1.my_display_unicode_t(input)).toBe(expectedOutput);
    });

    it('Should sort an array of numbers in ascending order', () => {
        expect(tp1.quickSort([3, 1, 4, 1, 5, 9])).toEqual([1, 1, 3, 4, 5, 9]);
        expect(tp1.quickSort([])).toEqual([]);
        expect(tp1.quickSort([5])).toEqual([5]);
        expect(tp1.quickSort([2, 1])).toEqual([1, 2]);
        expect(tp1.quickSort([9, 7, 5, 3, 1])).toEqual([1, 3, 5, 7, 9]);
    });

    it('Should handle negative numbers', () => {
        expect(tp1.quickSort([-3, -1, -4, -2])).toEqual([-4, -3, -2, -1]);
    });

    it('Should handle decimal numbers', () => {
        expect(tp1.quickSort([3.5, 1.1, 4.4, 2.2])).toEqual([1.1, 2.2, 3.5, 4.4]);
    });

    it('Should handle a single city', () => {
        const distances = { A: { A: 0 } };
        const result = tp1.tspBrutForce(distances);
        expect(result.minDistance).toBe(0);
        expect(result.meilleurePermutation).toEqual(['A']);
    });

    it('Should handle asymmetric distances', () => {
        const distances = {
            A: { A: 0, B: 10, C: 15 },
            B: { A: 20, B: 0, C: 35 },
            C: { A: 30, B: 25, C: 0 }
        };
        const result = tp1.tspBrutForce(distances);
        expect(result.minDistance).toBeGreaterThan(0); // Vérifie que le résultat est logique
    });

    it('Should find the shortest path and its distance', () => {
        const distances = {
            A: { A: 0, B: 10, C: 15, D: 20 },
            B: { A: 10, B: 0, C: 35, D: 25 },
            C: { A: 15, B: 35, C: 0, D: 30 },
            D: { A: 20, B: 25, C: 30, D: 0 }
        };

        const result = tp1.tspBrutForce(distances);
        expect(result.minDistance).toBe(80); // Known shortest path
        expect(result.meilleurePermutation).toEqual(expect.arrayContaining(['A', 'B', 'D', 'C']));
    });

    it('Should generate all permutations of an array', () => {
        expect(tp1.permuter([1, 2, 3])).toEqual(expect.arrayContaining([
            [1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1],
        ]));
        expect(tp1.permuter([])).toEqual([[]]);
        expect(tp1.permuter([1])).toEqual([[1]]);
    });

    it('Should solve a Sudoku puzzle', () => {
        const grille = [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]
        ];

        const solution = [
            [5, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 5, 3, 4, 8],
            [1, 9, 8, 3, 4, 2, 5, 6, 7],
            [8, 5, 9, 7, 6, 1, 4, 2, 3],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 6, 1, 5, 3, 7, 2, 8, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 4, 5, 2, 8, 6, 1, 7, 9]
        ];

        expect(tp1.resoudreSudoku(grille)).toBe(true);
        expect(grille).toEqual(solution);
    });

    it('Should return false for an unsolvable grid', () => {
        const grille = [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]
        ];
        grille[0][0] = 9; // Provoque une contradiction
        expect(tp1.resoudreSudoku(grille)).toBe(false);
    });

    it('Should handle an already solved Sudoku grid', () => {
        const grille = [
            [5, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 5, 3, 4, 8],
            [1, 9, 8, 3, 4, 2, 5, 6, 7],
            [8, 5, 9, 7, 6, 1, 4, 2, 3],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 6, 1, 5, 3, 7, 2, 8, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 4, 5, 2, 8, 6, 1, 7, 9]
        ];
        expect(tp1.resoudreSudoku(grille)).toBe(true);
        expect(grille).toEqual([
            [5, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 5, 3, 4, 8],
            [1, 9, 8, 3, 4, 2, 5, 6, 7],
            [8, 5, 9, 7, 6, 1, 4, 2, 3],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 6, 1, 5, 3, 7, 2, 8, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 4, 5, 2, 8, 6, 1, 7, 9]
        ]);
    });

    it('Should validate if a number can be placed in a specific position in Sudoku', () => {
        const grille = [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]
        ];

        expect(tp1.estValide(grille, 0, 2, 4)).toBe(true); // Valid placement
        expect(tp1.estValide(grille, 0, 2, 3)).toBe(false); // Invalid placement
    });
});
