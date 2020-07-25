import { PlayerModel } from "../models/PlayerModel";
import { TPiece } from "./PieceContants";
import { CreateMatrix } from "../helpers/CreateMatrix";
import { GetRandomPiece } from "../helpers/GetRandomPiece";
import { CanvasWidthTile } from "./CanvasConstants";

export const DropInterval = 1000;

export enum ArenaTile {
    empty = 0,
    fill = 1,
    violet = 2,
    blue = 3
}

export const ArenaWidth = CanvasWidthTile;
const ArenaHeight = 20;
export const Arena: Array<Array<ArenaTile>> = CreateMatrix(ArenaWidth,ArenaHeight);

let firstPiece = GetRandomPiece();
export const Player: PlayerModel = {
    pos: { x: Math.floor((ArenaWidth / 2)-(firstPiece.matrix.length / 2)), y: 0 },
    piece: firstPiece,
    score: 0
}