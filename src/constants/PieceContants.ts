import { PieceModel } from "../models/PieceModel";

export const TPiece: PieceModel = {
    matrix: [
        [0, 7, 0],
        [7, 7, 7],
        [0, 0, 0]
    ]
}

export const OPiece: PieceModel = {
    matrix: [
        [5, 5],
        [5, 5]
    ]
}

export const LPiece: PieceModel = {
    matrix: [
        [0, 4, 0],
        [0, 4, 0],
        [0, 4, 4]
    ]
}

export const JPiece: PieceModel = {
    matrix: [
        [0, 3, 0],
        [0, 3, 0],
        [3, 3, 0]
    ]
}

export const IPiece: PieceModel = {
    matrix: [
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0]
    ]
}
export const SPiece: PieceModel = {
    matrix: [
        [0, 6, 6],
        [6, 6, 0],
        [0, 0, 0]
    ]
}
export const ZPiece: PieceModel = {
    matrix: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ]
}

export const BigZPiece: PieceModel = {
    matrix: [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 1]
    ]
}

export const BigSPiece: PieceModel = {
    matrix: [
        [0, 3, 3],
        [0, 3, 0],
        [3, 3, 0]
    ]
}

export const PlusPiece: PieceModel = {
    matrix: [
        [0, 2, 0],
        [2, 2, 2],
        [0, 2, 0]
    ]
}

export const MPiece: PieceModel = {
    matrix: [
        [0, 5, 5],
        [0, 5, 0],
        [0, 5, 5]
    ]
}

export const DotPiece: PieceModel = {
    matrix: [
        [1],
    ]
}

export const BigLPiece: PieceModel = {
    matrix: [
        [0, 6, 0, 0],
        [0, 6, 6, 0],
        [0, 6, 0, 0],
        [0, 6, 0, 0]
    ]
}


export const BigJPiece: PieceModel = {
    matrix: [
        [0, 0, 7, 0],
        [0, 7, 7, 0],
        [0, 0, 7, 0],
        [0, 0, 7, 0]
    ]
}

const ClassicPieces: Array<PieceModel> = [TPiece, OPiece, LPiece, JPiece, IPiece, SPiece, ZPiece];
const ClassicPiecesLength: number = ClassicPieces.length;

const AdvancedPieces: Array<PieceModel> = [TPiece, OPiece, LPiece, JPiece, IPiece, SPiece, ZPiece, BigZPiece, BigSPiece, PlusPiece, MPiece, DotPiece, BigLPiece, BigJPiece];
const AdvancedPiecesLength: number = AdvancedPieces.length;

export const CurrentPieces: Array<PieceModel> = window.location.href.indexOf("advancedGame") !== -1 ? AdvancedPieces : ClassicPieces;
export const CurrentPiecesLength: number = window.location.href.indexOf("advancedGame") !== -1 ? AdvancedPiecesLength : ClassicPiecesLength;
