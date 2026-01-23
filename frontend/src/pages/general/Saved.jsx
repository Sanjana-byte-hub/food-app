import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../../styles/profile.css";
import { BACKEND_URL } from "../../config";

const Saved = () => {
  const containerRef = useRef(null);
  const [videos, setVideos] = useState([]);

  // 🔹 Fetch saved videos
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/food/saved`, {
        withCredentials: true,
      })
      .then((res) => {
        setVideos(res.data.savedFoods || []);
      })
      .catch((err) => {
        console.error("Saved fetch error:", err);
        setVideos([]);
      });
  }, []);

  
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target.querySelector("video");
          if (!video) return;

          if (entry.isIntersecting) {
            if (!video.src) {
              video.src = video.dataset.src;
              video.load(); 
            }
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.6,
        rootMargin: "200px",
      }
    );

    const items =
      containerRef.current.querySelectorAll(".video-tile");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [videos]);

  return (
    <div className="profile-container">
      <div className="videos-grid" ref={containerRef}>
        {videos.map((v) => (
          <div className="video-tile" key={v._id}>
            <video
              className="reel-video"
              muted
              playsInline
              preload="none"
              data-src={v.video}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Saved;
