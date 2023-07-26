import threading
import cv2
from super_gradients.training import models
import time
from PIL import Image
from app import app, db, Count


def update_count_periodically():
    best_model = models.get('yolo_nas_s',
                        num_classes=3,
                        checkpoint_path="./Yolo_Nas/ckpt_best.pth")
    with app.app_context():
        # 웹캠 열기
        video_capture = cv2.VideoCapture(0)

        # 캡쳐 주기 설정 (1초)
        capture_interval = 1

        # 이전 시간 저장 변수
        prev_time = time.time()

        while True:
            # 주소 고정, 첫번째 행의 can, pet 개수 랜덤 업데이트
            address = "서울특별시 구로구 가리봉동 121-30"
            lat= 37.482896
            lng=126.886887

            # 현재 시간
            curr_time = time.time()
            # 이미지 캡쳐
            ret, frame = video_capture.read()
            # 웹캠 영상 출력
            cv2.imshow('Video', frame)

            # 일정 시간마다 캡쳐
            if curr_time - prev_time >= capture_interval:
                
                if ret and frame is not None:  # 정상적으로 프레임을 읽었을 경우에만 처리
                    # 이미지 파일로 저장
                    image_path = "./Yolo_Nas/captured_image.jpg"
                    cv2.imwrite(image_path, frame)

                    # 개수 세기
                    detection_pred = best_model.predict(image_path)._images_prediction_lst
                    loc_can_count = 0
                    loc_pet_count = 0
                    for i in next(detection_pred).prediction.labels:
                        if i == 1:
                            loc_can_count += 1
                        elif i == 2:
                            loc_pet_count += 1

                    # 이전 시간 업데이트
                    prev_time = curr_time

            
            count = Count.query.first()
            if count:
                count.can_count = loc_can_count
                count.pet_count = loc_pet_count
                db.session.commit()


if __name__ == '__main__':
    # 쓰레드 실행
    t = threading.Thread(target=update_count_periodically)
    t.start()
