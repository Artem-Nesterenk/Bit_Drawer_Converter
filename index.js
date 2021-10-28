
const container = document.getElementById("grid_div");
let rows = document.getElementsByClassName("gridRow");
let cells = document.getElementsByClassName("bit");
var result = document.getElementById("result_div");


document.getElementsByClassName("bit").onclick = function(){
    console.log(this);
}

document.getElementById("gen_button").onclick = function () {
    let x_res = document.getElementById("x_resolution").value;
    let y_res = document.getElementById("y_resolution").value;
    remove_grid();
    result.innerText = " ";
    make_grid(x_res, y_res);

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
    for (i = 0; i < rows.length; i++) 
    {
        for (j = 0; j < cellNum; j++) 
        {
            let newCell = document.createElement("div");
            rows[i].appendChild(newCell).className = "bit";
            rows[i].appendChild(newCell).id = "bit_" + (j*8 + i);
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


document.getElementById("Output_button").onclick = function () {
    var out = [];
    var bit = 0;
    result.innerText = "{ ";
    for(let i = 0; i < 1024; i++)
    {
        console.log(cells[i])
        out_string = (cells[i].style.backgroundColor == "black") ? 0 : 1; 
        out[parseInt(i%8)] = (out[parseInt(i%8)] | (out_string << parseInt(i / 8)));
    }   
    out.forEach(el => {
        result.innerText += "0x";
        result.innerText += el.toString(16);
            result.innerText += ", "
    });
    console.log(cells.length);
    console.log(out);
    result.innerText += "}"
};


