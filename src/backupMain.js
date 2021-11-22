const musicContainer = document.getElementById('music-container');

let polutedVar = 'poluted';
const cover = document.getElementById('cover');
const title = document.getElementById('title');
const progressBar = document.getElementById('progress');

// for clicking the progress bar
const progressContainer = document.getElementById('progress-container');

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const audioTime = document.getElementById('audio-time');

const songs = ['I love you', 'Tokyo cafe', 'When I fall in love'];

let songIndex = 0;
let timeId;
// let isVeryFirst = true;

loadSong();
// App.js
// App.setState라고 하면 될듯.
function loadSong(songInd = songIndex) {
  if (songInd >= songs.length) {
    songIndex = 0;
  }

  if (songInd < 0) {
    songIndex = songs.length - 1;
  }
  let song = songs[songIndex];
  title.innerText = song;
  audio.src = `/src/assets/music/${song}.m4a`;
  cover.src = `/src/assets/images/${song}.jpg`;
}

// navigation.js
function playSong() {
  musicContainer.classList.remove('pause');
  musicContainer.classList.add('play');
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove('play');
  musicContainer.classList.add('pause');
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  audio.pause();
}

// musicInfo.js
function onClickProgressBar(e) {
  const coordStart = this.getBoundingClientRect().left;
  const coordEnd = e.pageX;
  const pro = (coordEnd - coordStart) / this.offsetWidth;
  const duration = audio.duration;
  audio.currentTime = duration * pro;
  progressBar.style.width = pro.toFixed(3) * 100 + '%';
}

function updateProgressBar(dur, curr) {
  progressBar.style.width = (curr / dur) * 100 + '%';
}

function updateAudioTime(time) {
  let mins = Math.floor(time / 60);
  if (mins < 10) {
    mins = '0' + String(mins);
  }

  let secs = Math.floor(time % 60);

  if (secs < 10) {
    secs = '0' + String(secs);
  }
  audioTime.innerText = `${mins}:${secs}`;
}

// progress
function startTimer() {
  timeId = setInterval(() => {
    let audioDur = audio.duration;
    let audioCurr = audio.currentTime;
    if (audioDur === audioCurr) {
      pauseSong();
      stopTimer();
      loadSong(++songIndex);
      startUpdateSongInfo();
      //여기에 왜 playsong을 하면 안되는걸까? prev/next는 다 되는데 말이다.
      // playSong안에는 progressbar, audiotime을 업데이트 하는 기능이 없다.
    }
    updateAudioTime(audioDur - audioCurr);
    updateProgressBar(audioDur, audioCurr);
  }, 100);
}

function stopTimer() {
  clearInterval(timeId);
}

// nav
function startUpdateSongInfo() {
  const isPlaying = musicContainer.classList.contains('play');
  if (isPlaying) {
    pauseSong();
    stopTimer();
  } else {
    playSong();
    startTimer();
  }
}

//nav
function songChangeBtn(dir) {
  loadSong(dir === 'prev' ? --songIndex : ++songIndex);
  // pause를 한번 해줘야 SongInfo()에서 pause 클래스를 인식하고 play/timer 를 실행하기 때문
  pauseSong();
  startUpdateSongInfo();
}

prevBtn.addEventListener('click', () => {
  songChangeBtn('prev');
});

playBtn.addEventListener('click', startUpdateSongInfo);

nextBtn.addEventListener('click', () => {
  songChangeBtn('next');
});

progressContainer.addEventListener('click', onClickProgressBar);

const template = `
    <div class="music-container" id="music-container">
      <div class="music-info">
        <h4 id="title">Nat king cole</h4>
        <div class="progress-container" id="progress-container">
          <div class="progress" id="progress"></div>
        </div>
        <span id="audio-time"></span>
      </div>

      <audio id="audio"></audio>

      <div class="img-container">
        <img alt="cover-image" id="cover" />
      </div>

      <div class="navigation">
        <button id="prev" class="action-btn">
          <i class="fas fa-backward"></i>
        </button>
        <button id="play" class="action-btn action-btn-big">
          <i class="fas fa-play"></i>
        </button>
        <button id="next" class="action-btn">
          <i class="fas fa-forward"></i>
        </button>
      </div>
    </div>
`;
