const liurenArray = ['大安', '留連', '速喜', '赤口', '小吉', '空亡'];
const shichenArray = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const shichenTimeMap = [
  '23:00 - 00:59', '01:00 - 02:59', '03:00 - 04:59', '05:00 - 06:59',
  '07:00 - 08:59', '09:00 - 10:59', '11:00 - 12:59', '13:00 - 14:59',
  '15:00 - 16:59', '17:00 - 18:59', '19:00 - 20:59', '21:00 - 22:59'
];

const explanations = {
      '大安': '萬事順利，平安為上，適合安定、結婚、談判等事。',
      '留連': '事情反覆、拖延難決，宜靜不宜動。',
      '速喜': '有喜慶、來得快的好消息，適合求財、交涉、戀愛。',
      '赤口': '是非之日，易有爭吵、口舌之災，宜避開重大交涉。',
      '小吉': '小有收穫，雖不大但吉利，宜謹慎進行。',
      '空亡': '空虛無果，容易失望、落空，不利行動，宜等待時機。'
    };

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

function highlight(idx) {
  liurenArray.forEach((item, i) => {
    const el = document.getElementById(item);
    if (el) {
      el.classList.toggle('highlight', i === idx);
    }
  });
}

function startDivination() {
  const now = new Date();
  const solar = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate()
  };

  function getShichenIndex(hour) {
    if (hour === 23 || hour === 0) return 0;
    return Math.floor((hour - 1) / 2) + 1;
  }

// 強制使用台灣時間（GMT+8）取小時
function getTaiwanHour() {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000); // UTC 毫秒值
  const taiwanTime = new Date(utc + (8 * 60 * 60 * 1000));       // 加 8 小時 → GMT+8
  return taiwanTime.getHours();
}

  // Time display
  const localeTimeStr = now.toLocaleString();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const lunar = solarlunar.solar2lunar(solar.year, solar.month, solar.day);
  const hour = now.getHours();
  const hour_index = getShichenIndex(hour);
  const shichen = shichenArray[hour_index];
  const timeRange = shichenTimeMap[hour_index];

  // ✅ 改用農曆月份與日期
  const idx = (lunar.lMonth + lunar.lDay + hour_index) % 6;
  const totalSteps = 6 * 3 + idx;

  let count = 0;
  const interval = setInterval(() => {
    if (count <= totalSteps) {
      highlight(count % 6);
      count++;
    } else {
      clearInterval(interval);
      highlight(idx);
  
      const resultText = `${localeTimeStr}（${timeZone}）<br><br>` +
                         `農曆：${lunar.lMonth}月${lunar.lDay}日${shichen}時（${timeRange})<br>` +
                         `占得：${liurenArray[idx]} ✨<br>${explanations[liurenArray[idx]]}<br>`;
  
      document.getElementById('result').innerHTML = resultText;
    }
  }, 100);
}

  // PWA 離線快取：註冊 service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log('✅ Service Worker 註冊成功:', reg))
      .catch(err => console.log('❌ Service Worker 註冊失敗:', err));
}
  
function toggleInfo() {
  const box = document.getElementById('infoBox');
  box.style.display = box.style.display === 'none' ? 'block' : 'none';
}