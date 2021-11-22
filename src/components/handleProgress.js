import { progressTemplate } from '../utils/template.js';
import { ELEMENT_ID } from '../utils/constants.js';

export default function HandleProgress({ $target, requiredComponent }) {
  const { audio } = requiredComponent;

  const $progress = progressTemplate();
  $target.appendChild($progress);

  const $audioTime = document.getElementById(ELEMENT_ID.AUDIO_TIME);
  const $progressBar = document.getElementById(ELEMENT_ID.PROGRESS);
  const $progressContainer = document.getElementById(
    ELEMENT_ID.PROGRESS_CONTAINER
  );

  this.updateAudioTime = time => {
    let mins = Math.floor(time / 60);
    if (mins < 10) {
      mins = '0' + String(mins);
    }
    let secs = Math.floor(time % 60);
    if (secs < 10) {
      secs = '0' + String(secs);
    }
    $audioTime.innerText = `${mins}:${secs}`;
  };

  this.updateProgressBar = (dur, cur) => {
    $progressBar.style.width = (cur / dur) * 100 + '%';
  };

  $progressContainer.addEventListener('click', function (e) {
    const coordStart = this.getBoundingClientRect().left;
    const coordEnd = e.pageX;
    const progress = (coordEnd - coordStart) / this.offsetWidth;
    const duration = audio.element.duration;
    audio.element.currentTime = duration * progress;
    $progressBar.style.width = progress.toFixed(3) * 100 + '%';
  });
}
