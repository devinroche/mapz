import {WIDTH, HEIGHT, DEATH_LIMIT, SNOW_BIRTH, BIRTH_LIMIT} from './types'
//returns 2d array filled with zeros as a starting point
export function fillEmpty2dArr(){
    return Array(WIDTH)
        .fill(0)
        .map(() => Array(HEIGHT).fill(0));

}

// used to reduce complexity of counter..
export function neighborCountHelper(neighbor_x,neighbor_y, mapArr){
    return (
        neighbor_x < 0 ||
        neighbor_x >= mapArr.length ||
        neighbor_y < 0 ||
        neighbor_y >= mapArr[0].length ||
        mapArr[neighbor_x][neighbor_y]
    ) 
};

export function innerSimHelper(val, nbs, nbs2) {
    let ret_val;
    if(val === 1) {
        // if(nbs === SNOW_BIRTH)
        //     ret_val = 2; 

        if( nbs > DEATH_LIMIT)
            ret_val = 1;

        else
            ret_val = 0

    } else {
        if(nbs === SNOW_BIRTH){
            ret_val = 1
        }
        else if( nbs >= BIRTH_LIMIT){
            ret_val = 1
        }
        else {
            ret_val = 0
        }
    }
    return ret_val
}

export function countAround(r, c, scope_x, scope_y, mapArr){
    var startX = c - scope_x;
    var startY = r - scope_y;
    var endX = c + scope_x;
    var endY = r + scope_y;

    var wallCounter = 0;

    for (var iY = -2; iY <= 4; iY++) {
        for (var iX = -2; iX <= 4; iX++){
            if (!(iX == c && iY == r)){
                if (mapArr[iY][iX]){
                    wallCounter += 1;
                }
                else return
            }
        }
    }
    return wallCounter;
}