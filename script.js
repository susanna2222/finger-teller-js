const liurenArray = ['大安', '留連', '速喜', '赤口', '小吉', '空亡'];
const shichenArray = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];

const explanations = {
      '大安': '萬事順利，平安為上，適合安定、結婚、談判等事。',
      '留連': '事情反覆、拖延難決，宜靜不宜動。',
      '速喜': '有喜慶、來得快的好消息，適合求財、交涉、戀愛。',
      '赤口': '是非之日，易有爭吵、口舌之災，宜避開重大交涉。',
      '小吉': '小有收穫，雖不大但吉利，宜謹慎進行。',
      '空亡': '空虛無果，容易失望、落空，不利行動，宜等待時機。'
    };

function highlight(idx) {
  liurenArray.forEach((item, i) => {
    const el = document.getElementById(item);
    if (el) {
      el.classList.toggle('highlight', i === idx);
    }
  });
}

function getShichenIndex(hour) {
  if (hour === 23 || hour === 0) return 0;
  return Math.floor((hour - 1) / 2) + 1;
}

function startDivination() {
  const now = new Date();
  const solar = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate()
  };

  const lunar = solarlunar.solar2lunar(solar.year, solar.month, solar.day);
  const hour = now.getHours();
  const shichen = getShichenIndex(hour);
  const hour_index = shichenArray.indexOf(shichen);

  // ✅ 改用農曆月份與日期
  const idx = (lunar.lMonth + lunar.lDay + hour_index) % 6;
  const totalSteps = 6 * 3 + idx;

  // showing current calculation
  // const totalSteps = lunar.lMonth + lunar.lDay + hour_index;
  // const stepDisplay = document.getElementById('step-display');

  let count = 0;
  const interval = setInterval(() => {
    if (count <= totalSteps) {
      highlight(count % 6);
  
      // if (count < lunar.lMonth) {
      //   stepDisplay.textContent = `${count + 1}月`;
      // } else if (count < lunar.lMonth + lunar.lDay) {
      //   const dayCount = count - lunar.lMonth + 1;
      //   stepDisplay.textContent = `${dayCount}日`;
      // } else {
      //   const shichenCount = count - lunar.lMonth - lunar.lDay;
      //   stepDisplay.textContent = `${shichenArray[shichenCount % 12]}時`;
      // }
  
      count++;
    } else {
      clearInterval(interval);
      highlight(idx);
      stepDisplay.textContent = '';
  
      const resultText = `農曆：${lunar.lMonth}月${lunar.lDay}日（${lunar.gzYear}年）${shichen}時<br>` +
                         `占得：${liurenArray[idx]} ✨<br>${explanations[liurenArray[idx]]}<br>`;
  
      document.getElementById('result').innerHTML = resultText;
    }
  }, 200);
}

// Text only version
function calculate() {
    const now = new Date();
    const resultDiv = document.getElementById('result');
  
    // 取得農曆資訊
    const solar = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate()
    };
    const lunar = solarlunar.solar2lunar(solar.year, solar.month, solar.day);
  
    const lunarStr = `農曆：${lunar.lYear}年${lunar.lMonth}月${lunar.lDay}日 ${lunar.gzYear}年（${lunar.animal}年）`;
  
    // 時辰轉換（簡易，之後可接入干支推算）
    const hour = now.getHours();
    const shichen = shichenArray[Math.floor(hour / 2)];

    let idx = 0;
    idx = (idx + lunar.lMonth) % 6;
    idx = (idx + lunar.lDay) % 6;
    let hour_index = shichenArray.indexOf(shichen);
    idx = (idx + hour_index) % 6;

    const liuren = liurenArray[idx];

    const explanation = explanations[liuren];

    const fakeDivination = `你現在的時辰為：${shichen}時，占得結果為<h2><b>${liuren}</b></h2>✨<br><br>${explanation}`;
  
    resultDiv.innerHTML = `${lunarStr}<br>${fakeDivination}`;
}
  
  // PWA 離線快取：註冊 service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log('✅ Service Worker 註冊成功:', reg))
      .catch(err => console.log('❌ Service Worker 註冊失敗:', err));
}
  