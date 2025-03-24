"use client";
import React from "react";
import styles from "./styles.module.css";

interface TimeDisplayProps {
  currentTime: number;
  duration: number;
}

const TimeDisplay: React.FC<TimeDisplayProps> = (props: TimeDisplayProps) => {
  const { currentTime, duration } = props;

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className={styles.timeDisplay}>
      {`${formatTime(currentTime)}/${formatTime(duration || 0)}`}
    </div>
  );
};

export default TimeDisplay;
