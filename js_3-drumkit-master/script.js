// Pobierz dzwięki z wybranej strony
const sounds = {
    'a': 'sounds/boom.wav',
    's': 'sounds/clap.wav',
    'd': 'sounds/hihat.wav',
    'f': 'sounds/kick.wav',
    'g': 'sounds/openhat.wav',
    'h': 'sounds/ride.wav',
    'j': 'sounds/snare.wav',
  };
  
  // Inicjalizacja ścieżek dźwiękowych
  const channels = [[], [], [], []];
  let recordingChannels = [false, false, false, false];
  let recordingStartTimes = [null, null, null, null];
  
  // Funkcja odtwarzająca dźwięk
  function playSound(soundUrl) {
    const audio = new Audio(soundUrl);
    audio.play();
  }
  
  // Funkcja rozpoczynająca nagrywanie na danym kanale
  function startRecording(channelIndex) {
    recordingChannels[channelIndex] = true;
    recordingStartTimes[channelIndex] = Date.now();
  }
  
  // Funkcja zatrzymująca nagrywanie na danym kanale i zapisująca nagraną ścieżkę
  function stopRecording(channelIndex) {
    if (recordingChannels[channelIndex]) {
      recordingChannels[channelIndex] = false;
      const startTime = recordingStartTimes[channelIndex];
      channels[channelIndex].push({ time: startTime, duration: Date.now() - startTime });
    }
  }
  
  // Funkcja odtwarzająca nagraną ścieżkę na wybranym kanale
  function playChannel(channelIndex) {
    channels[channelIndex].forEach(({ sound, time, duration }) => {
      setTimeout(() => {
        playSound(sound);
      }, time - recordingStartTimes[channelIndex]);
    });
  }
  
  // Funkcja odtwarzająca wszystkie kanały jednocześnie
  function playAllChannels() {
    channels.forEach((channel, index) => {
      playChannel(index);
    });
  }
  
  // Obsługa zdarzenia naciśnięcia klawisza na klawiaturze
  document.addEventListener('keydown', (event) => {
    const key = event.key;
    const sound = sounds[key];
    if (sound) {
      playSound(sound);
      for (let i = 0; i < recordingChannels.length; i++) {
        if (recordingChannels[i]) {
          channels[i].push({ sound, time: Date.now() });
        }
      }
    }
  });
  
  // Inicjalizacja interfejsu użytkownika
  for (let i = 0; i < 4; i++) {
    const startButton = document.getElementById(`startRecording${i + 1}`);
    const stopButton = document.getElementById(`stopRecording${i + 1}`);
    const playButton = document.getElementById(`playChannel${i + 1}`);
  
    startButton.addEventListener('click', () => startRecording(i));
    stopButton.addEventListener('click', () => stopRecording(i));
    playButton.addEventListener('click', () => playChannel(i));
  }
  
  document.getElementById('playAllChannels').addEventListener('click', playAllChannels);
  