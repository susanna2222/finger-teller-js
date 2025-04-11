/*function calculate() {
    const now = new Date();
    const resultDiv = document.getElementById('result');
  
    // 模擬農曆轉換（這裡未實作，之後可接入演算法）
    const lunar = `模擬農曆：${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;
  
    // 六壬時辰計算（用現在小時轉換為十二地支）
    const hour = now.getHours();
    const shichenArray = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
    const shichen = shichenArray[Math.floor(hour / 2)];
  
    // 假設結果（你可改成真實推算後顯示）
    const fakeDivination = `你現在的時辰為：${shichen}時，占得結果為：「平安無事，大吉」✨`;
  
    resultDiv.innerHTML = `${lunar}<br>${fakeDivination}`;
}*/

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
    const shichenArray = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
    const shichen = shichenArray[Math.floor(hour / 2)];

    const liurenArray = ['大安', '留连', '速喜', '赤口', '小吉', '空亡'];

    let idx = 0;
    idx = (idx + lunar.lMonth) % 6;
    idx = (idx + lunar.lDay) % 6;
    let hour_index = shichenArray.indexOf(shichen);
    idx = (idx + hour_index) % 6;

    const liuren = liurenArray[idx];
  
    const explanations = {
      '大安': '萬事順利，平安為上，適合安定、結婚、談判等事。',
      '留连': '事情反覆、拖延難決，宜靜不宜動。',
      '速喜': '有喜慶、來得快的好消息，適合求財、交涉、戀愛。',
      '赤口': '是非之日，易有爭吵、口舌之災，宜避開重大交涉。',
      '小吉': '小有收穫，雖不大但吉利，宜謹慎進行。',
      '空亡': '空虛無果，容易失望、落空，不利行動，宜等待時機。'
    };

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
  