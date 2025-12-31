import { useState, useEffect, useRef } from 'react';

interface UseAudioReturn {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  seek: (time: number) => void;
  loadTrack: (url: string) => void;
}

export function useAudio(initialUrl?: string): UseAudioReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(70);

  useEffect(() => {
    audioRef.current = new Audio(initialUrl);
    audioRef.current.volume = volume / 100;

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, [initialUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const setVolume = (newVolume: number) => {
    if (!audioRef.current) return;
    setVolumeState(newVolume);
    audioRef.current.volume = newVolume / 100;
  };

  const seek = (time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const loadTrack = (url: string) => {
    if (!audioRef.current) return;
    
    const wasPlaying = isPlaying;
    audioRef.current.pause();
    audioRef.current.src = url;
    audioRef.current.load();
    
    if (wasPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
    
    setCurrentTime(0);
  };

  return {
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay,
    setVolume,
    seek,
    loadTrack,
  };
}
