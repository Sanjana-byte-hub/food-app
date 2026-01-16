import React, { useState, useRef, useEffect } from "react";
import "../../styles/createfood.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateFood = () => {
  const [name, setName] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef(null);
const navigate = useNavigate();

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setVideoFile(file);
    const previewUrl = URL.createObjectURL(file);
    setVideoPreview(previewUrl);
  }

  // cleanup preview URL
  useEffect(() => {
    return () => {
      if (videoPreview) URL.revokeObjectURL(videoPreview);
    };
  }, [videoPreview]);

  // function addTagFromInput() {
  //   const v = tagInput.trim();
  //   if (!v || tags.includes(v)) {
  //     setTagInput("");
  //     return;
  //   }
  //   setTags((s) => [...s, v]);
  //   setTagInput("");
  // }

  // function handleTagKeyDown(e) {
  //   if (e.key === "Enter" || e.key === ",") {
  //     e.preventDefault();
  //     addTagFromInput();
  //   }
  //   if (e.key === "Backspace" && tagInput === "" && tags.length) {
  //     setTags((s) => s.slice(0, -1));
  //   }
  // }

  // function removeTag(idx) {
  //   setTags((s) => s.filter((_, i) => i !== idx));
  // }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      alert("Food name is required");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
     
      if (videoFile) {
        formData.append("video", videoFile);
      }

      const response = await axios.post(
        "http://localhost:3000/api/food",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Food created:", response.data);
      navigate("/")

      // reset form
      setName("");
      setDescription("");
      setTags([]);
      setVideoFile(null);
      setVideoPreview(null);
    } catch (err) {
      console.error(err);
      alert("Failed to create food item");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="cf-page">
      <form className="cf-card" onSubmit={handleSubmit}>
        <h2 className="cf-title">Create Food Item</h2>

        <label className="cf-field">
          <span className="cf-label">Name</span>
          <input
            className="cf-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter food name"
          />
        </label>

       

        <label className="cf-field">
          <span className="cf-label">Description</span>
          <textarea
            className="cf-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description"
            rows={4}
          />
        </label>

        <label className="cf-field">
          <span className="cf-label">Video</span>
          <input
            ref={fileRef}
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="cf-file"
          />

          {videoPreview && (
            <video className="cf-preview" src={videoPreview} controls />
          )}
        </label>

        <div className="cf-actions">
          <button className="cf-btn" type="submit" disabled={submitting}>
            {submitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateFood;
