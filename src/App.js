import { createElement } from './utils/template.js';
import {
  MUSIC_STATUS,
  ELEMENT_TYPE,
  ELEMENT_CLASS,
} from './utils/constants.js';
import { request } from './utils/api.js';

import MusicInfo from './components/musicInfo.js';
import AudioComponent from './components/AudioComponent.js';
import Navigation from './components/navigation.js';
import HandleProgress from './components/handleProgress.js';

export default function App({ $target }) {
  let timeId;

  this.state = {
    songs: [],
    songIndex: 0,
  };

  const fetchData = async () => {
    const data = await request([]);
    return await data;
  };

  const loadData = async () => {
    const songs = await fetchData();
    const musics = songs.musics;
    this.state.songs = musics;
    this.setState({ nextState: this.state });
  };

  loadData();

  const $musicContainer = createElement({
    type: ELEMENT_TYPE.DIV,
    classes: [ELEMENT_CLASS.MUSIC_CONTAINER],
  });
  $target.appendChild($musicContainer);

  this.setState = ({ nextState, btnType }) => {
    if (nextState) {
      this.state = nextState;
      let { songs, songIndex } = this.state;

      if (songIndex >= songs.length) {
        this.state.songIndex = 0;
      }

      if (songIndex < 0) {
        this.state.songIndex = songs.length - 1;
      }

      const selectedSong = songs[this.state.songIndex].name;

      audio.setState(selectedSong);
      musicInfo.setState(selectedSong);
    }

    switch (btnType) {
      case MUSIC_STATUS.PLAY:
        this.playSong();
        break;
      case MUSIC_STATUS.PAUSE:
        this.pauseSong();
        break;
      case MUSIC_STATUS.PREV:
        this.setState({
          nextState: { ...this.state, songIndex: --this.state.songIndex },
          btnType: MUSIC_STATUS.PLAY,
        });
        break;
      case MUSIC_STATUS.NEXT:
        this.setState({
          nextState: { ...this.state, songIndex: ++this.state.songIndex },
          btnType: MUSIC_STATUS.PLAY,
        });
        break;
    }
  };

  const audio = new AudioComponent({
    $target: $musicContainer,
  });

  const musicInfo = new MusicInfo({
    $target: $musicContainer,
  });

  const handleProgress = new HandleProgress({
    $target: musicInfo.$musicInfoContainer,
    requiredComponent: {
      audio,
    },
  });

  const nav = new Navigation({
    $target: $musicContainer,
    onPrevBtn: () => {
      this.setState({ btnType: MUSIC_STATUS.PREV });
    },
    onPlayBtn: () => {
      const isPlaying = $musicContainer.classList.contains(MUSIC_STATUS.PLAY);
      if (isPlaying) {
        this.setState({ btnType: MUSIC_STATUS.PAUSE });
      } else {
        this.setState({ btnType: MUSIC_STATUS.PLAY });
      }
    },
    onNextBtn: () => {
      this.setState({ btnType: MUSIC_STATUS.NEXT });
    },
  });

  this.playSong = () => {
    nav.render(MUSIC_STATUS.PAUSE);
    $musicContainer.classList.remove(MUSIC_STATUS.PAUSE);
    $musicContainer.classList.add(MUSIC_STATUS.PLAY);
    this.startTimer();
    audio.play();
  };

  this.pauseSong = () => {
    nav.render(MUSIC_STATUS.PLAY);
    $musicContainer.classList.remove(MUSIC_STATUS.PLAY);
    $musicContainer.classList.add(MUSIC_STATUS.PAUSE);
    this.stopTimer();
    audio.pause();
  };

  this.startTimer = () => {
    timeId = setInterval(() => {
      let audioDur = audio.element.duration;
      let audioCurr = audio.element.currentTime;
      if (audioCurr === audioDur) {
        this.pauseSong();
        this.setState({
          nextState: { ...this.state, songIndex: ++this.state.songIndex },
        });
        this.playSong();
      }
      handleProgress.updateAudioTime(audioDur - audioCurr);
      handleProgress.updateProgressBar(audioDur, audioCurr);
    }, 100);
  };

  this.stopTimer = () => {
    clearInterval(timeId);
  };
}

// 버튼을 누를때 this.setState를 실행시켜야 하나?
// state에 대한 정보가 바뀌므로.
// 그럼 각각의 컴포넌트의 state를 바꾼다음 rendering해야하나?

// 일단 navigation 만들고 생각해보자

// 음... 매순간 렌더링 되야하는 prgressBar 와 audioTime은 따로 컴포넌트를 만들어서 관리해야하나?

// this.setState에 들어가는 건 nav 버튼을 클릭할때이다.
// 곡의 정보를 바꾸어서 흘려내려보내준다. 재생되기 전에 모든 정보가 세팅되는 것이다.
// title , cover , audio.src, audioTime이 세팅되어야 한다.

// selectedSong만 바꿔서 데이터 내려보내주고 rendering하면 됨.

// 다른 컴포넌트에 있는 값을 조작하려면 수면 밖으로 나와야 한다.
// 즉, App에서 중앙 관리 해줘야 한다.

// 처음 fetch 해서 songs를 세팅해주자
// constant.js만들기
