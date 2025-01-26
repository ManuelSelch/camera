import { useState, useEffect } from 'react';
import CameraStream from './components/CameraStream.js';
import runOneSignal from './onesignal';

function App() {
  const [initialized, setInitialized] = useState("LOADING");

  useEffect(() => {
    runOneSignal();
    setInitialized("READY");
  }, []);

  return (
    <div>
      <CameraStream />
      <div>OneSignal: {initialized}</div>
    </div>
  );
}

export default App;
