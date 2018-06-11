
const WIDTH = 20;
const HEIGHT = 40;
const chanceToStartAliveGrass = 45;
const chanceToStartAliveSnow = 5;
const numberOfSteps = 2;
const birthLimit = 3;
const deathLimit = 4;

// initialize starter map before clearing neighbors
let initMap = mapArr => {
    for (var x = 0; x < WIDTH; x++) {
        for (var y = 0; y < HEIGHT; y++) {
            var value = Math.floor(Math.random() * 99);
            if (
                value < chanceToStartAliveGrass &&
                value > chanceToStartAliveSnow
            )
                mapArr[x][y] = 1;
            else if (value < chanceToStartAliveSnow) mapArr[x][y] = 2;
        }
    }

    return mapArr;
};

// count surrounding neighbors from point
let countAliveSurrounding = (mapArr, x, y) => {
    var count = 0;
    for (var i = -1; i < 2; i++) {
        for (var j = -1; j < 2; j++) {
            var neighbor_x = x + i;
            var neighbor_y = y + j;
            if (i == 0 && j == 0) {
            } else if (
                neighbor_x < 0 ||
                neighbor_x >= mapArr.length ||
                neighbor_y < 0 ||
                neighbor_y >= mapArr[0].length
            ) {
                count = count + 1;
            } else if (mapArr[neighbor_x][neighbor_y]) {
                count = count + 1;
            }
        }
    }
    return count;
};

// compare old map to neighbor count to follow rules using cellular automaton
let simStep = oldMap => {
    let newMap = Array(WIDTH)
        .fill(0)
        .map(() => Array(HEIGHT).fill(0));

    for (var x = 0; x < oldMap.length; x++) {
        for (var y = 0; y < oldMap[0].length; y++) {
            var rand = Math.floor(Math.random() * 101);
            var nbs = countAliveSurrounding(oldMap, x, y);
            //The new value is based on our simulation rules
            //First, if a cell is alive but has too few neighbours, kill it.
            if (oldMap[x][y]) {
                if (nbs < deathLimit) {
                    newMap[x][y] = 0;
                } else {
                    if (rand < chanceToStartAliveSnow) newMap[x][y] = 2;
                    else newMap[x][y] = 1;
                }
            } //Otherwise, if the cell is dead now, check if it has the right number of neighbours to be 'born'
            else {
                if (nbs > birthLimit) {
                    if (rand < chanceToStartAliveSnow) newMap[x][y] = 2;
                    else newMap[x][y] = 1;
                } else {
                    newMap[x][y] = 0;
                }
            }
        }
    }
    return newMap;
};

// generates map (main function)
let generateMap = () => {
    //Create a new map
    let cellmap = Array(WIDTH)
        .fill(0)
        .map(() => Array(HEIGHT).fill(0));
    cellmap = initMap(cellmap);
    //And now run the simulation for a set number of steps
    for (var i = 0; i < numberOfSteps; i++) {
        cellmap = simStep(cellmap);
    }

    return cellmap;
};

let initTable = mainMap => {

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
};

initTable(generateMap());

document.getElementById("reload").addEventListener("click", () => {
    var tables = document.getElementsByTagName("TABLE");
    for (var i = tables.length - 1; i >= 0; i -= 1)
        if (tables[i]) tables[i].parentNode.removeChild(tables[i]);

    initTable(generateMap());
});
