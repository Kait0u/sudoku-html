let diff = 1;
let answer = createSudoku();
let board;
let unknowns = 0;


function generateTable(board)
{
    let content = "";

    for (let row of board)
    {
        let contRow = "<tr>"
        for (let n of row)
        {
            let field = "<td>";
            if (n == 0)
            {
                field += "<input type='number' min='1' max='9'>";
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


window.onload = function()
{
    board = difficulty(answer, diff);
    let content = generateTable(board);
    document.getElementById("sudoku").innerHTML = content;
}