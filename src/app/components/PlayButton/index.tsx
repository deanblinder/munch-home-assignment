"use client";
import React from "react";
import styles from "./styles.module.css";
import { FaPlay, FaPause } from "react-icons/fa";

interface PlayButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
}

const PlayButton: React.FC<PlayButtonProps> = (props: PlayButtonProps) => {
  const { isPlaying, onToggle } = props;

  return (
    <button onClick={onToggle} className={styles.playButton}>
      {isPlaying ? <FaPause /> : <FaPlay />}
    </button>
  );
};

export default PlayButton;
