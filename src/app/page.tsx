"use client";
import VideoPlayer from "./components/VideoPlayer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1>Video Player</h1>
      <VideoPlayer />
    </div>
  );
}
