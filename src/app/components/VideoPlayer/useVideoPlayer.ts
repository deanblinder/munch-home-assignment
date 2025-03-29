"use client";

import { useRef, useState, useEffect } from "react";

export const useVideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string>();
  const [duration, setDuration] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);

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
  }, [videoSrc, trimEnd]);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;

    setProgress(videoRef.current.currentTime);

    if (
      videoRef.current.currentTime >=
      (trimEnd === 0 ? videoRef.current.duration : trimEnd)
    ) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
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

  const onEndChange = (time: number) => {
    setTrimEnd(time);
  };

  return {
    videoRef,
    isPlaying,
    progress,
    isDragging,
    videoSrc,
    duration,
    trimEnd,
    handleTimeUpdate,
    handleSeek,
    handlePlayPause,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    onEndChange,
  };
};
