import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

export default function Admin() {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !genre || !audioFile) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все обязательные поля',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);

    try {
      const audioBase64 = await fileToBase64(audioFile);
      let coverBase64 = null;

      if (coverFile) {
        coverBase64 = await fileToBase64(coverFile);
      }

      const response = await fetch('https://functions.poehali.dev/2879a4f9-1c5f-40e0-ae8e-20187d69e78d', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          genre,
          audioFile: audioBase64,
          coverFile: coverBase64,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: 'Успешно!',
          description: `Трек "${title}" загружен`,
        });
        setTitle('');
        setGenre('');
        setAudioFile(null);
        setCoverFile(null);
      } else {
        throw new Error(data.error || 'Ошибка загрузки');
      }
    } catch (error) {
      toast({
        title: 'Ошибка загрузки',
        description: error instanceof Error ? error.message : 'Неизвестная ошибка',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
              <Icon name="Music" size={28} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold">Админ-панель</h1>
          </div>
          <p className="text-foreground/60">Загрузка новых треков для каталога</p>
        </div>

        <Card className="glass p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title" className="text-base mb-2 block">
                Название трека *
              </Label>
              <Input
                id="title"
                placeholder="Цифровой рассвет"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="glass"
                required
              />
            </div>

            <div>
              <Label htmlFor="genre" className="text-base mb-2 block">
                Жанр *
              </Label>
              <select
                id="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full h-10 px-3 rounded-lg glass focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Выберите жанр</option>
                <option value="Ambient">Ambient</option>
                <option value="Electronic">Electronic</option>
                <option value="Synthwave">Synthwave</option>
                <option value="Techno">Techno</option>
                <option value="IDM">IDM</option>
                <option value="Chillout">Chillout</option>
              </select>
            </div>

            <div>
              <Label htmlFor="audio" className="text-base mb-2 block">
                Аудио файл (MP3) *
              </Label>
              <div className="relative">
                <input
                  id="audio"
                  type="file"
                  accept="audio/mp3,audio/mpeg"
                  onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                  className="hidden"
                  required
                />
                <label
                  htmlFor="audio"
                  className="flex items-center justify-center gap-2 h-32 border-2 border-dashed border-primary/50 rounded-lg glass cursor-pointer hover:border-primary transition-colors"
                >
                  {audioFile ? (
                    <div className="text-center">
                      <Icon name="CheckCircle2" size={32} className="mx-auto mb-2 text-green-500" />
                      <p className="text-sm font-medium">{audioFile.name}</p>
                      <p className="text-xs text-foreground/60">{(audioFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Icon name="Upload" size={32} className="mx-auto mb-2 text-foreground/40" />
                      <p className="text-sm text-foreground/60">Нажмите для загрузки аудио</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div>
              <Label htmlFor="cover" className="text-base mb-2 block">
                Обложка (JPG, PNG)
              </Label>
              <div className="relative">
                <input
                  id="cover"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
                <label
                  htmlFor="cover"
                  className="flex items-center justify-center gap-2 h-32 border-2 border-dashed border-foreground/20 rounded-lg glass cursor-pointer hover:border-foreground/40 transition-colors"
                >
                  {coverFile ? (
                    <div className="text-center">
                      <Icon name="CheckCircle2" size={32} className="mx-auto mb-2 text-green-500" />
                      <p className="text-sm font-medium">{coverFile.name}</p>
                      <p className="text-xs text-foreground/60">{(coverFile.size / 1024).toFixed(2)} KB</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Icon name="Image" size={32} className="mx-auto mb-2 text-foreground/40" />
                      <p className="text-sm text-foreground/60">Нажмите для загрузки обложки (опционально)</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full gradient-primary"
              size="lg"
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                  Загрузка...
                </>
              ) : (
                <>
                  <Icon name="Upload" size={20} className="mr-2" />
                  Загрузить трек
                </>
              )}
            </Button>
          </form>
        </Card>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors"
          >
            <Icon name="ArrowLeft" size={16} />
            Вернуться на главную
          </a>
        </div>
      </div>
    </div>
  );
}
