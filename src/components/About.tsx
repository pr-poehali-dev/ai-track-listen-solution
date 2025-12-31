import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Об авторе</h2>

          <div className="glass rounded-3xl p-8 md:p-12 mb-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="relative">
                <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent p-1">
                  <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                    <Icon name="User" size={80} className="text-primary" />
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-3xl font-bold mb-4">Пачук Константин</h3>
                <p className="text-foreground/80 mb-4 leading-relaxed">
                  Пионер в области музыки, созданной искусственным интеллектом. 
                  Начал эксперименты с нейросетями в 2020 году и с тех пор создал 
                  более 1000 уникальных композиций, которые покорили сердца слушателей 
                  по всему миру.
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  Миссия: показать, что технологии и творчество могут создавать 
                  что-то по-настоящему прекрасное, когда работают вместе.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass p-6 text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                <Icon name="Award" size={32} />
              </div>
              <h4 className="font-semibold mb-2">Награды</h4>
              <p className="text-sm text-foreground/60">
                Победитель AI Music Awards 2023
              </p>
            </Card>

            <Card className="glass p-6 text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                <Icon name="Disc3" size={32} />
              </div>
              <h4 className="font-semibold mb-2">Релизы</h4>
              <p className="text-sm text-foreground/60">
                Более 1000 треков в каталоге
              </p>
            </Card>

            <Card className="glass p-6 text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                <Icon name="Users" size={32} />
              </div>
              <h4 className="font-semibold mb-2">Сообщество</h4>
              <p className="text-sm text-foreground/60">
                50K+ активных слушателей
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
