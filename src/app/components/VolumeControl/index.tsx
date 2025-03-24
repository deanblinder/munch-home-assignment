"use client";
import React, { useState } from "react";
import { PiSpeakerHighFill } from "react-icons/pi";
import styles from "./styles.module.css";

const VolumeControl = () => {
  const [isSliderVisible, setIsSliderVisible] = useState(false);
  const [volume, setVolume] = useState(1);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const toggleSlider = () => {
    setIsSliderVisible(!isSliderVisible);
  };

  return (
    <div
      className={styles.volumeControl}
      onMouseEnter={() => setIsSliderVisible(true)}
      onMouseLeave={() => setIsSliderVisible(false)}
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
