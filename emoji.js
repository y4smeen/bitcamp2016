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

function getEmotion(e) {
  var rect = e.getBoundingClientRect();
  var params = {
    rect.left + document.body.scrollLeft,
    rect.top + document.body.scrollTop,
    rect.width,
    rect.height
  };
  var face = "happy";

  return "img" + face;
}

function newImage(e) {
  var emoji = new Image();
  var rect = positionImage(e);
  var faceSource = getEmotion(e); // chrome.extension.getURL('img/sad.png'); // :'(
  emoji.src = chrome.extension.getURL(faceSource);
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

$(function() {
        var params = {
            // Request parameters
            "faceRectangles": "{string}"
        };

        $.ajax({
            url: "https://api.projectoxford.ai/emotion/v1.0/recognize?faceRectangles={faceRectangles}&" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","{subscription key}");
            },
            type: "POST",
            // Request body
            data: "{body}",
        })
        .done(function(data) {
            alert("success");
        })
        .fail(function() {
            alert("error");
        });
    });

window.onload = emojifai;

setInterval(emojifai, 100)
