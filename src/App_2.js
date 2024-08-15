import React, { useEffect, useState } from 'react';
import 'aframe';

function App() {
  const [faces, setFaces] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource('http://127.0.0.1:5000/video_feed');

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.faces) {
        setFaces(data.faces);
      }
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h1>Face Detection with AR.js</h1>
      <a-scene embedded>
        <a-marker preset="hiro">
          {faces.map((face, index) => (
            <a-box
              key={index}
              position={`${face.x} ${face.y} ${face.width}`}
              width="1"
              height="1"
              depth="1"
              color="#4CC3D3"
            ></a-box>
          ))}
        </a-marker>
        <a-entity camera look-controls></a-entity>
      </a-scene>
      <img src="http://<YOUR_SERVER_IP>:5000/camera_feed" alt="Camera Feed" />
    </div>
  );
}

export default App;