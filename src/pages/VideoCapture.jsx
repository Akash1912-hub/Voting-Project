import React, { useEffect, useRef } from 'react';

const VideoCapture = ({ onFacesDetected }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Load OpenCV and start video capture
    const loadOpenCV = () => {
      if (window.cv) {
        startVideoCapture();
      } else {
        setTimeout(loadOpenCV, 100);
      }
    };

    loadOpenCV();
    
    function startVideoCapture() {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const cascadeUrl = 'C:\blockchain-voting\client\public\haarcascade_frontalface_default.xml'; // Path to the XML file

      video.width = canvas.width;
      video.height = canvas.height;

      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          video.srcObject = stream;
          video.onloadedmetadata = () => {
            video.play();
            detectFaces();
          };
        })
        .catch(error => {
          console.error('Error accessing media devices.', error);
          toast.error('Error accessing media devices.');
        });

      function detectFaces() {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const src = cv.imread(canvas);
        const gray = new cv.Mat();
        const faces = new cv.RectVector();
        const classifier = new cv.CascadeClassifier();
        
        classifier.load(cascadeUrl); // Load the Haar cascade
        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
        classifier.detectMultiScale(gray, faces);
        
        if (faces.size() > 1) {
          onFacesDetected(faces.size());
        } else {
          onFacesDetected(0);
        }
        
        src.delete();
        gray.delete();
        faces.delete();
        
        requestAnimationFrame(detectFaces);
      }
    }
  }, [onFacesDetected]);

  return (
    <div>
      <video ref={videoRef} style={{ display: 'none' }}></video>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default VideoCapture;
