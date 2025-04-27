import React, { useState } from "react";
import "./image.css";

const ImageGeneration = () => {
  const [prompt, setPrompt] = useState("A picture of a horse in Swiss Alps");
  const [image, setImage] = useState(null);

  const generateImage = () => {
    setImage(null); // Simulating no image generated scenario
  };

  return (
    <div className="container">
      <h1 className="header">Image Generation</h1>
      <p className="subtext">Turn your prompt into an image.</p>
      <div className="controls">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="input-box"
        />
        <select className="dropdown">
          <option>1 Photo</option>
        </select>
        <select className="dropdown">
          <option>512×512</option>
        </select>
        <button className="generate-btn" onClick={generateImage}>Generate</button>
      </div>
      <div className="image-placeholder">
        {image ? <img src={image} alt="Generated" /> : <>
          <div className="illustration"></div>
          <p>No images generated.</p>
        </>}
      </div>
    </div>
  );
};

export default ImageGeneration;
