// src/components/Camera.js
import React, { useRef, useEffect } from 'react';

const Camera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.play();
      } catch (err) {
        console.error('Error accessing camera:', err);
      }
    };

    const processFrame = () => {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const frame = context.getImageData(0, 0, canvas.width, canvas.height);

      // Load OpenCV and process the frame
      if (window.cv) {
        const src = window.cv.matFromImageData(frame);
        const gray = new window.cv.Mat();
        window.cv.cvtColor(src, gray, window.cv.COLOR_RGBA2GRAY);
        window.cv.imshow(canvas, gray);
        src.delete();
        gray.delete();
      }

      requestAnimationFrame(processFrame);
    };

    video.addEventListener('play', () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      requestAnimationFrame(processFrame);
    });

    startCamera();

    return () => {
      if (video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} style={{ display: 'none' }} />
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Camera;
