import React, { useState } from "react";
import "./Video.css";

const Conversation = () => {
  const [prompt, setPrompt] = useState("How do I calculate the radius of a circle?");
  const [conversation, setConversation] = useState(null);

  const generateConversation = () => {
    setConversation(null); // Simulating no conversation started scenario
  };

  return (
    <div className="container">
      <h1 className="header">Content Generator</h1>
      <p className="subtext">Our most advanced content generator model.</p>
      <div className="controls">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="input-box"
        />
        <button className="generate-btn" onClick={generateConversation}>Generate</button>
      </div>
      <div className="conversation-placeholder">
        {conversation ? <p>{conversation}</p> : <>
          <div className="illustration"></div>
          <p>No content generated yet.</p>
        </>}
      </div>
    </div>
  );
};

export default Conversation;