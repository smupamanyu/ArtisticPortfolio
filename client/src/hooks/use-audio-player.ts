import { useState, useEffect, useRef } from 'react';

export const useAudioPlayer = () => {
  const [audio, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const setAudio = (src: string) => {
    if (!audio) {
      const newAudio = new Audio(src);
      setAudioElement(newAudio);
      
      newAudio.addEventListener('loadedmetadata', () => {
        setDuration(newAudio.duration);
      });
      
      newAudio.addEventListener('timeupdate', () => {
        setCurrentTime(newAudio.currentTime);
        setProgress((newAudio.currentTime / newAudio.duration) * 100);
      });
      
      newAudio.addEventListener('ended', () => {
        setIsPlaying(false);
        newAudio.currentTime = 0;
        setCurrentTime(0);
        setProgress(0);
      });
    }
  };
  
  const togglePlay = () => {
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, [audio]);
  
  return {
    isPlaying,
    duration,
    currentTime,
    progress,
    togglePlay,
    setAudio
  };
};
