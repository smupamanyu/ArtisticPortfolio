import { useState, useEffect } from 'react';
import { useBackgroundAudio } from '@/hooks/use-background-audio';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faVolumeMute, faVolumeOff, faPlay, faCircleNotch } from '@fortawesome/free-solid-svg-icons';

interface BackgroundAudioProps {
  audioSrc: string;
  volume?: number;
}

const BackgroundAudio = ({ audioSrc, volume = 0.2 }: BackgroundAudioProps) => {
  const [controlVisible, setControlVisible] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const { 
    isPlaying, 
    isMuted, 
    toggle,
    toggleMute,
    volume: currentVolume,
    setVolume,
    audioRef
  } = useBackgroundAudio(audioSrc, { volume, autoPlay: true, loop: true });

  // Check if audio is ready and handle errors
  useEffect(() => {
    if (!audioRef.current) return;
    
    const handleCanPlay = () => {
      setLoading(false);
      setErrorState(false);
    };
    
    const handleError = () => {
      setLoading(false);
      setErrorState(true);
      console.log("Audio failed to load or play");
    };
    
    audioRef.current.addEventListener('canplay', handleCanPlay);
    audioRef.current.addEventListener('error', handleError);
    
    // Add timeout to handle cases where audio might take too long
    const loadingTimeout = setTimeout(() => {
      if (loading) {
        setLoading(false);
      }
    }, 5000);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('canplay', handleCanPlay);
        audioRef.current.removeEventListener('error', handleError);
      }
      clearTimeout(loadingTimeout);
    };
  }, [audioRef, loading]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  // Determine which icon to show
  const getIcon = () => {
    if (loading) return faCircleNotch;
    if (errorState) return faVolumeOff;
    if (!isPlaying) return faPlay;
    return isMuted ? faVolumeMute : faVolumeUp;
  };

  // Determine what action to take when the button is clicked
  const handleButtonClick = () => {
    if (errorState) {
      // Try to reinitialize audio
      window.location.reload();
      return;
    }
    
    if (!isPlaying) {
      toggle();
      return;
    }
    
    toggleMute();
  };

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-full shadow-lg p-2 transition-all duration-300"
      onMouseEnter={() => setControlVisible(true)}
      onMouseLeave={() => setControlVisible(false)}
    >
      <button
        onClick={handleButtonClick}
        className={`w-10 h-10 flex items-center justify-center rounded-full 
          ${errorState 
            ? 'bg-red-500/10 hover:bg-red-500/20 text-red-500' 
            : 'bg-primary/10 hover:bg-primary/20 text-primary'} 
          transition-colors duration-200`}
        aria-label={
          loading ? "Loading audio..." : 
          errorState ? "Audio error - click to reload" :
          !isPlaying ? "Play background music" :
          isMuted ? "Unmute background music" : "Mute background music"
        }
      >
        <FontAwesomeIcon icon={getIcon()} className={loading ? 'animate-spin' : ''} />
      </button>
      
      {controlVisible && !errorState && isPlaying && (
        <div className="flex items-center gap-2 pr-2 overflow-hidden transition-all duration-300 w-32">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={currentVolume}
            onChange={handleVolumeChange}
            className="w-full accent-primary cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default BackgroundAudio;