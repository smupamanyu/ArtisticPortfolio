import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAudioPlayer } from '@/hooks/use-audio-player';
import { formatTime } from '@/lib/utils';
import type { PortfolioItem as PortfolioItemType } from '@shared/schema';

interface PortfolioItemProps {
  item: PortfolioItemType;
  color: 'primary' | 'secondary' | 'accent';
  audioPlayable?: boolean;
  videoPlayable?: boolean;
  hasLink?: boolean;
}

export const PortfolioItem = ({
  item,
  color,
  audioPlayable = false,
  videoPlayable = false,
  hasLink = false,
}: PortfolioItemProps) => {
  const { 
    isPlaying, 
    duration, 
    currentTime, 
    progress, 
    togglePlay, 
    setAudio 
  } = useAudioPlayer();
  
  const itemRef = useRef<HTMLDivElement>(null);
  
  // Set up audio if needed
  if (audioPlayable && item.mediaUrl && itemRef.current) {
    setAudio(item.mediaUrl);
  }
  
  const getBgColor = () => {
    return {
      primary: 'border-primary/20',
      secondary: 'border-secondary/20',
      accent: 'border-accent/20'
    }[color];
  };
  
  const getButtonBgColor = () => {
    return {
      primary: 'hover:bg-primary',
      secondary: 'hover:bg-secondary',
      accent: 'hover:bg-accent'
    }[color];
  };
  
  const getCategoryBgColor = () => {
    return {
      primary: 'bg-primary/80',
      secondary: 'bg-secondary/80',
      accent: 'bg-accent/80'
    }[color];
  };
  
  const getProgressBarColor = () => {
    return {
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      accent: 'bg-accent'
    }[color];
  };
  
  const getTagBgColor = () => {
    return {
      primary: 'bg-background/60 text-primary',
      secondary: 'bg-background/60 text-secondary',
      accent: 'bg-background/60 text-accent'
    }[color];
  };
  
  const getLinkColor = () => {
    return {
      primary: 'text-primary',
      secondary: 'text-secondary',
      accent: 'text-accent'
    }[color];
  };

  return (
    <motion.div 
      ref={itemRef}
      className="portfolio-item group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      data-category={item.category}
    >
      <div className={`bg-background/50 backdrop-blur-sm rounded-xl overflow-hidden border ${getBgColor()}`}>
        <div className="relative h-48 overflow-hidden">
          <img 
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-70"></div>
          <div className="absolute bottom-0 left-0 p-4">
            <span className={`inline-block px-3 py-1 ${getCategoryBgColor()} text-white text-xs rounded-full`}>
              {item.category.replace('-', ' ')}
            </span>
          </div>
          
          {(audioPlayable || videoPlayable) && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
              <button 
                className={`play-button bg-white/20 backdrop-blur-md text-white p-4 rounded-full ${getButtonBgColor()} transition-all duration-300`}
                onClick={audioPlayable ? togglePlay : () => {}}
              >
                <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
              </button>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-playfair font-bold mb-2">{item.title}</h3>
          <p className="text-gray-400 text-sm mb-4">{item.description}</p>
          
          {audioPlayable && (
            <div className="audio-player mt-4 flex items-center space-x-2">
              <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`progress-bar h-full ${getProgressBarColor()}`} 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-400">
                {formatTime(isPlaying ? currentTime : 0)}
              </span>
            </div>
          )}
          
          {hasLink && item.technologies && (
            <>
              <div className="flex flex-wrap space-x-2 mb-4">
                {item.technologies.map((tech, index) => (
                  <span key={index} className={`px-2 py-1 ${getTagBgColor()} text-xs rounded-md`}>
                    {tech}
                  </span>
                ))}
              </div>
              
              {item.projectUrl && (
                <a 
                  href={item.projectUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`inline-flex items-center ${getLinkColor()} hover:underline`}
                >
                  <span>Visit Project</span>
                  <i className="fas fa-arrow-right ml-2 text-xs"></i>
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};
