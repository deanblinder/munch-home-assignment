"use client";
import React from "react";
import { PiSpeakerHighFill } from "react-icons/pi";
import styles from "./styles.module.css";
import { useVolumeControl } from "./useVolumeControl";

interface VolumeControlProps {
  videoRef: React.RefObject<HTMLVideoElement> | null;
}

const VolumeControl = (props: VolumeControlProps) => {
  const { videoRef } = props;
  const {
    isSliderVisible,
    volume,
    handleVolumeChange,
    toggleSlider,
    showSlider,
    hideSlider,
  } = useVolumeControl({ videoRef });

  return (
    <div
      className={styles.volumeControl}
      onMouseEnter={showSlider}
      onMouseLeave={hideSlider}
    >
      <PiSpeakerHighFill onClick={toggleSlider} className={styles.icon} />
      {isSliderVisible && (
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className={styles.volumeSlider}
        />
      )}
    </div>
  );
};

export default VolumeControl;
