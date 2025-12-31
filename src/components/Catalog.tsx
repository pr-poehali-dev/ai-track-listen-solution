import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import TrackCard from './TrackCard';

const tracks = [
  { id: 1, title: "Цифровой рассвет", genre: "Ambient", duration: "3:45", plays: "12.5K", cover: "https://images.unsplash.com/photo-1619983081563-430f63602796?w=400&h=400&fit=crop" },
  { id: 2, title: "Электронные мечты", genre: "Electronic", duration: "4:12", plays: "8.3K", cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop" },
  { id: 3, title: "Синтетическая душа", genre: "Synthwave", duration: "5:20", plays: "15.2K", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop" },
  { id: 4, title: "Нейронная сеть", genre: "Techno", duration: "3:58", plays: "9.7K", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop" },
  { id: 5, title: "Квантовый резонанс", genre: "IDM", duration: "4:33", plays: "11.1K", cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop" },
  { id: 6, title: "Алгоритм любви", genre: "Chillout", duration: "6:15", plays: "18.4K", cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop" },
];

const genres = ["Все", "Ambient", "Electronic", "Synthwave", "Techno", "IDM", "Chillout"];

export default function Catalog() {
  const [selectedGenre, setSelectedGenre] = useState("Все");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTracks = tracks.filter(track => {
    const matchesGenre = selectedGenre === "Все" || track.genre === selectedGenre;
    const matchesSearch = track.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  return (
    <section id="catalog" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center">Каталог треков</h2>
        <p className="text-center text-foreground/60 mb-12 max-w-2xl mx-auto">
          Исследуйте коллекцию уникальных AI-треков с умной системой рекомендаций
        </p>

        <div className="max-w-6xl mx-auto mb-8">
          <div className="relative mb-6">
            <Icon name="Search" size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/40" />
            <Input 
              placeholder="Поиск по названию трека..."
              className="pl-12 h-12 glass"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {genres.map(genre => (
              <Button
                key={genre}
                variant={selectedGenre === genre ? "default" : "outline"}
                className={selectedGenre === genre ? "gradient-primary" : "glass"}
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTracks.map(track => (
              <TrackCard key={track.id} {...track} />
            ))}
          </div>

          {filteredTracks.length === 0 && (
            <div className="text-center py-12">
              <Icon name="SearchX" size={48} className="mx-auto mb-4 text-foreground/40" />
              <p className="text-foreground/60">Треки не найдены. Попробуйте другой запрос.</p>
            </div>
          )}

          <div className="mt-12 text-center">
            <Button size="lg" className="gradient-primary">
              Загрузить еще
              <Icon name="ChevronDown" size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
