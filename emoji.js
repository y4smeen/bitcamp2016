// API Keys
var face_app_key = "2a5373d6149a4c2a9404d4cbbcae85a0";
var face_client_id = "32336ea52f4b440d8e0b870953328550";

// Include JQuery
var script = document.createElement('script');
script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

function removeAll() {
  var emojis = document.getElementsByClassName("emojifai");
  while (emojis[0]) {
    emojis[0].parentNode.removeChild(emojis[0]);
  }
}

function positionImage(e) {
  var rect = e.getBoundingClientRect();

  return {
    top: rect.top + document.body.scrollTop + 'px',
    left: rect.left + document.body.scrollLeft + 'px',
    right: rect.right + 'px',
    height: rect.height + 'px',
    width: rect.width + 'px'
  };
}

// function getEmotions(e) {
//
//   var face = "happiness";
//   var emotions = [];
//
//
//
//   return "img/" + face + ".png";
// }

function randomImage() {
  var theEmotions = ["sadness", "neutral", "disgust", "anger", "surprise", "fear", "happiness"];
  var emotion = theEmotions[Math.floor(Math.random()*theEmotions.length)];
  return "img/" + emotion + ".png"
}

function newImage(e) {
  var emoji = new Image();
  var rect = positionImage(e);
  // var faceSource = chrome.extension.getURL(randomImage()); // :'(
  var faceSource = chrome.extension.getURL("img/happiness.png");
  emoji.src = faceSource;
  emoji.className = 'emojifai';
  emoji.style.position = 'absolute';
  emoji.style.zIndex = '123456';

  for (var key in rect) {
    emoji.style[key] = rect[key];
  }

  document.body.appendChild(emoji);
}

function emojifai() {
  removeAll();
  [].forEach.call(document.getElementsByClassName('faceBox'), function (e) {
    return newImage(e);
  });
  [].forEach.call(document.getElementsByClassName('tagBox'), function (e) {
    return newImage(e);
  });
}

window.onclick = emojifai;

setInterval(emojifai, 100)
