import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import BottomNav from "../../components/BottomNav";
import "../../styles/saved.css";
import axios from "axios";
import { BACKEND_URL } from "../../config"; 

const Saved = () => {
  const containerRef = useRef(null);
  const [savedVideos, setSavedVideos] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/food/save`, {
        withCredentials: true,
      })
     .then((res) => {
  const validFoods = res.data.savedFoods
    .map(item => item.food)
    .filter(food => food !== null); 

  setSavedVideos(validFoods);
})

  }, []);

  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target.querySelector("video");
          if (!video) return;

          entry.isIntersecting && entry.intersectionRatio > 0.6
            ? video.play().catch(() => {})
            : video.pause();
        });
      },
      { threshold: [0.6] }
    );

    const items = containerRef.current?.querySelectorAll(".reel");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [savedVideos]);

  return (
    <div className="saved-wrapper">
      {savedVideos.length === 0 ? (
        <div className="saved-empty-container">
          <div className="empty-state">
            <div className="empty-icon">📑</div>
            <h2>No saved videos yet</h2>
            <p>Videos you save will appear here</p>
            <Link to="/" className="continue-btn">
              Continue Browsing
            </Link>
          </div>
          <BottomNav />
        </div>
      ) : (
        <>
          <div className="reels-container" ref={containerRef}>
            {savedVideos.map((v) => (
              <div className="reel" key={v._id}>
                <video
                  className="reel-video"
                  src={v.video}
                  muted
                  loop
                  playsInline
                />
                <div className="reel-gradient" />

                <div className="overlay">
                  <div className="description">{v.description}</div>
                  <Link
                    className="visit-btn"
                    to={`/food-partner/${v.foodPartner}`}
                  >
                    Visit Store
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <BottomNav />
        </>
      )}
    </div>
  );
};

export default Saved;
