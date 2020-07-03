'use strict';
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURE = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var OBJECT_LENGTH = 8;
var MOUSE_BUTTON = 0;

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
      'type': getRandomArrValue(TYPES),
      'rooms': 0,
      'guests': 0,
      'checkin': getRandomArrValue(TIMES),
      'checkout': getRandomArrValue(TIMES),
      'features': getRandomArrAray(FEATURE),
      'description': 'строка с описанием',
      'photos': getRandomArrAray(PHOTOS)
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

// Отключение строк формы
var mapFilters = document.querySelectorAll('.map__filter');

for (var i = 0; i < mapFilters.length; i++) {
  mapFilters[i].setAttribute('disabled', 'disabled');
}


var formFieldsetHeader = document.querySelector('.ad-form-header');
formFieldsetHeader.setAttribute('disabled', 'disabled');

var formFieldset = document.querySelectorAll('.ad-form__element');

for (var i = 0; i < formFieldset.length; i++) {
  formFieldset[i].setAttribute('disabled', 'disabled');
}


var mapPinMain = document.querySelector('.map__pin--main');

var address = document.querySelector('#address');
address.value = getRandomNumber(0, mapWidth) + ', ' + getRandomNumber(130, 630);

// отключение при нажатии мыши
mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === MOUSE_BUTTON) {
    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].removeAttribute('disabled');
    }

    document.querySelector('.ad-form-header').removeAttribute('disabled');

    for (var i = 0; i < formFieldset.length; i++) {
      formFieldset[i].removeAttribute('disabled');
    }

    map.classList.remove('map--faded');
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].removeAttribute('disabled');
    }

    document.querySelector('.ad-form-header').removeAttribute('disabled');

    for (var i = 0; i < formFieldset.length; i++) {
      formFieldset[i].removeAttribute('disabled');
    }
  }

  map.classList.remove('map--faded');
});

var room = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');


capacity.addEventListener('change', function () {
  var roomValue = Number(room.value);
  var capacityValue = Number(capacity.value);
  if (capacityValue < roomValue) {
    capacity.setCustomValidity('Не подходит для гостей');
  } else {
    capacity.setCustomValidity('');
  }
});

room.addEventListener('change', function () {
  var roomValue = Number(room.value);
  var capacityValue = Number(capacity.value);
  if (roomValue > capacityValue) {
    room.setCustomValidity('Не подходит для гостей');
  } else {
    room.setCustomValidity('');
  }
});
