import React, { useState, useEffect } from "react";
import "../../styles/profile.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../config";
const containerRef = useRef(null);


const Profile = () => {
  const { id } = useParams();

  const [profile, setProfile] = useState(null);
  const[videos,setVideos] = useState([])
  //const videos = Array.from({ length: 12 });

 useEffect(() => {
  if (!containerRef.current) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target.querySelector("video");
        if (!video) return;

        entry.isIntersecting
          ? video.play().catch(() => {})
          : video.pause();
      });
    },
    { threshold: 0.6 }
  );

  const items = containerRef.current.querySelectorAll(".video-tile");
  items.forEach((item) => observer.observe(item));

  return () => observer.disconnect();
}, [videos]);



  return (
    <div className="profile-container">
      <div className="header-card">
      <div className="header-top">
  <div className="avatar">
    <img
      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww"
      alt="profile"
    />
  </div>
  <div className="info">
    <div className="btn name">{profile?.name}</div>
    <div className="btn address">{profile?.address}</div>
  </div>
</div>


        <div className="stats">
          <div className="stat-item">
            <div className="label">total meals</div>
            <div className="value">42</div>
          </div>
          <div className="stat-item">
            <div className="label">customer serve</div>
            <div className="value">15K</div>
          </div>
        </div>
      </div>

      <div className="divider" />

    <div className="videos-grid">
  {videos.map((v, i) => (
    <div key={i} className="video-tile">
     
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

export default Profile;
