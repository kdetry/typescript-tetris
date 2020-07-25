import { PieceModel } from "./PieceModel"

export type PositionModel = {
    x: number,
    y: number
}

export type PlayerModel = {
    pos: PositionModel,
    piece: PieceModel,
    score: number
}