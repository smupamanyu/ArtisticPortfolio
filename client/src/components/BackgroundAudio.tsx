import { useState } from 'react';
import { useBackgroundAudio } from '@/hooks/use-background-audio';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

interface BackgroundAudioProps {
  audioSrc: string;
  volume?: number;
}

const BackgroundAudio = ({ audioSrc, volume = 0.2 }: BackgroundAudioProps) => {
  const [controlVisible, setControlVisible] = useState(false);
  
  const { 
    isPlaying, 
    isMuted, 
    toggleMute,
    volume: currentVolume,
    setVolume 
  } = useBackgroundAudio(audioSrc, { volume, autoPlay: true, loop: true });

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-full shadow-lg p-2 transition-all duration-300"
      onMouseEnter={() => setControlVisible(true)}
      onMouseLeave={() => setControlVisible(false)}
    >
      <button
        onClick={toggleMute}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors duration-200"
        aria-label={isMuted ? "Unmute background music" : "Mute background music"}
      >
        <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
      </button>
      
      {controlVisible && (
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