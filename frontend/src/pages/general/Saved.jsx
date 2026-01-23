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

  const items = containerRef.current.querySelectorAll(".video-tile");
  items.forEach((item) => observer.observe(item));

  return () => observer.disconnect();
}, [videos]);
}

export default Profile;
