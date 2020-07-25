import { ColorEnum } from "../constants/CanvasConstants";
import { ArenaTile } from "../constants/GameConstants";

export type MatrixModel = Array<Array<ArenaTile>>;

export type PieceModel = {
    matrix: MatrixModel
}