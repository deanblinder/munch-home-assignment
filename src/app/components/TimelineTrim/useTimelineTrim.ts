import { useState, useCallback, useEffect } from "react";
import styles from "./styles.module.css";

interface UseTimelineTrimProps {
  duration: number;
  initialStart?: number;
  initialEnd?: number;
  onTrimStartChange: (start: number) => void;
  onTrimEndChange: (end: number) => void;
}

export const useTimelineTrim = ({
  duration,
  initialStart = 0,
  initialEnd = duration / 4,
  onTrimStartChange,
  onTrimEndChange,
}: UseTimelineTrimProps) => {
  const [trimStart, setTrimStart] = useState(initialStart);
  const [trimEnd, setTrimEnd] = useState(initialEnd);
  const [isDragging, setIsDragging] = useState<"start" | "end" | null>(null);

  const handleMouseDown =
    (handle: "start" | "end") => (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(handle);
    };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const container = document.querySelector(`.${styles.trimContainer}`);
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const position = Math.max(
        0,
        Math.min(1, (e.clientX - rect.left) / rect.width)
      );
      const time = position * duration;

      const minGap = Math.max(1, duration * 0.01); // Minimum 1 second or 1% of duration

      if (isDragging === "start") {
        const maxStart = trimEnd - minGap;
        const newStart = Math.max(0, Math.min(maxStart, time));
        setTrimStart(newStart);
        onTrimStartChange(newStart);
      } else {
        const minEnd = trimStart + minGap;
        const newEnd = Math.min(duration, Math.max(minEnd, time));
        setTrimEnd(newEnd);
        onTrimEndChange(newEnd);
      }
    },
    [
      isDragging,
      duration,
      trimStart,
      trimEnd,
      onTrimStartChange,
      onTrimEndChange,
    ]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return {
    trimStart,
    trimEnd,
    isDragging,
    handleMouseDown,
  };
};
