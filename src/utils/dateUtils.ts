export interface BirthdayStats {
  daysSinceBirth: number;
  nextBirthdayDays: number;
  age: number;
  zodiacSign: string;
  chineseZodiac: string;
  lifePercentage: number;
}

const ZODIAC_SIGNS = [
  { name: '摩羯座', start: [12, 22], end: [1, 19] },
  { name: '水瓶座', start: [1, 20], end: [2, 18] },
  { name: '双鱼座', start: [2, 19], end: [3, 20] },
  { name: '白羊座', start: [3, 21], end: [4, 19] },
  { name: '金牛座', start: [4, 20], end: [5, 20] },
  { name: '双子座', start: [5, 21], end: [6, 21] },
  { name: '巨蟹座', start: [6, 22], end: [7, 22] },
  { name: '狮子座', start: [7, 23], end: [8, 22] },
  { name: '处女座', start: [8, 23], end: [9, 22] },
  { name: '天秤座', start: [9, 23], end: [10, 23] },
  { name: '天蝎座', start: [10, 24], end: [11, 22] },
  { name: '射手座', start: [11, 23], end: [12, 21] },
];

const CHINESE_ZODIAC = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];

export function getZodiacSign(month: number, day: number): string {
  for (const sign of ZODIAC_SIGNS) {
    const [startMonth, startDay] = sign.start;
    const [endMonth, endDay] = sign.end;
    
    if (startMonth === endMonth) {
      if (month === startMonth && day >= startDay && day <= endDay) {
        return sign.name;
      }
    } else {
      if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
        return sign.name;
      }
    }
  }
  return '';
}

export function getChineseZodiac(year: number): string {
  const index = (year - 4) % 12;
  return CHINESE_ZODIAC[index];
}

export function calculateBirthdayStats(birthDate: string): BirthdayStats {
  const birth = new Date(birthDate);
  const today = new Date();
  
  const birthYear = birth.getFullYear();
  const birthMonth = birth.getMonth() + 1;
  const birthDay = birth.getDate();
  
  const timeDiff = today.getTime() - birth.getTime();
  const daysSinceBirth = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  
  let nextBirthday = new Date(today.getFullYear(), birthMonth - 1, birthDay);
  if (nextBirthday < today) {
    nextBirthday = new Date(today.getFullYear() + 1, birthMonth - 1, birthDay);
  }
  
  const nextBirthdayTimeDiff = nextBirthday.getTime() - today.getTime();
  const nextBirthdayDays = Math.ceil(nextBirthdayTimeDiff / (1000 * 60 * 60 * 24));
  
  let age = today.getFullYear() - birthYear;
  const thisYearBirthday = new Date(today.getFullYear(), birthMonth - 1, birthDay);
  if (today < thisYearBirthday) {
    age--;
  }
  
  const avgLifeExpectancy = 80;
  const lifePercentage = Math.min(100, ((today.getFullYear() - birthYear) / avgLifeExpectancy) * 100);
  
  return {
    daysSinceBirth,
    nextBirthdayDays,
    age,
    zodiacSign: getZodiacSign(birthMonth, birthDay),
    chineseZodiac: getChineseZodiac(birthYear),
    lifePercentage: Math.round(lifePercentage * 10) / 10,
  };
}
