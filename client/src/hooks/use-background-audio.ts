import { useState, useEffect, useRef } from 'react';

interface BackgroundAudioOptions {
  volume?: number;
  autoPlay?: boolean;
  loop?: boolean;
}

export const useBackgroundAudio = (
  audioSrc: string,
  options: BackgroundAudioOptions = {}
) => {
  const { 
    volume = 0.2, 
    autoPlay = true,
    loop = true
  } = options;
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioVolume, setAudioVolume] = useState(volume);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    audioRef.current = new Audio(audioSrc);
    audioRef.current.volume = audioVolume;
    audioRef.current.loop = loop;
    
    // Clean up
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioSrc, loop]);

  // Handle auto play
  useEffect(() => {
    if (!audioRef.current || !autoPlay) return;
    
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('Error playing audio:', error);
        setIsPlaying(false);
      }
    };

    // We need user interaction to play audio automatically in most browsers
    const handleUserInteraction = () => {
      playAudio();
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };

    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('touchstart', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };
  }, [autoPlay]);

  // Volume control
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : audioVolume;
  }, [audioVolume, isMuted]);

  const play = async () => {
    try {
      if (audioRef.current) {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const mute = () => {
    setIsMuted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0;
    }
  };

  const unmute = () => {
    setIsMuted(false);
    if (audioRef.current) {
      audioRef.current.volume = audioVolume;
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      unmute();
    } else {
      mute();
    }
  };

  const setVolume = (value: number) => {
    const newVolume = Math.max(0, Math.min(1, value));
    setAudioVolume(newVolume);
    if (audioRef.current && !isMuted) {
      audioRef.current.volume = newVolume;
    }
  };

  return {
    audioRef,
    isPlaying,
    isMuted,
    volume: audioVolume,
    play,
    pause,
    toggle,
    mute,
    unmute,
    toggleMute,
    setVolume
  };
};