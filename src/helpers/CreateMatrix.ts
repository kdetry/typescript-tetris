import { ArenaTile } from "../constants/GameConstants";

export const CreateMatrix = function(width: number, height:number) {
    let matrix: Array<Array<ArenaTile>> = [];
    for(let i = height; i > 0; i--){
        matrix.push(new Array(width).fill(ArenaTile.empty));
    }
    return matrix;
}