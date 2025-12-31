import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const plans = [
  {
    name: "Бесплатный",
    price: "0₽",
    period: "навсегда",
    features: [
      { text: "100 треков в месяц", included: true },
      { text: "Стандартное качество", included: true },
      { text: "Реклама", included: true },
      { text: "Рекомендации", included: false },
      { text: "Офлайн режим", included: false },
      { text: "Ранний доступ", included: false },
    ],
    popular: false,
  },
  {
    name: "Премиум",
    price: "299₽",
    period: "в месяц",
    features: [
      { text: "Безлимитное прослушивание", included: true },
      { text: "Hi-Fi качество", included: true },
      { text: "Без рекламы", included: true },
      { text: "Умные рекомендации", included: true },
      { text: "Офлайн режим", included: true },
      { text: "Ранний доступ к новинкам", included: false },
    ],
    popular: true,
  },
  {
    name: "Профи",
    price: "599₽",
    period: "в месяц",
    features: [
      { text: "Всё из Премиум", included: true },
      { text: "Studio качество", included: true },
      { text: "Без рекламы", included: true },
      { text: "AI-рекомендации Pro", included: true },
      { text: "Приоритетная поддержка", included: true },
      { text: "Эксклюзивные треки", included: true },
    ],
    popular: false,
  },
];

export default function Subscription() {
  return (
    <section id="subscription" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Выберите свой план</h2>
          <p className="text-center text-foreground/60 mb-12 max-w-2xl mx-auto">
            Получите максимум от AI-музыки с нашими гибкими тарифами
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={index}
                className={`glass p-8 relative hover:scale-105 transition-all ${
                  plan.popular ? 'ring-2 ring-primary' : ''
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 gradient-primary">
                    Популярный
                  </Badge>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-foreground/60">/ {plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Icon 
                        name={feature.included ? "CheckCircle2" : "XCircle"} 
                        size={20} 
                        className={feature.included ? "text-green-500 flex-shrink-0" : "text-foreground/30 flex-shrink-0"}
                      />
                      <span className={feature.included ? "" : "text-foreground/40"}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${plan.popular ? 'gradient-primary' : ''}`}
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                >
                  {plan.name === "Бесплатный" ? "Начать бесплатно" : "Оформить подписку"}
                </Button>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-foreground/60 mb-4">
              Все планы включают 14 дней бесплатного пробного периода
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-foreground/60">
              <div className="flex items-center gap-2">
                <Icon name="Shield" size={16} />
                <span>Безопасная оплата</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="RotateCcw" size={16} />
                <span>Отмена в любой момент</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
