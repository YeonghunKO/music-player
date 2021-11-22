import {
  createElement,
  musicInfoTemplate,
  coverTemplate,
  srcTemplate,
} from '../utils/template.js';

import { ELEMENT_ID, ELEMENT_TYPE, ELEMENT_CLASS } from '../utils/constants.js';

export default function MusicInfo({ $target, initialState }) {
  this.state = initialState;

  const $musicInfoContainer = createElement({
    type: ELEMENT_TYPE.DIV,
    classes: [ELEMENT_CLASS.MUSIC_INFO],
  });
  const $coverOriginal = coverTemplate();

  $target.append($musicInfoContainer, $coverOriginal);

  const $musicInfoContent = musicInfoTemplate();
  $musicInfoContainer.innerHTML = $musicInfoContent;

  const $cover = document.getElementById(ELEMENT_ID.COVER);
  const $title = document.getElementById(ELEMENT_ID.TITLE);

  this.$musicInfoContainer = $musicInfoContainer;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const selectedSong = this.state;
    $cover.src = srcTemplate(ELEMENT_ID.COVER, selectedSong);
    $title.innerText = selectedSong;
  };

  this.render();
}
