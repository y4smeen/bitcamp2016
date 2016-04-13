// API Keys
var microsoft_key = "8df94307d5eb45799e647a5ab63856ad";
// var unirest = require('unirest');

// Include JQuery
// var script = document.createElement('script');
// script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
// script.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(script);

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

function getEmotions(e) {

  var rect = e.getBoundingClientRect();

  // var rects = {
  //   top: rect.top + document.body.scrollTop + 'px',
  //   left: rect.left + document.body.scrollLeft + 'px',
  //   right: rect.right + 'px',
  //   height: rect.height + 'px',
  //   width: rect.width + 'px'
  // };
  var top = Math.round(rect.top + document.body.scrollTop);
  var left = Math.round(rect.left + document.body.scrollLeft);
  var height = Math.round(rect.height);
  var width = Math.round(rect.width);

  // var face = "happiness";
  var theEmotions = ["anger", "contempt", "disgust", "fear", "happiness", "neutral", "sadness", "surprise"];
  var emotions = [];
  // var strRect = toString(top) + "," + toString(left) + "," + toString(width) + "," + toString(height);
  var params = {
    // Request parameters
    "faceRectangles": strRect,
  };
  var bestEmotion = "img/happiness.png";
  $.ajax({
            //url: "https://api.projectoxford.ai/emotion/v1.0/recognize?faceRectangles=" + t + "," + l + "," + w + "," + h,
            //url: "https://api.projectoxford.ai/emotion/v1.0/recognize?faceRectangles={faceRectangles}&" + $.param(params),
            url: "https://api.projectoxford.ai/emotion/v1.0/recognize?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key",microsoft_key);
            },
            type: "POST",
            // Request body
            // data: JSON.stringify({"url": e.src}),
            data: {"url": e.src},
        })
        .done(function(data) {
            alert("success");
            emotions.push(data.scores.anger.value);
            emotions.push(data.scores.contempt.value);
            emotions.push(data.scores.disgust.value);
            emotions.push(data.scores.fear.value);
            emotions.push(data.scores.happiness.value);
            emotions.push(data.scores.neutral.value);
            emotions.push(data.scores.sadness.value);
            emotions.push(data.scores.surprise.value);
            bestEmotion = "img/" + theEmotions[emotions.indexOf(Math.max(...emotions))] + ".png";
        })
        .fail(function() {
            alert("error");
        });


  return bestEmotion;
}

// function randomImage() {
//   var theEmotions = ["sadness", "neutral", "disgust", "anger", "surprise", "fear", "happiness"];
//   var emotion = theEmotions[Math.floor(Math.random()*theEmotions.length)];
//   return "img/" + emotion + ".png"
// }

function newImage(e) {
  var emoji = new Image();
  var rect = positionImage(e);
  // var faceSource = chrome.extension.getURL(randomImage()); // :'(
  var faceSource = chrome.extension.getURL(getEmotions(e));
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

setInterval(emojifai, 20000)
