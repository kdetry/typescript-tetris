import { Player, ArenaTile, Arena } from "../constants/GameConstants";
import { MatrixModel } from "../models/PieceModel";
import { PositionModel } from "../models/PlayerModel";
import { GameColors } from "../constants/CanvasConstants";
import { CalculateScore } from "../helpers/CalculateScore";

export class ArenaController {

    document: Document;
    constructor(props: { document: Document }) {
        this.document = props.document
    }

    static mergeToArena() {
        Player.piece.matrix.forEach((row: Array<ArenaTile>, y: number) => {
            row.forEach((value: ArenaTile, x: number) => {
                if (value !== ArenaTile.empty) {
                    Arena[y + Player.pos.y][x + Player.pos.x] = value as ArenaTile;
                }
            })
        });
    }

    static arenaSweep() {
        let allIndexes: Array<number> = [];
        let deleteIndexes: Array<number> = [];
        let counter = 0;
        for (let y = Arena.length - 1; y > 0; y--) {
            allIndexes.push(y);
            let result: boolean = true;
            for (let x = 0; x < Arena[y].length; x++) {
                if (Arena[y][x] == ArenaTile.empty) {
                    result = false;
                }
            }
            if (result) {
                deleteIndexes.push(y);
                //                counter++;
                //                for (let arenaUpper = y; arenaUpper > 0; arenaUpper--) {
                //                    if (Arena[arenaUpper - 1]) {
                //                        Arena[arenaUpper] = Arena[arenaUpper - 1];
                //                    } else {
                //                        Arena[arenaUpper] = new Array(Arena[arenaUpper].length).fill(ArenaTile.empty);
                //                    }
                //                }
            }
        }

        if (deleteIndexes.length > 0) {
            allIndexes = allIndexes.filter(item => deleteIndexes.indexOf(item) == -1)
            allIndexes = allIndexes.reverse();
            let difference = Arena.length - allIndexes.length;
            for (let z = Arena.length-1; z > 0; z--) {
                console.log('z',z);
                console.log('allIndexes[z-difference]', allIndexes[z-difference]);
                if (allIndexes[z-difference]) {
                    Arena[z] = Arena[allIndexes[z-difference]];
                } else {
                    Arena[z] = new Array(Arena[1].length).fill(ArenaTile.empty);
                }
            }

            let scoreElement = document.getElementById("scoreId");
            if (scoreElement) {
                Player.score += CalculateScore(difference-1);
                scoreElement.innerHTML = Player.score.toString();
            }
        }
    }

    static collide() {
        let playerMatrix: MatrixModel = Player.piece.matrix
        let playerPos: PositionModel = Player.pos;
        for (let y = 0; y < playerMatrix.length; ++y) {
            for (let x = 0; x < playerMatrix[y].length; x++) {
                if (playerMatrix[y][x] !== ArenaTile.empty &&
                    (typeof Arena[y + playerPos.y] === 'undefined' ||
                        Arena[y + playerPos.y][x + playerPos.x] !== ArenaTile.empty)) {
                    return true
                }
            }
        }
        return false;
    }
}