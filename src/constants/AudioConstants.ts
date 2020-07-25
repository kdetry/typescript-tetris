const AudioElement = document.createElement("audio");
AudioElement.style.display = "none";
AudioElement.setAttribute("controls", "none");
AudioElement.volume = 0.05;
document.body.appendChild(AudioElement);

export {AudioElement};
export const AudioTurnBlock = './audio/turnblock.wav';
export const AudioTurnBlockKey = 'turnblock';
export const BackgroundSong = './audio/newbackground.mp3';