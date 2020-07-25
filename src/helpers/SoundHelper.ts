import { AudioTurnBlockKey, AudioTurnBlock, AudioElement } from "../constants/AudioConstants";

export const SoundHelper = (soundType: string) => {
    let soundSource:string = '';

    switch(soundType){
        case AudioTurnBlockKey:
            soundSource = AudioTurnBlock;
            break
        default:
            soundSource = AudioTurnBlock;
            break
    }

    AudioElement.src = soundSource;
    AudioElement.play();
}