"use client";
import React, { useEffect, useState } from "react";
import { PiSpeakerHighFill } from "react-icons/pi";
import styles from "./styles.module.css";

interface VolumeControlProps {
  videoRef: React.RefObject<HTMLVideoElement> | null;
}

const VolumeControl = (props: VolumeControlProps) => {
  const { videoRef } = props;

  const [isSliderVisible, setIsSliderVisible] = useState(false);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (videoRef?.current) {
      setVolume(videoRef.current.volume); // Set initial volume from video
    }
  }, [videoRef]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);

    // Update the video's volume
    if (videoRef?.current) {
      videoRef.current.volume = newVolume;
    }
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
