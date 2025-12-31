import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { useAudio } from '@/hooks/useAudio';

interface Track {
  id: number;
  title: string;
  artist: string;
  audioUrl: string;
  cover: string;
}

const defaultTracks: Track[] = [
  {
    id: 1,
    title: "Цифровой рассвет",
    artist: "Пачук Константин",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://images.unsplash.com/photo-1619983081563-430f63602796?w=300&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Электронные мечты",
    artist: "Пачук Константин",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Синтетическая душа",
    artist: "Пачук Константин",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [tracks, setTracks] = useState<Track[]>(defaultTracks);
  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/2879a4f9-1c5f-40e0-ae8e-20187d69e78d');
        const data = await response.json();
        if (data.tracks && data.tracks.length > 0) {
          const uploadedTracks = data.tracks.map((track: any) => ({
            id: track.id,
            title: track.title,
            artist: track.artist || 'Пачук Константин',
            audioUrl: track.audioUrl,
            cover: track.cover
          }));
          setTracks([...defaultTracks, ...uploadedTracks]);
        }
      } catch (error) {
        console.error('Ошибка загрузки треков:', error);
      }
    };

    fetchTracks();
  }, []);
  
  const { 
    isPlaying, 
    currentTime, 
    duration, 
    volume, 
    togglePlay, 
    setVolume, 
    seek,
    loadTrack 
  } = useAudio(currentTrack.audioUrl);

  useEffect(() => {
    loadTrack(currentTrack.audioUrl);
  }, [currentTrackIndex]);

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (value: number[]) => {
    const newTime = (value[0] / 100) * duration;
    seek(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex((prev) => (prev > 0 ? prev - 1 : tracks.length - 1));
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev < tracks.length - 1 ? prev + 1 : 0));
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section id="player" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Плеер</h2>
          
          <div className="glass rounded-3xl p-8 animate-scale-in">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="relative group">
                <img 
                  src={currentTrack.cover} 
                  alt={currentTrack.title}
                  className="w-64 h-64 rounded-2xl object-cover shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="flex-1 w-full">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{currentTrack.title}</h3>
                  <p className="text-foreground/60">{currentTrack.artist}</p>
                </div>

                <div className="mb-6">
                  <Slider 
                    value={[progressPercent]} 
                    onValueChange={handleProgressChange}
                    max={100}
                    step={0.1}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-foreground/60">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 mb-6">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="hover:scale-110 transition-transform"
                    onClick={handlePrevTrack}
                  >
                    <Icon name="SkipBack" size={24} />
                  </Button>
                  
                  <Button 
                    size="icon" 
                    className="w-16 h-16 rounded-full gradient-primary hover:scale-110 transition-transform"
                    onClick={togglePlay}
                  >
                    <Icon name={isPlaying ? "Pause" : "Play"} size={28} />
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="hover:scale-110 transition-transform"
                    onClick={handleNextTrack}
                  >
                    <Icon name="SkipForward" size={24} />
                  </Button>
                </div>

                <div className="flex items-center gap-4">
                  <Icon name="Volume2" size={20} className="text-foreground/60" />
                  <Slider 
                    value={[volume]} 
                    onValueChange={handleVolumeChange}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm text-foreground/60 w-10">{volume}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="glass hover:scale-105 transition-transform">
              <Icon name="Repeat" size={18} className="mr-2" />
              Повтор
            </Button>
            <Button variant="outline" className="glass hover:scale-105 transition-transform">
              <Icon name="Shuffle" size={18} className="mr-2" />
              Случайно
            </Button>
            <Button variant="outline" className="glass hover:scale-105 transition-transform">
              <Icon name="ListMusic" size={18} className="mr-2" />
              Плейлист
            </Button>
            <Button variant="outline" className="glass hover:scale-105 transition-transform">
              <Icon name="Heart" size={18} className="mr-2" />
              Избранное
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}