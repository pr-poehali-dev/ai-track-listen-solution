import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface TrackCardProps {
  title: string;
  genre: string;
  duration: string;
  plays: string;
  cover: string;
}

export default function TrackCard({ title, genre, duration, plays, cover }: TrackCardProps) {
  return (
    <div className="glass rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 group cursor-pointer">
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={cover} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <Button 
          size="icon"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full gradient-primary opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Icon name="Play" size={24} />
        </Button>

        <Badge className="absolute top-3 right-3 bg-accent">
          {genre}
        </Badge>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 truncate">{title}</h3>
        <div className="flex items-center justify-between text-sm text-foreground/60">
          <div className="flex items-center gap-1">
            <Icon name="Clock" size={14} />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Play" size={14} />
            <span>{plays}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
