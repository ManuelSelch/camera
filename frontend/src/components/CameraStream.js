import React, { useState, useEffect } from 'react';

const CameraStream = () => {
  const cameraURL = 'https://camera.manuelselch.de/axis-cgi/mjpg/video.cgi';

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if(document.visibilityState === 'visible') {
        setIndex(index + 1);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
  }, [index]);

  return (
    <div>
      <iframe
        key={index}
        src={cameraURL}
        style={{width: "100vw", height: "100vh"}}
        frameBorder="0"
        allowFullScreen
        title="Camera Stream"
      />
   </div>
  );
};

export default CameraStream;
