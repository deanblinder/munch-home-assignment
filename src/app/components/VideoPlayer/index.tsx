"use client";
import React, { useRef, useState, useEffect } from "react";
import styles from "./styles.module.css";
import VolumeControl from "../VolumeControl";
import PlayButton from "../PlayButton";
import TimeDisplay from "../TimeDisplay";

interface VideoPlayerProps {
  src: string;
  poster?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src: initialSrc,
  poster,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [src, setSrc] = useState(initialSrc);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgress = () => {
    if (videoRef.current) {
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const time =
        (parseFloat(e.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = time;
      setProgress(parseFloat(e.target.value));
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("timeupdate", handleProgress);
      return () => video.removeEventListener("timeupdate", handleProgress);
    }
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    const supportedFormats = [
      "video/mp4",
      "video/webm",
      "video/ogg",
      "video/quicktime",
      "video/x-msvideo",
      "video/x-matroska",
      "video/x-flv",
    ];

    // Handle .mov files that might have different MIME types
    const isMovFile = file?.name.toLowerCase().endsWith(".mov");

    if (file && (supportedFormats.includes(file.type) || isMovFile)) {
      const url = URL.createObjectURL(file);
      setSrc(url);
      setProgress(0);
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play();
        setIsPlaying(true);
      }
    } else {
      alert("Unsupported video format. Please try a different file.");
    }
  };

  return (
    <div
      className={`${styles.videoContainer} ${
        isDragging ? styles.dragOver : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <video
        ref={videoRef}
        className={styles.video}
        poster={poster}
        onClick={togglePlay}
      >
        <source src={src} type="video/mp4" />
        <source src={src} type="video/webm" />
        <source src={src} type="video/ogg" />
        <source src={src} type="video/quicktime" />
        <source src={src} type="video/x-msvideo" />
        <source src={src} type="video/x-matroska" />
        <source src={src} type="video/x-flv" />
        Your browser does not support the video format.
      </video>
      <div className={styles.controls}>
        <VolumeControl />
        <PlayButton isPlaying={isPlaying} onToggle={togglePlay} />
        <TimeDisplay
          currentTime={videoRef.current?.currentTime || 0}
          duration={videoRef.current?.duration || 0}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
