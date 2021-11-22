const createElement = ({ type, classes, id }) => {
  const ele = document.createElement(type);
  if (classes) {
    classes.forEach(className => {
      ele.classList.add(className);
    });
  }

  if (id) {
    ele.setAttribute('id', id);
  }

  return ele;
};

const musicInfoTemplate = title => `
<h4 id="title">${title}</h4>

`;

const progressTemplate = () => {
  const progressContainer = createElement('div');

  progressContainer.innerHTML = `
  <div class="progress-container" id="progress-container">
    <div class="progress" id="progress"></div>
  </div>
  <span id="audio-time"></span>
`;

  return progressContainer;
};

const coverTemplate = () => {
  const imgContainer = createElement({
    type: 'div',
    classes: ['img-container'],
  });
  imgContainer.innerHTML = `
  <img alt="cover-image" id="cover"/>
  `;
  return imgContainer;
};

const navTemplate = () => {
  const navContainer = createElement({ type: 'div', classes: ['navigation'] });

  navContainer.innerHTML = `
  <button id='prev' class='action-btn'>
  <i class='fas fa-backward'></i>
  </button>

  <button id='play' class='action-btn action-btn-big'>
    <i class='fas fa-play'></i>
  </button>

  <button id='next' class='action-btn'>
    <i class='fas fa-forward'></i>
  </button>
  `;

  return navContainer;
};

const navBtnTemplate = type => `<i class='fas fa-${type}'></i>`;
const srcTemplate = (srcType, song) => {
  if (srcType === 'cover') {
    return `/src/assets/images/${song}.jpg`;
  } else {
    return `/src/assets/music/${song}.mp3`;
  }
};

export {
  createElement,
  musicInfoTemplate,
  coverTemplate,
  progressTemplate,
  navTemplate,
  navBtnTemplate,
  srcTemplate,
};
