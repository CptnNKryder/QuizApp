import React from 'react';

const FullScreenPrompt = ({ onEnableFullScreen }) => (
  <div className="fullscreen-prompt">
    <h1>Please enable full screen mode to start the quiz</h1>
    <button onClick={onEnableFullScreen}>Enable Full Screen</button>
  </div>
);

export default FullScreenPrompt;
