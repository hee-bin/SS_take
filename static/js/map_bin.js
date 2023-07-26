var markers = []; // 마커들을 담을 배열
var infowindows = []; // 정보창들을 담을 배열
var activeInfowindow = null; // 현재 열린 정보창


function initMap() {
  var mapContainer = document.getElementById('map');
  var mapOption = {
    center: new kakao.maps.LatLng(37.482896, 126.886887),
    level: 6,
  };

  var map = new kakao.maps.Map(mapContainer, mapOption);

  createMarkers(map);

}




function createMarkers(map) {
  var positions = [
    
    {
      latlng: new kakao.maps.LatLng(37.493655, 126.864313),
      content: {
        address: "서울특별시 구로구 개봉동 403-111",
      }
    },

    {
      latlng: new kakao.maps.LatLng(37.501096, 126.859564),
      content: {
        address: "서울특별시 구로구 개봉동 456-8",
      }
    },


    {
      latlng: new kakao.maps.LatLng(37.478465, 126.887329),
      content: {
        address: "서울특별시 구로구 가리봉동 125-16",
      }
    },


    {
      latlng: new kakao.maps.LatLng(37.485243, 126.887874),
      content: {
        address: "서울특별시 구로구 가리봉동 121-44",

      }
    },


    {
      latlng: new kakao.maps.LatLng(37.485816, 126.891048),
      content: {
        address: "서울특별시 구로구 가리봉동 89-99",
      }
    },


    {
    
      latlng: new kakao.maps.LatLng(37.502734, 126.849217),
      content: {
        address: "서울특별시 구로구 개봉동 492",
      }
    },


    {
      latlng: new kakao.maps.LatLng(37.501554, 126.845711),
      content: {
        address: "서울특별시 구로구 개봉동 63-35",
      }
    },


    {
      latlng: new kakao.maps.LatLng(37.500891, 126.844397),
      content: {
        address: "서울특별시 구로구 개봉동 60-101",
      }
    },


    {
    
      latlng: new kakao.maps.LatLng(37.499917, 126.853949),
      content: {
        address: "서울특별시 구로구 개봉동 156-5",
      }
    },


    {
      latlng: new kakao.maps.LatLng(37.498065, 126.860364),
      content: {
        address: "서울특별시 구로구 개봉동 492",     
        }
    },

  ];

  

 // 기존의 마커들 생성
  for (var i = 0; i < positions.length; i++) {
    var position = positions[i];

    var markerImage = new kakao.maps.MarkerImage(
      'static/image/trash.png',
      new kakao.maps.Size(30, 30) // 마커 이미지 크기
    );


    var marker = new kakao.maps.Marker({
      map: map,
      position: position.latlng,
      image: markerImage
    });

    var infowindow = new kakao.maps.InfoWindow({
      content: createInfoWindowContent(position.content.address),
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


    function createInfoWindowContent(address) {
      var content =
        '<div class="info-window">' +
        '<div class="address" style="font-weight:bold;">' +
        address +
        '</div>' +
        
        '<div class="more-info">' +
        '<button onclick="showDetails()">자세히 보기</button>' +
        '</div>' +
        '</div>';
    
      return content;
    }
    


    }
    }



initMap();
