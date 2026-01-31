import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [selectedOccasion, setSelectedOccasion] = useState('birthday');
  const [selectedStyle, setSelectedStyle] = useState('modern');
  const [duration, setDuration] = useState([30]);
  const [selectedMusic, setSelectedMusic] = useState('upbeat');
  const [greetingText, setGreetingText] = useState('');

  const occasions = [
    { id: 'birthday', label: 'День Рождения', icon: 'Cake', gradient: 'from-pink-500 to-purple-500' },
    { id: 'wedding', label: 'Свадьба', icon: 'Heart', gradient: 'from-red-500 to-pink-500' },
    { id: 'holiday', label: 'Праздник', icon: 'Sparkles', gradient: 'from-blue-500 to-cyan-500' },
    { id: 'anniversary', label: 'Годовщина', icon: 'Gift', gradient: 'from-purple-500 to-indigo-500' },
  ];

  const videoStyles = [
    { id: 'modern', label: 'Современный', description: 'Минимализм и элегантность' },
    { id: 'festive', label: 'Праздничный', description: 'Яркие цвета и анимации' },
    { id: 'romantic', label: 'Романтичный', description: 'Нежные переходы' },
    { id: 'professional', label: 'Деловой', description: 'Строгий стиль' },
  ];

  const musicLibrary = [
    { id: 'upbeat', name: 'Upbeat Joy', duration: '2:45', mood: '🎉' },
    { id: 'romantic', name: 'Romantic Piano', duration: '3:20', mood: '💕' },
    { id: 'energetic', name: 'Energetic Beat', duration: '2:15', mood: '⚡' },
    { id: 'calm', name: 'Calm Acoustic', duration: '3:00', mood: '🌿' },
    { id: 'epic', name: 'Epic Orchestral', duration: '2:50', mood: '🎬' },
    { id: 'funky', name: 'Funky Groove', duration: '2:30', mood: '🕺' },
  ];

  const soundEffects = [
    { id: 'confetti', name: 'Конфетти', icon: 'Sparkles' },
    { id: 'applause', name: 'Аплодисменты', icon: 'Volume2' },
    { id: 'bells', name: 'Колокольчики', icon: 'Bell' },
    { id: 'fireworks', name: 'Салют', icon: 'Zap' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4">
            <Icon name="Video" size={40} className="text-primary" />
            <h1 className="text-5xl font-bold gradient-text">VideoGreet AI</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Создавайте персональные видео-поздравления с помощью нейросети
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-card border-primary/20 animate-scale-in">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Icon name="Wand2" className="text-primary" />
                  Выберите повод
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {occasions.map((occasion) => (
                    <button
                      key={occasion.id}
                      onClick={() => setSelectedOccasion(occasion.id)}
                      className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                        selectedOccasion === occasion.id
                          ? `bg-gradient-to-br ${occasion.gradient} shadow-lg shadow-primary/50`
                          : 'glass-card hover:border-primary/40'
                      }`}
                    >
                      <Icon 
                        name={occasion.icon as any} 
                        size={32} 
                        className={selectedOccasion === occasion.id ? 'text-white' : 'text-primary'} 
                      />
                      <p className={`mt-3 font-semibold ${selectedOccasion === occasion.id ? 'text-white' : 'text-foreground'}`}>
                        {occasion.label}
                      </p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/20">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Icon name="Palette" className="text-secondary" />
                  Стиль видео
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {videoStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`p-5 rounded-xl text-left transition-all duration-300 hover:scale-105 ${
                        selectedStyle === style.id
                          ? 'bg-gradient-to-br from-secondary to-primary shadow-lg border-2 border-secondary'
                          : 'glass-card hover:border-primary/40'
                      }`}
                    >
                      <p className={`font-semibold mb-1 ${selectedStyle === style.id ? 'text-white' : 'text-foreground'}`}>
                        {style.label}
                      </p>
                      <p className={`text-sm ${selectedStyle === style.id ? 'text-white/80' : 'text-muted-foreground'}`}>
                        {style.description}
                      </p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/20">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Icon name="MessageSquare" className="text-accent" />
                  Текст поздравления
                </h2>
                <Textarea
                  placeholder="Введите текст вашего поздравления..."
                  value={greetingText}
                  onChange={(e) => setGreetingText(e.target.value)}
                  className="min-h-[120px] bg-background/50 border-primary/20 focus:border-primary text-base"
                />
                <div className="mt-4">
                  <label className="text-sm font-medium mb-3 block flex items-center gap-2">
                    <Icon name="Clock" size={16} />
                    Длительность: {duration[0]} секунд
                  </label>
                  <Slider
                    value={duration}
                    onValueChange={setDuration}
                    min={15}
                    max={60}
                    step={5}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/20">
              <CardContent className="pt-6">
                <Tabs defaultValue="music" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="music" className="text-base">
                      <Icon name="Music" size={18} className="mr-2" />
                      Музыка
                    </TabsTrigger>
                    <TabsTrigger value="effects" className="text-base">
                      <Icon name="Sparkles" size={18} className="mr-2" />
                      Эффекты
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="music" className="space-y-3 mt-0">
                    {musicLibrary.map((track) => (
                      <button
                        key={track.id}
                        onClick={() => setSelectedMusic(track.id)}
                        className={`w-full p-4 rounded-xl flex items-center justify-between transition-all duration-200 hover:scale-[1.02] ${
                          selectedMusic === track.id
                            ? 'bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary'
                            : 'glass-card hover:border-primary/40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{track.mood}</div>
                          <div className="text-left">
                            <p className="font-semibold">{track.name}</p>
                            <p className="text-sm text-muted-foreground">{track.duration}</p>
                          </div>
                        </div>
                        {selectedMusic === track.id && (
                          <Icon name="Check" className="text-primary" size={20} />
                        )}
                      </button>
                    ))}
                  </TabsContent>

                  <TabsContent value="effects" className="grid grid-cols-2 gap-3 mt-0">
                    {soundEffects.map((effect) => (
                      <button
                        key={effect.id}
                        className="p-4 rounded-xl glass-card hover:border-primary/40 transition-all duration-200 hover:scale-105 flex flex-col items-center gap-2"
                      >
                        <Icon name={effect.icon as any} size={24} className="text-accent" />
                        <span className="text-sm font-medium">{effect.name}</span>
                      </button>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <Card className="glass-card border-primary/20 overflow-hidden animate-scale-in">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-primary via-secondary to-accent aspect-video flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10 text-center animate-float">
                      <Icon name="Play" size={64} className="text-white mx-auto mb-3" />
                      <p className="text-white font-semibold">Предпросмотр</p>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Повод:</span>
                      <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/40">
                        {occasions.find(o => o.id === selectedOccasion)?.label}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Стиль:</span>
                      <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/40">
                        {videoStyles.find(s => s.id === selectedStyle)?.label}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Музыка:</span>
                      <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/40">
                        {musicLibrary.find(m => m.id === selectedMusic)?.name}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button 
                size="lg" 
                className="w-full text-lg font-bold bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-opacity shadow-lg shadow-primary/50 h-14"
              >
                <Icon name="Wand2" className="mr-2" size={20} />
                Создать видео
              </Button>

              <div className="flex gap-3">
                <Button variant="outline" size="lg" className="flex-1 border-primary/40 hover:bg-primary/10">
                  <Icon name="Download" className="mr-2" size={18} />
                  Скачать
                </Button>
                <Button variant="outline" size="lg" className="flex-1 border-accent/40 hover:bg-accent/10">
                  <Icon name="Share2" className="mr-2" size={18} />
                  Поделиться
                </Button>
              </div>

              <Card className="glass-card border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Send" size={18} className="text-primary" />
                    Отправить в соцсети
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {['MessageCircle', 'Instagram', 'Facebook', 'Twitter'].map((social) => (
                      <Button
                        key={social}
                        variant="outline"
                        size="sm"
                        className="border-primary/30 hover:bg-primary/10"
                      >
                        <Icon name={social as any} size={16} className="mr-2" />
                        {social === 'MessageCircle' ? 'WhatsApp' : social}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
