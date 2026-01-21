import React, { useState, useEffect, useRef } from "react";
import "../../styles/profile.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../config";

const Profile = () => {
  const { id } = useParams();
  const containerRef = useRef(null);

  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/food-partner/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setProfile(response.data.foodPartner);
        setVideos(response.data.foodPartner.foodItems || []);
      })
      .catch((err) => console.error(err));
  }, [id]);

  // ✅ Lazy load videos (CRITICAL)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target.querySelector("video");
          if (!video) return;

          if (entry.isIntersecting) {
            if (!video.src) {
              video.src = video.dataset.src;
            }
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.6 }
    );

    const items = containerRef.current?.querySelectorAll(".video-tile");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [videos]);

  return (
    <div className="profile-container" ref={containerRef}>
      <div className="header-card">
        <div className="header-top">
          <div className="avatar">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=60"
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
            <div className="label">Total meals</div>
            <div className="value">{videos.length}</div>
          </div>
          <div className="stat-item">
            <div className="label">Customers served</div>
            <div className="value">15K</div>
          </div>
        </div>
      </div>

      <div className="divider" />

      <div className="videos-grid">
        {videos.map((v) => (
          <div key={v._id} className="video-tile">
            <video
              data-src={v.videoUrl}
              muted
              playsInline
              preload="none"
              controls={false}
              poster={v.thumbnailUrl}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
