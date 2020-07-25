import { CurrentPieces, CurrentPiecesLength } from "../constants/PieceContants"

export const GetRandomPiece = () => {
    let randomIndex = GetRandomInt(CurrentPiecesLength-1);
    return CurrentPieces[randomIndex];
}

export function GetRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
}