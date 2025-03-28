"use client";
import React, { useEffect, useMemo, useRef } from "react";
import styles from "./styles.module.css";

interface TimelineProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  videoRef?: React.RefObject<HTMLVideoElement> | null;
}

const Timeline: React.FC<TimelineProps> = (props) => {
  const { currentTime, duration, onSeek, videoRef } = props;
  const progressPercentage = (currentTime / duration) * 100 || 0;
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  const calculateNumThumbnails = () => {
    const minThumbnails = 20;
    const maxThumbnails = 100;
    const targetSecondsPerThumbnail = 2.5;

    const calculatedThumbnails = Math.floor(
      duration / targetSecondsPerThumbnail
    );
    return Math.min(
      maxThumbnails,
      Math.max(minThumbnails, calculatedThumbnails)
    );
  };

  const numThumbnails = useMemo(calculateNumThumbnails, [duration]);

  useEffect(() => {
    if (!videoRef?.current || !thumbnailsRef.current) return;

    const generateThumbnails = async () => {
      const video = videoRef.current!;
      const thumbnailContainer = thumbnailsRef.current!;
      thumbnailContainer.innerHTML = "";

      for (let i = 0; i < numThumbnails; i++) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const timePoint = (duration * i) / (numThumbnails - 1);

        canvas.width = 160;
        canvas.height = 90;
        video.currentTime = timePoint;

        await new Promise((resolve) => {
          video.onseeked = () => {
            ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
            resolve(null);
          };
        });

        const thumbnailDiv = document.createElement("div");
        thumbnailDiv.className = styles.thumbnail;
        thumbnailDiv.style.backgroundImage = `url(${canvas.toDataURL()})`;
        thumbnailContainer.appendChild(thumbnailDiv);
      }

      video.currentTime = currentTime;
    };

    if (duration > 0) {
      generateThumbnails();
    }
  }, [duration, videoRef]);

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = clickPosition * duration;
    onSeek(newTime);
  };

  const handleThumbnailClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const thumbnailStrip = e.currentTarget.getBoundingClientRect();
    const rect = thumbnailStrip;
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = clickPosition * duration;
    onSeek(newTime);
  };

  return (
    <div className={styles.timelineContainer}>
      <div className={styles.timeline} onClick={handleTimelineClick}>
        <div
          className={styles.selectionIndicator}
          style={{ left: `${progressPercentage}%` }}
        />
      </div>
      <div
        className={styles.thumbnailStrip}
        ref={thumbnailsRef}
        onClick={handleThumbnailClick}
      />
    </div>
  );
};

export default Timeline;
