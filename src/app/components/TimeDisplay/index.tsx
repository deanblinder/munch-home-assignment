"use client";
import React from "react";
import styles from "./styles.module.css";

interface TimeDisplayProps {
  currentTime: number;
  duration: number;
}

const TimeDisplay: React.FC<TimeDisplayProps> = (props: TimeDisplayProps) => {
  const { currentTime, duration } = props;

  return (
    <div className={styles.timeDisplay}>
      {`${Math.floor(currentTime)}/${Math.floor(duration || 0)}`}
    </div>
  );
};

export default TimeDisplay;
