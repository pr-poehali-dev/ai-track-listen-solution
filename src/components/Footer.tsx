import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                <Icon name="Music" size={24} className="text-white" />
              </div>
              <span className="text-xl font-bold">AI Music</span>
            </div>
            <p className="text-foreground/60 text-sm">
              Музыка будущего от Пачука Константина. Создано с помощью ИИ.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="text-foreground/60 hover:text-foreground transition-colors">
                  Главная
                </a>
              </li>
              <li>
                <a href="#catalog" className="text-foreground/60 hover:text-foreground transition-colors">
                  Каталог
                </a>
              </li>
              <li>
                <a href="#about" className="text-foreground/60 hover:text-foreground transition-colors">
                  Об авторе
                </a>
              </li>
              <li>
                <a href="#subscription" className="text-foreground/60 hover:text-foreground transition-colors">
                  Подписка
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Правовая информация</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
                  Условия использования
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
                  Политика конфиденциальности
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
                  Лицензионное соглашение
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Подписка на новости</h4>
            <p className="text-foreground/60 text-sm mb-4">
              Получайте новости о новых треках и обновлениях
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email"
                className="flex-1 px-3 py-2 rounded-lg glass text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-4 py-2 rounded-lg gradient-primary hover:scale-105 transition-transform">
                <Icon name="Send" size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-foreground/60 text-sm">
            © 2024 AI Music. Все права защищены. Автор: Пачук Константин
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
              <Icon name="Instagram" size={20} />
            </a>
            <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
              <Icon name="Youtube" size={20} />
            </a>
            <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
              <Icon name="Twitter" size={20} />
            </a>
            <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
              <Icon name="Music" size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
