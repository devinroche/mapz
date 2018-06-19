import {WIDTH, HEIGHT, CHANCE_GRASS, CHANCE_MTN, NUMBER_STEPS, BIRTH_LIMIT, SNOW_BIRTH, DEATH_LIMIT} from './types';
import  {fillEmpty2dArr, neighborCountHelper, innerSimHelper, countAround} from './helpers'
import {initTable, clearTables} from './html_help'
// initialize starter map before clearing neighbors
function initMap(mapArr) {
    for (var x = 0; x < WIDTH; x++) {
        for (var y = 0; y < HEIGHT; y++) {
            var randomNum = Math.floor(Math.random() * 101);
            if (randomNum < CHANCE_GRASS || (x === 0 || y === 0))
                mapArr[x][y] = 1;
        }
    }

    return mapArr;
}

// count surrounding neighbors from point
function countAliveSurrounding(mapArr, x, y) {
    var count = 0;
    for (var i = -1; i < 2; i++) {
        for (var j = -1; j < 2; j++) {

            var neighbor_x = x + i;
            var neighbor_y = y + j;
            var ij_test = (i === 0 && j === 0)
            if (neighborCountHelper(neighbor_x, neighbor_y, mapArr) && !ij_test) count++;
        }
    }
    return count;
}

// compare old map to neighbor count to follow rules using cellular automaton
function simStep(oldMap) {
    let newMap = fillEmpty2dArr();

    newMap = oldMap.map((el, arr_idx) => {
        return el.map((val, idx)  => {
            var nbs = countAliveSurrounding(oldMap, arr_idx, idx);
            return innerSimHelper(val, nbs)
        })
    })
    return newMap;
}

// generates map (main function)
function generateMap() {
    //Create a new map
    let cellmap = fillEmpty2dArr();
    cellmap = initMap(cellmap);

    for(var i=0; i<NUMBER_STEPS; i++) {
        cellmap = simStep(cellmap); //run simulation for each step
    }

    return cellmap;
}

window.onload = initTable(generateMap());

document.getElementById("reload").addEventListener("click", () => {
    clearTables()
    initTable(generateMap())
});