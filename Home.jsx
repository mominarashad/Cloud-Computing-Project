import React from "react";

const Home = () => {
  return (
    <div className="main-content">
      <h1 className="text-center">Explore the power of AI</h1>
      <p className="text-muted text-center">Chat with the smartest AI - Experience the power of AI</p>
      <div className="container">
        {[
          { title: "Conversation", icon: "💬" },
          { title: "Music Generation", icon: "🎵" },
          { title: "Image Generation", icon: "🖼️" },
          { title: "Video Generation", icon: "🎥" },
          { title: "Code Generation", icon: "💻" },
        ].map((item, index) => (
          <div key={index} className="card p-3 my-2 d-flex justify-content-between align-items-center">
            <span><span className="me-2">{item.icon}</span> {item.title}</span>
            <span>➡️</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
