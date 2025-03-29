"use client";

import React from "react";
import styles from "./styles.module.css";
import { useTimelineTrim } from "./useTimelineTrim";

export interface TimelineTrimProps {
  duration: number;
  initialStart?: number;
  initialEnd: number;
  onTrimStartChange: (start: number) => void;
  onTrimEndChange: (end: number) => void;
}

const TimelineTrim = (props: TimelineTrimProps) => {
  const {
    duration,
    initialStart = 0,
    initialEnd,
    onTrimStartChange,
    onTrimEndChange,
  } = props;

  const { trimStart, trimEnd, handleMouseDown } = useTimelineTrim({
    duration,
    initialStart,
    initialEnd,
    onTrimStartChange,
    onTrimEndChange,
  });

  return (
    <div className={styles.trimContainer}>
      <div
        className={styles.trimOverlayLeft}
        style={{ width: `${(trimStart / duration) * 100}%` }}
      />
      <div
        className={styles.trimOverlayRight}
        style={{ width: `${((duration - trimEnd) / duration) * 100}%` }}
      />
      <div
        className={styles.trimHandle}
        style={{ left: `${(trimStart / duration) * 100}%` }}
        onMouseDown={handleMouseDown("start")}
      >
        <div className={styles.trimLine} />
      </div>
      <div
        className={styles.trimArea}
        style={{
          left: `${(trimStart / duration) * 100}%`,
          width: `${((trimEnd - trimStart) / duration) * 100}%`,
        }}
      />
      <div
        className={styles.trimHandle}
        style={{ left: `${(trimEnd / duration) * 100}%` }}
        onMouseDown={handleMouseDown("end")}
      >
        <div className={styles.trimLine} />
      </div>
    </div>
  );
};

export default TimelineTrim;
