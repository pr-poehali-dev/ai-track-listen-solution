import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
            <Icon name="Music" size={24} className="text-white" />
          </div>
          <h1 className="text-xl font-bold">AI Music</h1>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <button onClick={() => scrollToSection('home')} className="text-foreground/80 hover:text-foreground transition-colors">
            Главная
          </button>
          <button onClick={() => scrollToSection('catalog')} className="text-foreground/80 hover:text-foreground transition-colors">
            Каталог
          </button>
          <button onClick={() => scrollToSection('about')} className="text-foreground/80 hover:text-foreground transition-colors">
            Об авторе
          </button>
          <button onClick={() => scrollToSection('subscription')} className="text-foreground/80 hover:text-foreground transition-colors">
            Подписка
          </button>
          <button onClick={() => scrollToSection('contact')} className="text-foreground/80 hover:text-foreground transition-colors">
            Контакты
          </button>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm">
            Войти
          </Button>
          <a href="/admin">
            <Button className="gradient-primary" size="sm">
              <Icon name="Upload" size={16} className="mr-1" />
              Админ
            </Button>
          </a>
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden glass border-t border-white/10 animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <button onClick={() => scrollToSection('home')} className="text-left text-foreground/80 hover:text-foreground transition-colors">
              Главная
            </button>
            <button onClick={() => scrollToSection('catalog')} className="text-left text-foreground/80 hover:text-foreground transition-colors">
              Каталог
            </button>
            <button onClick={() => scrollToSection('about')} className="text-left text-foreground/80 hover:text-foreground transition-colors">
              Об авторе
            </button>
            <button onClick={() => scrollToSection('subscription')} className="text-left text-foreground/80 hover:text-foreground transition-colors">
              Подписка
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-left text-foreground/80 hover:text-foreground transition-colors">
              Контакты
            </button>
            <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
              <Button variant="ghost" size="sm" className="w-full">
                Войти
              </Button>
              <Button className="gradient-primary w-full" size="sm">
                Начать
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}