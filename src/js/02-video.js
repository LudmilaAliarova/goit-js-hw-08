import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
player.on('play', function () {
  console.log('played the video!');
});
// время воспроизведения обновляется в хранилище не чаще чем раз в секунду (1000мс)
player.on('timeupdate', throttle(onPlay, 1000));

// сохраняем время воспроизведения в локальное хранилище и выводим его в консоль
function onPlay(data) {
  const dataTime = data.seconds;
  localStorage.setItem('videoplayer-current-time', dataTime);
  console.log(dataTime);
}

// при перезагрузке страницы возобновляем воспроизведение с сохраненной позиции
player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
