"use client"; // Ensure this is a client component

import React from "react";

const YouTubeEmbed = ({ videoId }) => {
  if (!videoId) return null; // Don't render if no video is selected

  return (
    <div className="flex justify-center mt-6">
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;
