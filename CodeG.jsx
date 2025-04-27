import React, { useState, useEffect } from "react";
import axios from "axios";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; // Dark theme
import "./Code.css";

const formatResponse = (response) => {
  response = response.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>"); // **bold** to <b>
  
  response = response.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre><code class="language-${lang || "javascript"}">${code}</code></pre>`;
  });

  return response;
};

const Conversation = () => {
  const [prompt, setPrompt] = useState("Generate a Python function to add two numbers.");
  const [conversation, setConversation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [conversation]);

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

  const copyToClipboard = () => {
    const codeText = document.querySelector(".conversation-placeholder pre code");
    if (codeText) {
      navigator.clipboard.writeText(codeText.innerText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="container">
      <h1 className="header">Code Generator</h1>
      <p className="subtext">Our most advanced code generator model.</p>
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
          <p className="error-text">Error generating code. Try again.</p>
        ) : conversation ? (
          <>
            <div dangerouslySetInnerHTML={{ __html: conversation }} />
            <button className="copy-btn" onClick={copyToClipboard}>
              {copied ? "Copied!" : "Copy Code"}
            </button>
          </>
        ) : (
          <>
            <div className="illustration"></div>
            <p>No code generated yet.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Conversation;
