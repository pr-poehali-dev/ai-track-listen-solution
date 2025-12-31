import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Свяжитесь с нами</h2>
          <p className="text-center text-foreground/60 mb-12 max-w-2xl mx-auto">
            Есть вопросы или предложения? Мы всегда рады услышать от вас
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="glass p-8">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Имя</label>
                  <Input placeholder="Ваше имя" className="glass" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input type="email" placeholder="your@email.com" className="glass" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Тема</label>
                  <Input placeholder="О чем вы хотите написать?" className="glass" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Сообщение</label>
                  <Textarea 
                    placeholder="Ваше сообщение..." 
                    className="glass min-h-32"
                  />
                </div>

                <Button className="w-full gradient-primary" size="lg">
                  <Icon name="Send" size={20} className="mr-2" />
                  Отправить сообщение
                </Button>
              </form>
            </Card>

            <div className="space-y-6">
              <Card className="glass p-6 hover:scale-105 transition-transform">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                    <Icon name="Mail" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-foreground/60">contact@aimusic.ru</p>
                  </div>
                </div>
              </Card>

              <Card className="glass p-6 hover:scale-105 transition-transform">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                    <Icon name="MessageCircle" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Telegram</h3>
                    <p className="text-foreground/60">@aimusic_support</p>
                  </div>
                </div>
              </Card>

              <Card className="glass p-6 hover:scale-105 transition-transform">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                    <Icon name="Instagram" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Instagram</h3>
                    <p className="text-foreground/60">@pachuk.ai.music</p>
                  </div>
                </div>
              </Card>

              <Card className="glass p-6">
                <h3 className="font-semibold mb-4">Соцсети</h3>
                <div className="flex gap-4">
                  <Button variant="outline" size="icon" className="glass hover:scale-110 transition-transform">
                    <Icon name="Music" size={20} />
                  </Button>
                  <Button variant="outline" size="icon" className="glass hover:scale-110 transition-transform">
                    <Icon name="Youtube" size={20} />
                  </Button>
                  <Button variant="outline" size="icon" className="glass hover:scale-110 transition-transform">
                    <Icon name="Twitter" size={20} />
                  </Button>
                  <Button variant="outline" size="icon" className="glass hover:scale-110 transition-transform">
                    <Icon name="Facebook" size={20} />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
