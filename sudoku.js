function randInt(a, b)
{
    return Math.trunc(Math.random() * (b - a + 1) + a);
}

function randInd(arr)
{
    let a = 0;
    let b = arr.length - 1;
    return randInt(a, b);
}

function shuffle(arr)
{
    return arr.sort(() => Math.random - 0.5);
}

function emptyMatrix()
{
    let matrix = [];
    for (let i = 0; i < 9; ++i) matrix.push([0,0,0,0,0,0,0,0,0]);
    return matrix;
}

function column(arr, c)
{
    let col = []
    for (let i = 0; i < 9; ++i) col.push(arr[i][c]);
    return col;
}

function boxNumber(r, c)
{
    let row = Math.trunc(r / 3);
    let col = Math.trunc(c / 3);
    return 3 * row + col;
}

function boxTopLeft(num)
{
    let x = 3 * (num % 3);
    let y = 3 * (Math.trunc(num / 3));
    return [x, y];
}

function box(arr, num)
{
    let box = [];
    c = boxTopLeft(num)[0];
    r = boxTopLeft(num)[1];
    
    for (let n = 0; n < 3; ++n)
    {
        for (let m = 0; m < 3; ++m) box.push(arr[r + n][c + m]);
    }
    return box;
}

function missingDigits(arr)
{
    let missing = [];

    for (let i = 1; i <= 9; ++i)
    {
        if (!(arr.includes(i))) missing.push(i);
    }
    
    return missing;
}

function intersect(arr1, arr2)
{
    let intersection = [];

    for (const el of arr1)
    {
        if (arr2.includes(el)) intersection.push(el);
    }

    return intersection;
}

function isFilled(arr)
{
    if (arr.length == 9 && arr[randInd(arr)].length == 9)
    {
        for (const row of arr)
        {
            if (row.includes(0)) return false;
        }
        return true;
    }
    return false;
}

function isValid(arr)
{
    if (arr.length == 9 && arr[randInd(arr)].length == 9)
    {
        for (let i = 0; i < 9; ++i)
        {
            let rMissing = missingDigits(arr[i]).length;
            let cMissing = missingDigits(column(arr, i)).length;
            let bMissing = missingDigits(box(arr, i)).length;
            if (rMissing + cMissing + bMissing != 0) return false;
        }

        return true;
    }
    return false;
}

function randBox()
{
    let box = [];

    while (box.length < 9)
    {
        let number = randInt(1, 9);
        if (!box.includes(number)) box.push(number);
    }

    return box;
}

function fillDiagonal(arr)
{
    if (arr.length == 9 && arr[randInd(arr)].length == 9)
    {
        for (let b = 0; b < 3; ++b)
        {
            let rBox = randBox();
            for (let r = 0; r < 3; ++r)
            {
                for (let c = 0; c < 3; ++c)
                {
                    let number = rBox[3 * r + c];
                    arr[3 * b + r][3 * b + c] = number;
                }
            }
        }
    }
    return arr;
}

function fillGrid(arr)
{
    if (arr.length == 9 && arr[randInd(arr)].length == 9)
    {
        let row, col;
        for (let cell = 0; cell < 81; ++cell)
        {
            row = Math.trunc(cell / 9);
            col = cell % 9;
            if (arr[row][col] == 0)
            {
                let pool = missingDigits(arr[row]);
                pool = intersect(pool, missingDigits(column(arr, col)));
                pool = intersect(pool, missingDigits(box(arr, boxNumber(row, col))));

                for (let cand = 0; cand < pool.length; ++cand)
                {
                    arr[row][col] = pool[cand];
                    if (isFilled(arr) && isValid(arr)) return arr;
                    else if (fillGrid(arr)) return arr;
                }
                break;
            }
        }
        arr[row][col] = 0;
    }
}

function fillSudoku(arr)
{
    fillDiagonal(arr);
    fillGrid(arr);
    return arr;
}

function createSudoku()
{
    let sudoku = emptyMatrix();
    sudoku = fillSudoku();
    return sudoku;
}