"use client";
import React from "react";
import styles from "./styles.module.css";
import VolumeControl from "../VolumeControl";
import PlayButton from "../PlayButton";
import TimeDisplay from "../TimeDisplay";
import Timeline from "../Timeline";
import { useVideoPlayer } from "./useVideoPlayer";

const VideoPlayer = () => {
  const {
    videoRef,
    isPlaying,
    progress,
    isDragging,
    videoSrc,
    duration,
    handleSeek,
    handlePlayPause,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    onEndChange,
  } = useVideoPlayer();

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
      />
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
        videoRef={videoRef as React.RefObject<HTMLVideoElement>}
        onSeek={handleSeek}
        onTrimEndChange={onEndChange}
      />
    </div>
  );
};

export default VideoPlayer;
