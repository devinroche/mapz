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

export function innerSimHelper(val, nbs) {
    let ret_val;
    if(val){
        ret_val = nbs < DEATH_LIMIT ? 0 : 1
    }else {
        ret_val = nbs > SNOW_BIRTH ? 2 : (nbs > BIRTH_LIMIT ? 1 : 0)
    }
    return ret_val
}