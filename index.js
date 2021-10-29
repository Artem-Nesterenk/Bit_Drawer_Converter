let rows = document.getElementsByClassName("gridRow");
let cells = document.getElementsByClassName("bit");
var result = document.getElementById("result_div");
const container = document.getElementById("grid_div");

/* CALLBACKS FOR BUTTONS */

//callback for result generating
document.getElementById("output_button").onclick = function () 
{
    var out = [];
    var bit = 0;
    let x_res = document.getElementById("x_resolution").value;
    let y_res = document.getElementById("y_resolution").value;
        let bit_arr = [];
        let tmp_arr = [];
    for(let mem_part = 0; mem_part < x_res / 8; mem_part++)
    {
        for(let x_cord = 0; x_cord < y_res; x_cord++)
        {
            for(let y_cord = 0; y_cord < 8; y_cord++)
            {
                tmp_arr.push(cells[mem_part*x_res*y_res/8 + x_cord + y_cord*y_res]);
            }
            bit_arr.push(tmp_arr);
            tmp_arr = [];
        }
    }
    let res_arr = [];
    result.innerText = "{"
    for (let byte = 0; byte < x_res*y_res/8; byte++)
    {
        let res_byte = 0;
            for (let bit = 0; bit < 8; bit++) 
            {
                let res_bit = 0;
                res_bit = (bit_arr[byte][bit].style.backgroundColor == "black") ? 0 : 1; 
                res_byte = res_byte | res_bit << bit;
            }
        result.innerText += "0x" + res_byte.toString(16) + ", ";
    }
    result.innerText = result.innerText.slice(0,-1);
    result.innerText += "}";
};
    
//callback for copy_button -> copies result to clipboard
document.getElementById("copy_button").onclick = function()
{
  navigator.clipboard.writeText(result.innerText);
  alert("Copied")
}

//callback for generating grid of pixels
document.getElementById("gen_button").onclick = function ()
{
    let x_res = document.getElementById("x_resolution").value;
    let y_res = document.getElementById("y_resolution").value;
    remove_grid();
    result.innerText = " ";
    make_grid(x_res, y_res);

};
/* CALLBACKS FOR BUTTONS END*/

/* INPUT HANDLERS */

// function, that allows only numbers for resolution inputs
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

/* INPUT HANDLERS END*/

/* PIXELS GRID FUNCTIONS */

//removing grid function
function remove_grid()
{
    removeChildren(".gridRow", document.body);
} 

//removing grid function
function removeChildren(cssSelector, parentNode)
{
    var elements = parentNode.querySelectorAll(cssSelector);
    let fragment = document.createDocumentFragment(); 
    fragment.textContent=' ';
    fragment.firstChild.replaceWith(...elements);
}

//general function for grid removing
function make_grid( x_res,  y_res) 
{
    makeRows(x_res);
    makeColumns(y_res);
}

function makeRows(rowNum) {
    for (r = 0; r < rowNum; r++) 
    {
        let row = document.createElement("div");
        container.appendChild(row).className = "gridRow";
    }; 
};

function makeColumns(cellNum) 
{
    let id = 0;
    for (i = 0; i < rows.length; i++) 
    {
        for (j = 0; j < cellNum; j++) 
        {
            let newCell = document.createElement("div");
            rows[i].appendChild(newCell).className = "bit";
            rows[i].appendChild(newCell).id = "bit_" + (j*8 + i);
            newCell.style.backgroundColor = "white"
            newCell.onclick = function(){            
                if(this.style.backgroundColor == "black")
                {
                    this.style.backgroundColor = "white";
                }
                else
                {
                    this.style.backgroundColor = "black";
                }
            };
        }
    };
};

/* PIXELS GRID FUNCTIONS END */