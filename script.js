// ACCESS CHECK
if(window.location.pathname.includes("index.html") && localStorage.getItem("access")!=="yes"){
  location.href="login.html";
}

// NAVIGATION
document.querySelectorAll('.nav-button').forEach(btn => {
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('active'));
    const page = btn.dataset.page + "Page";
    const pg = document.getElementById(page);
    if(pg) pg.classList.add('active');
    document.querySelectorAll('.nav-button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// LOGOUT
const logoutBtn = document.getElementById('logoutButton');
if(logoutBtn) logoutBtn.addEventListener('click', ()=>{
  localStorage.removeItem("access");
  location.href="login.html";
});

// PREDICTION + PERIOD + HISTORY
setInterval(()=>{
  const now = new Date();
  const period = now.getHours().toString().padStart(2,'0')+
                 now.getMinutes().toString().padStart(2,'0')+
                 now.getSeconds().toString().padStart(2,'0');
  const liveTime = now.toLocaleTimeString();

  document.getElementById('currentPeriod').innerText = "Period: "+period;
  document.getElementById('liveTime').innerText = "Time: "+liveTime;

  // Admin controlled prediction
  const pred = localStorage.getItem("ADMIN_RESULT") || "WAIT";
  const predBox = document.getElementById('predictionBox');
  if(predBox) predBox.innerText = pred;

  // History update
  let hist = JSON.parse(localStorage.getItem("HISTORY")||"[]");
  if(hist.length===0 || hist[0].period !== period){
    hist.unshift({period, prediction: pred});
    if(hist.length>10) hist.pop();
    localStorage.setItem("HISTORY", JSON.stringify(hist));
  }

  // Show history
  const histList = document.getElementById('historyList');
  if(histList){
    histList.innerHTML = "";
    hist.forEach(item=>{
      const div = document.createElement('div');
      div.className="history-item";
      div.innerText = `Period: ${item.period} | Prediction: ${item.prediction}`;
      histList.appendChild(div);
    });
  }

},1000);
