import { createElement, srcTemplate } from '../utils/template.js';
import { ELEMENT_ID } from '../utils/constants.js';

export default function AudioComponent({ $target, initialState }) {
  this.state = initialState;
  const $audio = createElement({
    type: ELEMENT_ID.AUDIO,
    id: ELEMENT_ID.AUDIO,
  });
  $target.appendChild($audio);

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const selectedSong = this.state;
    $audio.src = srcTemplate(ELEMENT_ID.AUDIO, selectedSong);
  };

  this.render();

  this.play = () => {
    $audio.play();
  };

  this.pause = () => {
    $audio.pause();
  };

  this.element = $audio;
}
