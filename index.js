const container = document.getElementById("grid_div");
let rows = document.getElementsByClassName("gridRow");
let cells = document.getElementsByClassName("bit");
var result = document.getElementById("result_div");

document.getElementById("gen_button").onclick = function () {
    let x_res = document.getElementById("x_resolution").value;
    let y_res = document.getElementById("y_resolution").value;
    remove_grid();
    result.innerText = " ";
    make_grid(x_res, y_res);

    for(let i = 0; i < cells.length; i++)
    {
        cells[i].onclick = function()
        {
            if(document.getElementById("bit_" + i).style.backgroundColor == "black")
            {
                document.getElementById("bit_" + i).style.backgroundColor = "white";
            }
            else
            {
                document.getElementById("bit_" + i).style.backgroundColor = "black";
            }
        }
    }
};

function validate(evt) 
{
    var theEvent = evt || window.event;

    if (theEvent.type === 'paste')
    {
        key = event.clipboardData.getData('text/plain');
    }
    else 
    {
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) 
    {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
    }
}

function remove_grid()
{
    removeChildren(".gridRow", document.body);
} 

function removeChildren(cssSelector, parentNode){
    var elements = parentNode.querySelectorAll(cssSelector);
    let fragment = document.createDocumentFragment(); 
    fragment.textContent=' ';
    fragment.firstChild.replaceWith(...elements);
}

function make_grid( x_res,  y_res) 
{
    makeRows(x_res);
    makeColumns(y_res);
}

function makeRows(rowNum) {
    //Creates rows
    for (r = 0; r < rowNum; r++) {
        let row = document.createElement("div");
        container.appendChild(row).className = "gridRow";
    }; 
};

//Creates columns
function makeColumns(cellNum) {
    let id = 0;
    console.log(rows);
    console.log(cellNum);
    for (i = 0; i < rows.length; i++) 
    {
        for (j = 0; j < cellNum; j++) 
        {
            let newCell = document.createElement("div");
            rows[i].appendChild(newCell).className = "bit";
            rows[i].appendChild(newCell).id = "bit_" + id++;
        };

    };
};

document.getElementById("Output_button").onclick = function () {
    result.innerText = " ";
    let out_string = "{";
    out_string += (" 0x" + ((document.getElementById("bit_0").style.backgroundColor == "black") ? "00" : "FF")); 
    for(let i = 1; i < cells.length; i++)
    {
        out_string += (", 0x" + ((document.getElementById("bit_" + i).style.backgroundColor == "black") ? "00" : "FF")); 
    }
    out_string += " };"
    
    result.innerText += out_string;
};
