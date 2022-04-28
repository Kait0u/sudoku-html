let diff = 1;
let answer;
let board;
let unknowns = 0;
let cells = 0;
let unknownsDict = {};

function reset(d)
{
    diff = d;
    answer = createSudoku();
    unknowns = 0;
    cells = 0;
    const temp = JSON.parse(JSON.stringify(answer)); 
    board = difficulty(answer, diff); 
    let content = generateTable(board);
    answer = [...temp];
    document.getElementById("sudoku").innerHTML = content;
    genUnknowns();

    setButtonCol(d);
    tableStyleInitialize();
}

function resetWithoutRegen()
{
    cells = 0;
    let content = generateTable(board);
    document.getElementById("sudoku").innerHTML = content;
    tableStyleInitialize();
}

function setButtonCol(d)
{
    let clr = "#";
    switch (d)
    {
        case 0:
            clr += "4B974B";
            break;
        case 1:
            clr += "F5CD30";
            break; 
        case 2:
            clr += "E29B40";
            break;
        case 3:
            clr += "FF0000";
            break;
    }
    for (let butt of document.getElementsByClassName("diffButton")) butt.style.backgroundColor = "white";
    document.getElementById("diff" + d).style.backgroundColor = clr;
}

function generateTable(board)
{
    let content = "";

    for (let row of board)
    {
        let contRow = "<tr>"
        for (let n of row)
        {
            let field = "<td id='cell" + cells++ + "'>";
            if (n == 0)
            {
                field += "<input type='text' maxlength='1' id='unk"+ unknowns +"'>";
                ++unknowns;
            }
            else
            {
                field += n;
            }
            field += "</td>";
            contRow += field;
        }
        contRow += "</tr>";
        content += contRow;
    }
    return content;
}

function tableStyleInitialize()
{
    let brdr = "0.15rem solid";
    for (let cellNo = 0; cellNo < cells; ++cellNo)
    {
        let row = Math.trunc(cellNo / 9);
        let col = cellNo % 9;
        let cell = document.getElementById("cell" + cellNo);
        if (row % 3 == 2) cell.style.borderBottom = brdr;
        if (!(row % 3)) cell.style.borderTop = brdr;
        if (col % 3 == 2) cell.style.borderRight = brdr;
        if (!(col % 3)) cell.style.borderLeft = brdr;
    }
}

function genUnknowns()
{
    let unknownsList = [];
    for (let r = 0; r < answer.length; ++r)
    {
        for (let c = 0; c < answer[r].length; ++c)
        {
            if (board[r][c] == 0) unknownsList.push(answer[r][c]);
        }
    }

    for (let i = 0; i < unknowns; ++i) unknownsDict["unk" + i] = unknownsList[i];
}

function check()
{
    let wrong = 0;
    let inputs = document.getElementsByTagName("input");
    let fPar;

    for (let inp of Object.entries(unknownsDict))
    {
        let inpField = document.getElementById(inp[0]);
        if (inpField == null) continue;
        if (inpField) fPar = inpField.parentElement;

        if (inpField.value == inp[1])
        {
            fPar.innerHTML = inp[1];
            fPar.style.backgroundColor = "#4B974B";
        }
        else
        {
            fPar.style.backgroundColor = "#FF0000";
            ++wrong;
        }
    }

    if (wrong == 0)
    {
        alert("Congratulations! You made it!");
        reset(diff);
    }
}

window.onload = function()
{
    reset(1);
    tableStyleInitialize();
}