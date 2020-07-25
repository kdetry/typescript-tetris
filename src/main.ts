import { CanvasModel } from "./models/CanvasModel";
import { Drawer } from "./modules/Drawer";
import { Player, DropInterval } from "./constants/GameConstants";
import { PlayerController } from "./modules/PlayerController";
import { GetGameOverStatus } from "./helpers/GameOverHelper";
import { BackgroundSong } from "./constants/AudioConstants";


class Main {

    drawerObject: Drawer;
    playerController: PlayerController;
    constructor() {
        this.drawerObject = new Drawer({ document: document });
        this.playerController = new PlayerController({document: document})
        this.playerController.eventListeners();
    }

    update: FrameRequestCallback = (time:number): void => {
        this.playerController.timeCalculator(time);        
        this.drawerObject.draw(Player);
        if(GetGameOverStatus() === false) {
            requestAnimationFrame(this.update)            
        }else{
            this.playerController.removeEventListeners();
        }
    }

    backgroundMusic: Function = () => {
        let BackgroundMusic = document.createElement("audio");
        BackgroundMusic.style.display = "none";
        BackgroundMusic.setAttribute("controls", "none");
        BackgroundMusic.volume = 0.05;

        BackgroundMusic.src = BackgroundSong;
        BackgroundMusic.loop = true;
        setTimeout(() => {
            BackgroundMusic.play();
        }, 5000);
        document.body.appendChild(BackgroundMusic);

    }

    init: Function = (): boolean => {
        let canvasModel: null | CanvasModel = this.drawerObject.getCanvas();
        let scoreObject: null | HTMLDivElement = this.drawerObject.getScoreObject();
        if (canvasModel === null || scoreObject === null) {
            return false;
        }
        this.update(0);

        this.backgroundMusic();
        document.body.appendChild(scoreObject);
        document.body.appendChild(canvasModel.canvasObject);
        return true;
    }
}



let main = new Main();
main.init();