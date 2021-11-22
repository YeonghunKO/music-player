import { navTemplate, navBtnTemplate } from '../utils/template.js';
import { MUSIC_STATUS } from '../utils/constants.js';

export default function Navigation({
  $target,
  onPrevBtn,
  onPlayBtn,
  onNextBtn,
}) {
  const $nav = navTemplate();
  $target.appendChild($nav);

  const prevBtn = document.getElementById(MUSIC_STATUS.PREV);
  const playBtn = document.getElementById(MUSIC_STATUS.PLAY);
  const nextBtn = document.getElementById(MUSIC_STATUS.NEXT);

  this.render = type => {
    if (type === MUSIC_STATUS.PLAY) {
      playBtn.innerHTML = navBtnTemplate(MUSIC_STATUS.PLAY);
    } else {
      playBtn.innerHTML = navBtnTemplate(MUSIC_STATUS.PAUSE);
    }
  };

  prevBtn.addEventListener('click', onPrevBtn);

  playBtn.addEventListener('click', onPlayBtn);

  nextBtn.addEventListener('click', onNextBtn);
}
