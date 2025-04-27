import React, { useState } from "react";
import "./Music.css";

const MusicGeneration = () => {
  const [prompt, setPrompt] = useState("piano solo");
  const [music, setMusic] = useState(null);

  const generateMusic = () => {
    setMusic(null); // Simulating no music generated scenario
  };

  return (
    <div className="container">
      <h1 className="header">Music Generation</h1>
      <p className="subtext">Turn your prompt into music.</p>
      <div className="controls">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="input-box"
        />
        <button className="generate-btn" onClick={generateMusic}>Generate</button>
      </div>
      <div className="music-placeholder">
        {music ? <audio controls src={music}></audio> : <>
          <div className="illustration"></div>
          <p>No music generated.</p>
        </>}
      </div>
    </div>
  );
};

export default MusicGeneration;
