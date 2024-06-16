
import React, { useState, useEffect } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import FullScreenPrompt from './components/FullScreenPrompt';
import Quiz from './components/Quiz';
import './Style.css';
import './components/Quiz.css';

const App = () => {
  const handle = useFullScreenHandle();
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(document.fullscreenElement !== null);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  return (
    <FullScreen handle={handle}>
      <div className="App">
        {isFullScreen ? <Quiz /> : <FullScreenPrompt  onEnableFullScreen={handle.enter} />}
      </div>
    </FullScreen>
  );
};
export default App;
