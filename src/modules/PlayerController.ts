import { Player, DropInterval, Arena, ArenaWidth } from "../constants/GameConstants";
import { ArenaController } from "./ArenaController";
import { MatrixModel } from "../models/PieceModel";
import { GetRandomPiece } from "../helpers/GetRandomPiece";
import { GameOverHelper } from "../helpers/GameOverHelper";
import { SoundHelper } from "../helpers/SoundHelper";
import { AudioTurnBlockKey } from "../constants/AudioConstants";

enum Direction {
    left = -1,
    right = +1
}

export class PlayerController {

    document: Document;
    lastTime: number = 0;
    dropCounter: number = 0
    //lastTouch: { x: number, y: number, timeStamp: number } | null = null;
    //touchStart: TouchEvent | null = null;
    xDown: any = null;
    yDown: any = null;
    touchDeltaTime: number = 0;
    lastTouchTime: number = 0;
    firstTouchTime: number = 0;
    isXTouch: boolean | null = null;
    constructor(props: { document: Document }) {
        this.document = props.document;
    }

    timeCalculator(time: number) {
        let deltaTime = time - this.lastTime;
        this.lastTime = time;
        this.dropCounter += deltaTime;
        if (this.dropCounter > DropInterval) {
            this.playerDrop();
        }
    }

    playerReset() {
        Player.piece = GetRandomPiece();
        Player.pos.y = 0;
        Player.pos.x = Math.floor((ArenaWidth / 2) - (Player.piece.matrix[0].length / 2));
        if (ArenaController.collide()) {
            GameOverHelper();
        }
    }

    playerDrop() {
        SoundHelper(AudioTurnBlockKey);

        Player.pos.y++;
        if (ArenaController.collide()) {
            Player.pos.y--;
            ArenaController.mergeToArena();
            this.playerReset();
            ArenaController.arenaSweep();

        }
        this.dropCounter = 0;
    }

    playerMove(direction: Direction) {
        SoundHelper(AudioTurnBlockKey);
        Player.pos.x += direction;
        if (ArenaController.collide()) {
            Player.pos.x -= direction
        }
    }

    playerRotate(matrix: MatrixModel) {
        SoundHelper(AudioTurnBlockKey);
        let offset = 1;
        this.rotate(matrix);
        while (ArenaController.collide()) {
            Player.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1))
        }
    }

    rotate(matrix: MatrixModel) {
        for (let y = 0; y < matrix.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [
                    matrix[x][y],
                    matrix[y][x]
                ] = [
                        matrix[y][x],
                        matrix[x][y]
                    ]
            }
        }

        matrix.reverse();
    }

    keyHandler = (event: KeyboardEvent) => {
        switch (event.keyCode) {
            case 37:
                this.playerMove(Direction.left)
                break;
            case 39:
                this.playerMove(Direction.right)
                break;
            case 40:
                this.playerDrop();
                break;
            case 38:
                this.playerRotate(Player.piece.matrix);
                break;
            default:
                break
        }
    }

    getTouches = (evt: any) => {
        return evt.touches// jQuery
    }

    handleTouchEnd = (evt: any) => {
        this.touchDeltaTime = 0;
        this.xDown = null;
        this.yDown = null;
        if ((evt.timeStamp - this.firstTouchTime) < 150) {
            this.playerRotate(Player.piece.matrix);
        }
        this.isXTouch = null;
    }

    handleTouchStart = (evt: any) => {
        this.firstTouchTime = evt.timeStamp;
    }

    handleTouchMove = (evt: any) => {
        if (this.touchDeltaTime < 100) {
            this.touchDeltaTime += evt.timeStamp - this.lastTouchTime;
            return;
        }
        if (this.xDown == null || this.yDown == null) {
            this.xDown = evt.touches[0].clientX;
            this.yDown = evt.touches[0].clientY;
            return;
        }
        let xUp = evt.touches[0].clientX;
        let yUp = evt.touches[0].clientY;

        let xDiff = this.xDown - xUp;
        let yDiff = this.yDown - yUp;
        let actioned = false;
        if (Math.abs(xDiff) > 5 && 
        Math.abs(xDiff) > Math.abs(yDiff) &&
        this.isXTouch !== false) {/*most significant*/
            if(this.isXTouch === null) {
                this.isXTouch = true;
            }
            if (xDiff > 0) {
                this.playerMove(Direction.left);
            } else {
                this.playerMove(Direction.right);
            }
        } else if (this.isXTouch !== true && Math.abs(yDiff) > 30) {
            if(this.isXTouch === null) {
                this.isXTouch = false;
            }
            if (yDiff < 0) {
                while (Player.pos.y != 0) {
                    this.playerDrop();
                }
            }
        }
        /* reset values */
        this.xDown = evt.touches[0].clientX;
        this.yDown = evt.touches[0].clientY;
        this.touchDeltaTime = 0;
        this.lastTouchTime = evt.timeStamp;
    };

    eventListeners() {
        this.document.addEventListener('touchstart', this.handleTouchStart)
        this.document.addEventListener('touchend', this.handleTouchEnd, false);
        this.document.addEventListener('touchmove', this.handleTouchMove, false);
        this.document.addEventListener('keydown', this.keyHandler);
    }

    removeEventListeners(): void {
        this.document.removeEventListener('keydown', this.keyHandler);
        this.document.removeEventListener('touchstart', this.handleTouchStart);
        this.document.removeEventListener('touchend', this.handleTouchEnd);
        this.document.removeEventListener('touchmove', this.handleTouchMove);
    }
}