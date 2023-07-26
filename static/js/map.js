var markers = []; // 마커들을 담을 배열
var infowindows = []; // 정보창들을 담을 배열
var overlays = []; // 오버레이들을 담을 배열
var activeInfowindow = null; // 현재 열린 정보창


function initMap() {
  var mapContainer = document.getElementById('map');
  var mapOption = {
    center: new kakao.maps.LatLng(37.482896, 126.886887),
    level: 6,
  };

  var map = new kakao.maps.Map(mapContainer, mapOption);

  // 기존의 마커들 생성
  createMarkers(map);


  // 받아온 마커 데이터를 처리하는 함수
  function handleMarkerData() {
    var markerImage = new kakao.maps.MarkerImage(
      'static/image/greenO.png',
      new kakao.maps.Size(30, 30) // 마커 이미지 크기
    );
    var marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(lat, lng),
      map: map,
      image: markerImage
    });

    // ...

    var petCanTotal = petCount + canCount; // 페트병과 캔 개수의 총합

    // 마커에 총 개수를 표시할 커스텀 오버레이 생성
    var customOverlay = document.createElement('div');
    customOverlay.className = 'marker-overlay';
    customOverlay.innerText = petCanTotal;

    var overlay = new kakao.maps.CustomOverlay({
      position: new kakao.maps.LatLng(lat, lng),
      content: customOverlay,
      yAnchor: 1.1,
    });

    // 추가된 부분: overlay를 지도에 추가
    overlay.setMap(map);

    var content =
    '<div class="info-window">' +
    '<div class="address">' +
    '<span style="font-weight:bold; font-size:16px;">' + address + '</span>' +
    '</div>' +
    '<div class="count">' +
    '페트병 : <span id="petCount" style="color:green; font-weight:bold;">' +
    petCount +
    '</span><br>' +
    '캔 : <span id="canCount" style="color:green; font-weight:bold;">' +
    canCount +
    '</span>' +
    '</div>' +
    '<div class="more-info">' +
    '<button onclick="showDetails()">자세히 보기</button>' +
    '</div>' +
    '</div>';
  

    var infowindow = new kakao.maps.InfoWindow({
      content: content
    });







    kakao.maps.event.addListener(marker, 'click', function () {
      if (activeInfowindow === infowindow) {
        infowindow.close();
        activeInfowindow = null;
      } else {
        if (activeInfowindow) {
          activeInfowindow.close();
        }
        infowindow.open(map, marker);
        activeInfowindow = infowindow;
      }
    });


    
    markers.push(marker);
    infowindows.push(infowindow);
    overlays.push(overlay);
  }

  // 호출된 함수 실행
  handleMarkerData();

}



