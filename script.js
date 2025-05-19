const timerDisplay = document.getElementById('timer');
  const startBtn = document.getElementById('startBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const resetBtn = document.getElementById('resetBtn');
  const modeToggle = document.getElementById('modeToggle');

  const foco = 25 * 60; // 25 minutes in seconds

  let remainingTime = foco;
  let intervalId = null;
  let isRunning = false;

  function formatTime(seconds) {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  }

  //Função que atualiza o timer

  function updateDisplay() {
    timerDisplay.textContent = formatTime(remainingTime);
  }

  //Função que começa a rodar o timer de onde ele parou ou de onde ele está

  function startTimer() {
    if (isRunning) return;
    isRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;

    intervalId = setInterval(() => {
      if (remainingTime > 0) {
        remainingTime--;
        updateDisplay();
      } else {
        clearInterval(intervalId);
        isRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
       
      }
    }, 1000);
  }

  //Função que pausa o timer

  function pauseTimer() {
    if (!isRunning) return;
    clearInterval(intervalId);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  }
 
  //Função que reseta o timer!!

  function resetTimer() {
    clearInterval(intervalId);
    isRunning = false;
    remainingTime = foco;
    updateDisplay();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
  }

  startBtn.addEventListener('click', startTimer);
  pauseBtn.addEventListener('click', pauseTimer);
  resetBtn.addEventListener('click', resetTimer);

  // modo escuro
  modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    modeToggle.textContent = isDark ? 'Modo Claro' : 'Modo Escuro';
    modeToggle.setAttribute('aria-pressed', isDark);
  });

  //inicializando a exibição
  updateDisplay();