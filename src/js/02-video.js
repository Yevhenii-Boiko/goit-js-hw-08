import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const KEY_STORAGE = 'videoplayer-current-time';

addEventListener.timeupdate;
player.on(
  'timeupdate',
  throttle(function (currentTime) {
    const seconds = currentTime.seconds;
    localStorage.setItem(KEY_STORAGE, JSON.stringify(seconds));
  }, 1000)
);

const savedCurrentTime = JSON.parse(localStorage.getItem(KEY_STORAGE));
player
  .setCurrentTime(savedCurrentTime)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });

console.log(player);
// console.log(Player);
