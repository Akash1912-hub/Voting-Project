from flask import Flask, jsonify, request
from flask_cors import CORS
import cv2
import mediapipe as mp

app = Flask(__name__)
CORS(app)


mp_face_detection = mp.solutions.face_detection
face_detection = mp_face_detection.FaceDetection(min_detection_confidence=0.5)


freeze_voting = False


@app.route('/vote', methods=['POST'])
def vote():
    global freeze_voting
    if freeze_voting:
        return jsonify({'message': 'Voting is currently frozen.'}), 403

    data = request.json
    
    return jsonify({'message': 'Vote recorded.'}), 200


@app.route('/check_camera', methods=['GET'])
def check_camera():
    global freeze_voting

    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        return jsonify({'error': 'Cannot access camera.'}), 500

    ret, image = cap.read()
    if not ret:
        cap.release()
        return jsonify({'error': 'Could not read an image from the camera.'}), 500

    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = face_detection.process(image_rgb)

    if results.detections:
        freeze_voting = True
        cap.release()
        return jsonify({'message': 'External object detected. Voting frozen.'}), 403

    freeze_voting = False
    cap.release()
    return jsonify({'message': 'No external objects detected. Voting is active.'}), 200


if __name__ == '__main__':
    app.run(debug=True)