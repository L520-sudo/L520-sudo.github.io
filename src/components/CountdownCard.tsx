import { useState, useEffect, useRef } from 'react';
import { PartyPopper, Calendar, Sparkles, RefreshCw, Play, Pause } from 'lucide-react';
import { BirthdayStats } from '../utils/dateUtils';

interface CountdownCardProps {
  stats: BirthdayStats;
  birthDate: string;
}

const BIRTHDAY_QUOTES = [
  '🎉 每一天都是珍贵的礼物，好好享受生活！',
  '🎂 愿你每一岁都奔走在热爱里，生日快乐！',
  '🌟 新的一岁，愿你所念皆成真，所行皆坦途！',
  '🎁 生日是生命的起点，愿你永远保持童心！',
  '🎈 岁月如歌，愿你每一个生日都充满欢笑！',
];

const AUTO_PLAY_INTERVAL = 5000;

function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{displayValue.toLocaleString()}</span>;
}

export default function CountdownCard({ stats, birthDate }: CountdownCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentQuote, setCurrentQuote] = useState('');
  const [isFading, setIsFading] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * BIRTHDAY_QUOTES.length);
    return BIRTHDAY_QUOTES[randomIndex];
  };

  useEffect(() => {
    setCurrentQuote(getRandomQuote());
  }, []);

  useEffect(() => {
    if (isAutoPlay) {
      timerRef.current = setInterval(() => {
        setIsFading(true);
        setTimeout(() => {
          setCurrentQuote(getRandomQuote());
          setIsFading(false);
        }, 300);
      }, AUTO_PLAY_INTERVAL);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isAutoPlay]);

  const refreshQuote = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentQuote(getRandomQuote());
      setIsFading(false);
    }, 300);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  return (
    <div
      className="relative w-full max-w-md mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-cyan-400/20 rounded-3xl blur-xl transition-all duration-500"
        style={{
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
      />
      
      <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/50">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-cyan-500 flex items-center justify-center shadow-lg">
              <PartyPopper className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            生日快乐倒计时
          </h1>
          <p className="text-gray-500 text-sm flex items-center justify-center gap-1">
            <Calendar className="w-4 h-4" />
            出生日期: {birthDate}
          </p>
        </div>

        <div className="mt-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-1">距离下一个生日还有</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-6xl font-bold bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">
                <AnimatedNumber value={stats.nextBirthdayDays} />
              </span>
              <span className="text-2xl text-gray-500">天</span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-4 text-center hover:scale-105 transition-transform duration-300">
              <p className="text-3xl font-bold text-pink-600">
                <AnimatedNumber value={stats.daysSinceBirth} />
              </p>
              <p className="text-xs text-pink-500 mt-1">出生天数</p>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-4 text-center hover:scale-105 transition-transform duration-300">
              <p className="text-3xl font-bold text-cyan-600">{stats.age}</p>
              <p className="text-xs text-cyan-500 mt-1">当前年龄</p>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-4 text-center hover:scale-105 transition-transform duration-300">
              <p className="text-3xl font-bold text-yellow-600">{stats.lifePercentage}%</p>
              <p className="text-xs text-yellow-500 mt-1">人生进度</p>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100">
              <span className="text-sm text-gray-500">星座:</span>
              <span className="ml-2 font-semibold text-pink-600">{stats.zodiacSign}</span>
            </div>
            <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100">
              <span className="text-sm text-gray-500">生肖:</span>
              <span className="ml-2 font-semibold text-cyan-600">{stats.chineseZodiac}</span>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>人生进度条</span>
              <span>{stats.lifePercentage}%</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${stats.lifePercentage}%` }}
              />
            </div>
          </div>

          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-2">
              <p
                className={`text-gray-400 text-sm transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}
              >
                {currentQuote}
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={toggleAutoPlay}
                  className="p-1.5 rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-110 group"
                  title={isAutoPlay ? '暂停自动播放' : '开始自动播放'}
                >
                  {isAutoPlay ? (
                    <Pause className="w-4 h-4 text-gray-300 group-hover:text-pink-500 transition-colors" />
                  ) : (
                    <Play className="w-4 h-4 text-gray-300 group-hover:text-pink-500 transition-colors" />
                  )}
                </button>
                <button
                  onClick={refreshQuote}
                  className="p-1.5 rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-110 group"
                  title="换一条语录"
                >
                  <RefreshCw className="w-4 h-4 text-gray-300 group-hover:text-pink-500 transition-colors" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
