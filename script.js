const audioFiles = [
  { path: 'assets/audio/audio1/track.mp3', subtitle: 'assets/audio/audio1/subtitle.txt' },
  { path: 'assets/audio/audio2/track.mp3', subtitle: 'assets/audio/audio2/subtitle.txt' },
  // Add more audio files here
];

let currentAudio = null;

function playRandomAudio() {
  if (currentAudio) {
    currentAudio.pause();
  }

  const randomIndex = Math.floor(Math.random() * audioFiles.length);
  const selectedAudio = audioFiles[randomIndex];
  currentAudio = new Audio(selectedAudio.path);
  
  fetch(selectedAudio.subtitle)
    .then(response => response.text())
    .then(subtitle => {
      document.getElementById('subtitle').innerText = subtitle;
    })
    .catch(error => console.error("Subtitle loading error:", error));

  const playButton = document.getElementById('playButton');
  playButton.disabled = true;

  currentAudio.play();
  currentAudio.onended = () => {
    playButton.disabled = false;
  };
}
