import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BottomNav from "../../components/BottomNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "../../config";

const Home = () => {
  const containerRef = useRef(null);
  const [videos, setVideos] = useState([]);
 

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

  const items = containerRef.current.querySelectorAll(".reel");
  items.forEach((item) => observer.observe(item));

  return () => observer.disconnect();
}, [videos]);



  
  useEffect(() => {
  axios
    .get(`${BACKEND_URL}/api/food`, { withCredentials: true })
    .then((res) => {
      const foodItems = res.data.foodItems || [];
      setVideos(foodItems);
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      setVideos([]);
    });
}, []);   

  

 
  const likeVideo = async (foodId) => {
  const res = await axios.post(
    `${BACKEND_URL}/api/food/like`,
    { foodId },
    { withCredentials: true }
  );

   res.data.liked
    ? toast.success(" Video liked")
    : toast.info("Like removed");

  setVideos((prev) =>
    prev.map((v) =>
      v._id === foodId
        ? { ...v, likeCount: res.data.likeCount, liked: res.data.liked }
        : v
    )
  );
};

const saveVideo = async (foodId) => {
  const res = await axios.post(
    `${BACKEND_URL}/api/food/save`,
    { foodId },
    { withCredentials: true }
  );

  res.data.saved
    ? toast.success("Video saved")
    : toast.warn(" Removed from saved");

  setVideos((prev) =>
    prev.map((v) =>
      v._id === foodId
        ? { ...v, saveCount: res.data.saveCount, saved: res.data.saved }
        : v
    )
  );
};


  return (
    <div className="home-wrapper">
      <div className="reels-container" ref={containerRef}>
        {videos.map((v) => (
          <div className="reel" key={v._id}>
       <video
  className="reel-video"
  muted
  playsInline
  preload="none"
  data-src={v.video}
/>





            <div className="reel-gradient" />

            <div className="reel-actions">
             
           <button
  className={`action-btn like-btn ${v.liked ? "active" : ""}`}
  onClick={() => likeVideo(v._id)}
>
  🩷
  <span>{v.likeCount || 0}</span>
</button>

<button
  className={`action-btn save-btn ${v.saved ? "active" : ""}`}
  onClick={() => saveVideo(v._id)}
>
  ⭐
  <span>{v.saveCount || 0}</span>
</button>

             
              
             
              <button className="action-btn comment-btn">
                <svg className="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span className="action-count">
                  {v.comments?.length || 0}
                </span>
              </button>
            </div>

            <div className="overlay">
              <div className="description">{v.description}</div>
             {v.foodPartner &&
 typeof v.foodPartner === "object" &&
 v.foodPartner._id && (
  <Link
    className="visit-btn"
    to={`/food-partner/${v.foodPartner._id}`}
  >
    Visit Store
  </Link>
)}





            </div>
          </div>
        ))}
      </div>
      <BottomNav />

      <ToastContainer
  position="top-center"
  autoClose={1500}
  hideProgressBar
  newestOnTop
  closeOnClick
  pauseOnHover
/>

    </div>
  );
};

export default Home;
