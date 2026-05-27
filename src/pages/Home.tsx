import { useState } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import CountdownCard from '../components/CountdownCard';
import { calculateBirthdayStats } from '../utils/dateUtils';

const DEFAULT_BIRTH_DATE = '2003-12-23';

export default function Home() {
  const [birthDate, setBirthDate] = useState(DEFAULT_BIRTH_DATE);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const stats = calculateBirthdayStats(birthDate);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDate(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-cyan-50 relative overflow-hidden">
      <ParticleBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="bg-white/80 backdrop-blur-lg rounded-full px-6 py-2 shadow-lg border border-white/50 flex items-center gap-2 hover:bg-white/90 transition-all duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-700 font-medium">修改生日</span>
          </button>
        </div>

        {showDatePicker && (
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/50 mb-6 max-w-md mx-auto">
            <label className="block text-gray-600 text-sm font-medium mb-3">选择您的出生日期</label>
            <input
              type="date"
              value={birthDate}
              onChange={handleDateChange}
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all duration-300 bg-white"
            />
            <p className="text-gray-400 text-xs mt-3 text-center">当前日期: {new Date().toLocaleDateString('zh-CN')}</p>
          </div>
        )}

        <CountdownCard stats={stats} birthDate={birthDate} />
      </div>
    </div>
  );
}
