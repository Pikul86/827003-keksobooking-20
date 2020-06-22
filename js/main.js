'use strict';
var types = ['palace', 'flat', 'house', 'bungalo'];
var times = ['12:00', '13:00', '14:00'];
var feature = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var OBJECT_LENGTH = 8;

// опредиление случайного числа в промежутке
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// выбор случайного слова, времени из массива
var getRandomArrValue = function (arr) {
  return arr[getRandomNumber(0, arr.length)];
};

var getRandomArrAray = function (arr) {
  var arrLength = arr.length;
  var startIndex = getRandomNumber(0, arrLength);
  return arr.slice(startIndex, getRandomNumber(startIndex, arrLength));
};


var map = document.querySelector('.map');
var mapWidth = map.offsetWidth;


var generateObject = function (i) {
  return {
    'author': {
      'avatar': 'img/avatars/user0' + (i + 1) + '.png'
    },
    'offer': {
      'title': 'заголовок',
      'address': getRandomNumber(0, mapWidth) + ', ' + getRandomNumber(130, 630),
      'price': 'стоимость',
      'type': getRandomArrValue(types),
      'rooms': 0,
      'guests': 0,
      'checkin': getRandomArrValue(times),
      'checkout': getRandomArrValue(times),
      'features': getRandomArrAray(feature),
      'description': 'строка с описанием',
      'photos': getRandomArrAray(photos)
    },
    'location': {
      'x': getRandomNumber(0, mapWidth),
      'y': getRandomNumber(130, 630)
    },
  };
};


var getGenerateObjectAll = function () {
  var arrayAllObjects = [];
  for (var i = 0; i < OBJECT_LENGTH; i++) {
    arrayAllObjects.push(generateObject(i));
  }
  return arrayAllObjects;
};

var offersArray = getGenerateObjectAll();

map.classList.remove('map--faded');

var mapMarkElement = document.querySelector('.map__pins');
var mapMarkList = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var mapPinsAll = document.createDocumentFragment();

for (var i = 0; i < offersArray.length; i++) {
  var markElement = mapMarkList.cloneNode(true);
  var offersIndex = offersArray[i];
  markElement.style.left = (offersIndex.location.x) + (PIN_WIDTH / 2) + 'px';
  markElement.style.top = (offersIndex.location.y) + PIN_HEIGHT + 'px';

  var img = markElement.querySelector('img');
  img.src = offersIndex.author.avatar;
  img.alt = 'Аватар';

  mapPinsAll.appendChild(markElement);
}

mapMarkElement.appendChild(mapPinsAll);
