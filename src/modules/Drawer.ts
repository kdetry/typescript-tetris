import { CanvasScaleWidth, CanvasWidth, CanvasHeight, CanvasScaleHeight, ColorEnum, CanvasWidthTile, CanvasHeightTile, GameColors } from "../constants/CanvasConstants";
import { Player, Arena } from "../constants/GameConstants";
import { PieceModel, MatrixModel } from "../models/PieceModel";
import { OffsetModel } from "../models/OffsetModel";
import { CanvasModel } from "../models/CanvasModel";
import { PlayerModel } from "../models/PlayerModel";

type DrawerProps = {
    document: Document
}


export class Drawer {

    drawerProps: DrawerProps;
    canvasObject: null | CanvasModel = null;
    scoreObject: null | HTMLDivElement = null;
    constructor(drawerProps: DrawerProps) {
        this.drawerProps = drawerProps;
        this.createCanvas();
        this.createScore();
    }

    getCanvas(): null | CanvasModel {
        return this.canvasObject;
    }

    getScoreObject(): null | HTMLDivElement {
        return this.scoreObject
    }

    fillContext() {
        if (this.canvasObject !== null) {
            this.canvasObject.canvasContext.fillStyle = ColorEnum.black;
            this.canvasObject.canvasContext.fillRect(0, 0, CanvasWidthTile, CanvasHeightTile);
        }
    }


    createScore(): void {
        let scoreElement: HTMLDivElement = this.drawerProps.document.createElement("div");
        scoreElement.id = "scoreId"
        scoreElement.innerHTML = "0";
        this.scoreObject = scoreElement;
    }

    createCanvas(): void {
        let canvasObject: HTMLCanvasElement = this.drawerProps.document.createElement("canvas");

        canvasObject.width = CanvasWidth;
        canvasObject.height = CanvasHeight;

        let canvasContext: CanvasRenderingContext2D | null = canvasObject.getContext("2d");
        if (canvasContext !== null) {
            canvasContext.scale(CanvasScaleWidth, CanvasScaleHeight);
            this.canvasObject = { canvasObject, canvasContext };
            this.fillContext();
        }
    }

    draw(player: PlayerModel): void {
        this.fillContext();

        this.drawMatrix(Arena);
        this.drawMatrix(player.piece.matrix, Player.pos);
    }

    drawMatrix(matrix: MatrixModel, offset: OffsetModel = { x: 0, y: 0 }): void {

        matrix.forEach((row: Array<number>, y: number) => {
            row.forEach((value: number, x: number) => {
                if (value && this.canvasObject !== null) {
                    
                    this.canvasObject.canvasContext.fillStyle = GameColors[value];
                    this.canvasObject.canvasContext.fillRect(x + offset.x,
                        y + offset.y,
                        1, 1);
                }
            })
        });
    }
}