import { useEffect, useState } from "react";

interface UseVolumeControlProps {
  videoRef: React.RefObject<HTMLVideoElement> | null;
}

export const useVolumeControl = ({ videoRef }: UseVolumeControlProps) => {
  const [isSliderVisible, setIsSliderVisible] = useState(false);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (videoRef?.current) {
      setVolume(videoRef.current.volume);
    }
  }, [videoRef]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);

    if (videoRef?.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const toggleSlider = () => {
    setIsSliderVisible(!isSliderVisible);
  };

  const showSlider = () => setIsSliderVisible(true);
  const hideSlider = () => setIsSliderVisible(false);

  return {
    isSliderVisible,
    volume,
    handleVolumeChange,
    toggleSlider,
    showSlider,
    hideSlider,
  };
};
