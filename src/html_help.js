export function initTable(mainMap) {
    var body = document.getElementsByTagName("body")[0];
    var tbl = document.createElement("table");
    tbl.style.width = "50%";
    var tblBody = document.createElement("tbody");

    for (var i = 0; i < mainMap.length; i++) {
        var row = document.createElement("tr");
        for (var j = 0; j < mainMap[i].length; j++) {
            var cell = document.createElement("td");
            var cellText = document.createTextNode(mainMap[i][j]);
            // cell.appendChild(cellText);
            cell.style.height = "15px";
            if (mainMap[i][j] === 2) cell.style.backgroundColor = "#009432";
            else if (mainMap[i][j] === 1)
                cell.style.backgroundColor = "#27ae60";
            else cell.style.backgroundColor = "#74b9ff";

            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }

    tbl.appendChild(tblBody);
    body.appendChild(tbl);
}

export function clearTables(){
    var tables = document.getElementsByTagName("TABLE");
    for (var i = tables.length - 1; i >= 0; i -= 1)
        if (tables[i]) tables[i].parentNode.removeChild(tables[i]);
}