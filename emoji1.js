// API Keys
var face_app_key = "2a5373d6149a4c2a9404d4cbbcae85a0";
var face_client_id = "32336ea52f4b440d8e0b870953328550";

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

function newImage(rect, emotion) {
  var emoji = new Image();
  // var rect = positionImage(e);
  var faceSource = emotion; // chrome.extension.getURL('img/sad.png'); // :'(
  emoji.src = chrome.extension.getURL(faceSource);
  emoji.className = 'emojifai';
  emoji.style.position = 'absolute';
  emoji.style.zIndex = '123456';

  for (var key in rect) {
    emoji.style[key] = rect[key];
  }

  document.body.appendChild(emoji);
}

function getEmotions(e) {
  // e.preventDefault();

  var face = "happiness";
  var theEmotions = ["sadness", "neutral", "disgust", "anger", "surprise", "fear", "happiness"];

  var formdata = {  app_key : face_app_key,
                    client_id : face_client_id,
                    img : e
                  };

  var successCallback = function( data, textStatus, jqXHR ) {
    alert( JSON.stringify( data ) );
    // alert( "First person Age : " + data.persons[0].age.value );

    for (var i = 0; i < data.persons.length; i++) {
      var rect = {
        top: data.persons[i].face.y + document.body.scrollTop + 'px',
        left: data.persons[i].face.x + document.body.scrollLeft + 'px',
        height: data.persons[i].face.h + 'px',
        width: data.persons[i].face.w + 'px'
      };
      var emotions = [];
      emotions.push(data.persons[i].expressions.sadness.value);
      emotions.push(data.persons[i].expressions.neutral.value);
      emotions.push(data.persons[i].expressions.disgust.value);
      emotions.push(data.persons[i].expressions.anger.value);
      emotions.push(data.persons[i].expressions.surprise.value);
      emotions.push(data.persons[i].expressions.fear.value);
      emotions.push(data.persons[i].expressions.happiness.value);

      var bestEmotion = "img/" + theEmotions[emotions.indexOf(Math.max(...emotions))] + ".png";
      newImage(rect, bestEmotion);
    };
  };

  var failCallback = function( jqXHR, textStatus, errorThrown ) {
    alert( "There has been an error!" );
  };

  $.ajax( { url         : "https://api.sightcorp.com/api/detect/",
            type        : "POST",
            data        : formdata,
            success     : successCallback,
            error       : failCallback,
            processData : false,
            contentType : false } );

  return "img/" + face + ".png";
}

function emojifai() {
  removeAll();
  getEmotions(document.getElementsByClassName('spotlight').src);
  // [].forEach.call(document.getElementsByClassName('spotlight'), function (e) {
  //   // return newImage(e);
  //   getEmotions(document.);
  // });
  // [].forEach.call(document.getElementsByClassName('tagBox'), function (e) {
  //   // return newImage(e);
  //   getEmotions(e);
  // });
  // getEmotions(document.getElementsByClassName(''));
}

window.onload = emojifai;

setInterval(emojifai, 100)
