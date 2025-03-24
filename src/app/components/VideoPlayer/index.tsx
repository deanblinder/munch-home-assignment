"use client";
import React, { useRef, useState, useEffect } from "react";
import styles from "./styles.module.css";
import VolumeControl from "../VolumeControl";
import PlayButton from "../PlayButton";
import TimeDisplay from "../TimeDisplay";
import Timeline from "../Timeline";

const VideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string>();
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", () => setDuration(video.duration));

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", () =>
        setDuration(video.duration)
      );
      if (videoSrc) URL.revokeObjectURL(videoSrc);
    };
  }, [videoSrc]);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setProgress(videoRef.current.currentTime);
  };

  const handleSeek = (time: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = time;
  };

  const handlePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (!file) return;

    const supportedFormats = [
      "video/mp4",
      "video/webm",
      "video/ogg",
      "video/quicktime",
      "video/x-msvideo",
      "video/x-matroska",
      "video/x-flv",
    ];

    const isMovFile = file.name.toLowerCase().endsWith(".mov");

    if (supportedFormats.includes(file.type) || isMovFile) {
      if (videoSrc) {
        URL.revokeObjectURL(videoSrc);
      }

      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setProgress(0);

      if (videoRef.current) {
        videoRef.current.load();
      }
    } else {
      alert("Unsupported file format. Please drag and drop a video file.");
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
        onClick={handlePlayPause}
        src={videoSrc}
      >
        Your browser does not support the video format.
      </video>
      <div className={styles.controls}>
        <VolumeControl
          videoRef={videoRef as React.RefObject<HTMLVideoElement>}
        />
        <PlayButton isPlaying={isPlaying} onToggle={handlePlayPause} />
        <TimeDisplay
          currentTime={videoRef.current?.currentTime || 0}
          duration={duration}
        />
      </div>
      <Timeline
        currentTime={progress}
        duration={videoRef.current?.duration || 0}
        onSeek={handleSeek}
        videoRef={videoRef as React.RefObject<HTMLVideoElement>}
      />
    </div>
  );
};

export default VideoPlayer;
