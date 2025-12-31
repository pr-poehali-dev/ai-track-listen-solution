import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  cover: string;
}

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([70]);
  const [progress, setProgress] = useState([30]);

  const currentTrack: Track = {
    id: 1,
    title: "Цифровой рассвет",
    artist: "Пачук Константин",
    duration: "3:45",
    cover: "https://images.unsplash.com/photo-1619983081563-430f63602796?w=300&h=300&fit=crop"
  };

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
                    value={progress} 
                    onValueChange={setProgress}
                    max={100}
                    step={1}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-foreground/60">
                    <span>1:15</span>
                    <span>{currentTrack.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 mb-6">
                  <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
                    <Icon name="SkipBack" size={24} />
                  </Button>
                  
                  <Button 
                    size="icon" 
                    className="w-16 h-16 rounded-full gradient-primary hover:scale-110 transition-transform"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    <Icon name={isPlaying ? "Pause" : "Play"} size={28} />
                  </Button>
                  
                  <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
                    <Icon name="SkipForward" size={24} />
                  </Button>
                </div>

                <div className="flex items-center gap-4">
                  <Icon name="Volume2" size={20} className="text-foreground/60" />
                  <Slider 
                    value={volume} 
                    onValueChange={setVolume}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm text-foreground/60 w-10">{volume[0]}%</span>
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
