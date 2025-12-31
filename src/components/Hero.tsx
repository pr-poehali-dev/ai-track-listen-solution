import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 animate-pulse-glow" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm">Более 1000 треков озвученных ИИ</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Музыка будущего уже здесь
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Откройте для себя уникальные треки, созданные искусственным интеллектом. 
            Автор: Пачук Константин
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button size="lg" className="gradient-primary text-lg px-8 hover:scale-105 transition-transform">
              <Icon name="Play" size={20} className="mr-2" />
              Начать слушать
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 hover:scale-105 transition-transform">
              <Icon name="Headphones" size={20} className="mr-2" />
              Каталог треков
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="glass p-4 rounded-xl">
              <div className="text-3xl font-bold text-primary mb-1">1000+</div>
              <div className="text-sm text-foreground/60">Треков</div>
            </div>
            <div className="glass p-4 rounded-xl">
              <div className="text-3xl font-bold text-secondary mb-1">50K+</div>
              <div className="text-sm text-foreground/60">Слушателей</div>
            </div>
            <div className="glass p-4 rounded-xl">
              <div className="text-3xl font-bold text-accent mb-1">24/7</div>
              <div className="text-sm text-foreground/60">Доступ</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={32} className="text-foreground/40" />
      </div>
    </section>
  );
}