function createMarkers(map) {
  var positions = [
    {
      latlng: new kakao.maps.LatLng(37.484850, 126.886577),
      content: {
        address: "서울특별시 구로구 가리봉동 89-99",
        count: {
          pet: 12,
          can: 6,
        },
      },
    },
    {
      latlng: new kakao.maps.LatLng(37.493655, 126.864313),
      content: {
        address: "서울특별시 구로구 개봉동 403-111",
        count: {
          pet: 1,
          can: 5,
        },
      },
    },
    {
      latlng: new kakao.maps.LatLng(37.501096, 126.859564),
      content: {
        address: "서울특별시 구로구 개봉동 456-8",
        count: {
          pet: 3,
          can: 0,
        },
      },
    },
    {
      latlng: new kakao.maps.LatLng(37.478465, 126.887329),
      content: {
        address: "서울특별시 구로구 가리봉동 125-16",
        count: {
          pet: 10,
          can: 7,
        },
      },
    },
    {
      latlng: new kakao.maps.LatLng(37.485243, 126.887874),
      content: {
        address: "서울특별시 구로구 가리봉동 121-44",
        count: {
          pet: 8,
          can: 0,
        },
      },
    },
    {
      latlng: new kakao.maps.LatLng(37.485816, 126.891048),
      content: {
        address: "서울특별시 구로구 가리봉동 89-99",
        count: {
          pet: 2,
          can: 1,
        },
      },
    },
    {
      latlng: new kakao.maps.LatLng(37.502734, 126.849217),
      content: {
        address: "서울특별시 구로구 개봉동 492",
        count: {
          pet: 4,
          can: 0,
        },
      },
    },
    {
      latlng: new kakao.maps.LatLng(37.501554, 126.845711),
      content: {
        address: "서울특별시 구로구 개봉동 63-35",
        count: {
          pet: 2,
          can: 4,
        },
      },
    },
    {
      latlng: new kakao.maps.LatLng(37.500891, 126.844397),
      content: {
        address: "서울특별시 구로구 개봉동 60-101",
        count: {
          pet: 5,
          can: 5,
        },
      },
    },
    {
      latlng: new kakao.maps.LatLng(37.498926, 126.853445),
      content: {
        address: "서울특별시 구로구 개봉동 139-61",
        count: {
          pet: 0,
          can: 0,
        },
      },
    },
    {
      latlng: new kakao.maps.LatLng(37.499917, 126.853949),
      content: {
        address: "서울특별시 구로구 개봉동 156-5",
        count: {
          pet: 4,
          can: 5,
        },
      },
    },
    {
      latlng: new kakao.maps.LatLng(37.498065, 126.860364),
      content: {
        address: "서울특별시 구로구 개봉동 492",
        count: {
          pet: 0,
          can: 1,
        },
      },
    },
  ];

  

 // 기존의 마커들 생성
  for (var i = 0; i < positions.length; i++) {
    var position = positions[i];

    var markerImage = new kakao.maps.MarkerImage(
      'static/image/greenO.png',
      new kakao.maps.Size(30, 30) // 마커 이미지 크기
    );


    var marker = new kakao.maps.Marker({
      map: map,
      position: position.latlng,
      image: markerImage
    });

    var petCanTotal = position.content.count.pet + position.content.count.can; // 페트병과 캔 개수의 총합

    // 마커에 총 개수를 표시할 커스텀 오버레이 생성
    var customOverlay = document.createElement('div');
    customOverlay.className = 'marker-overlay';
    customOverlay.innerText = petCanTotal;

    var overlay = new kakao.maps.CustomOverlay({
      position: position.latlng,
      content: customOverlay,
      yAnchor: 1.1,
    });

    // 추가된 부분: overlay를 지도에 추가
    overlay.setMap(map);

    



    var infowindow = new kakao.maps.InfoWindow({
      content: createInfoWindowContent(
        position.content.address,
        position.content.count.pet,
        position.content.count.can
      ),
      removable: true // 닫기 버튼 표시

    });
    
    kakao.maps.event.addListener(
      marker,
      'click',
      (function (marker, infowindow) {
        var isOpen = false; // 인포윈도우가 열려있는지 여부를 저장하는 변수
        return function () {
          if (isOpen) {
            infowindow.close();
            isOpen = false;
          } else {
            infowindow.open(map, marker);
            isOpen = true;
          }
        };
      })(marker, infowindow)
    );

    markers.push(marker); // 마커를 배열에 추가
    infowindows.push(infowindow); // 정보창을 배열에 추가
    overlays.push(overlay); // 오버레이를 배열에 추가

  }
}

function createInfoWindowContent(address, petCount, canCount) {
  var content =
    '<div class="info-window">' +
    '<div class="address">' +
    '<span style="font-weight:bold; font-size:16px;">' + address + '</span>' +
    '</div>' +
    '<div class="count">' +
    '페트병 : <span id="petCount" style="color:green; font-weight:bold;">' +
    petCount +
    '</span><br>' +
    '캔 : <span id="canCount" style="color:green; font-weight:bold;">' +
    canCount +
    '</span>' +
    '</div>' +
    '<div class="more-info">' +
    '<button onclick="showDetails()">자세히 보기</button>' +
    '</div>' +
    '</div>';

  return content;
}

function showDetails() {
  // 팝업창에 표시할 이미지 경로
  var imageUrl = 'static/image/ouput.png'; 

  // 팝업창의 크기 및 위치
  var popupWidth = 600;
  var popupHeight = 400;
  var popupX = Math.ceil((window.screen.width - popupWidth) / 2);
  var popupY = Math.ceil((window.screen.height - popupHeight) / 2);

  // 팝업창 열기
  var popup = window.open('', 'popup', 'width=' + popupWidth + ',height=' + popupHeight + ',left=' + popupX + ',top=' + popupY);
  
  // 팝업창에 이미지 추가
  popup.document.write('<img src="' + imageUrl + '" width="100%" height="100%" />');
}
initMap();
