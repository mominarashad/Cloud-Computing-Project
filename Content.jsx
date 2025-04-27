import React, { useState } from "react";
import axios from "axios";
import "./Content.css";

const formatResponse = (response) => {
  response = response.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>"); // **bold** to <b>
  response = response.replace(/^(#{1,3})\s*(.*)$/gm, (match, p1, p2) => {
    switch (p1.length) {
      case 1:
        return `<h1>${p2}</h1>`;
      case 2:
        return `<h2>${p2}</h2>`;
      case 3:
        return `<h3>${p2}</h3>`;
      default:
        return p2;
    }
  });
  response = response.replace(/\n/g, "<p></p>"); // Newlines to <p>
  return response;
};

const Conversation = () => {
  const [prompt, setPrompt] = useState("How do I calculate the radius of a circle?");
  const [conversation, setConversation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const generateConversation = async () => {
    setLoading(true);
    setError(false);
    setConversation("Generating...");

    try {
      const response = await axios.post("http://127.0.0.1:5000/generate", { prompt });
      setConversation(formatResponse(response.data.content));
    } catch (err) {
      console.error("Error:", err);
      setError(true);
      setConversation("There was an error processing this request.");
    } finally {
      setLoading(false);
    }
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
        <button className="generate-btn" onClick={generateConversation} disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>
      <div className="conversation-placeholder">
        {error ? (
          <p className="error-text">Error generating content. Try again.</p>
        ) : conversation ? (
          <div dangerouslySetInnerHTML={{ __html: conversation }} />
        ) : (
          <>
            <div className="illustration"></div>
            <p>No content generated yet.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Conversation;
