// ==========================================
// 1. LÓGICA ORIGINAL (SUA FOTO E ÁUDIO)
// ==========================================
const openBtn  = document.getElementById('openPopup');
const modal    = document.getElementById('popup');
const closeBtn = modal?.querySelector('.modal_close');
const sfx      = document.getElementById('sfxSono');

function playSono() {
  if (!sfx) return;
  sfx.currentTime = 0;
  sfx.volume = 0.7;
  const p = sfx.play();
  if (p && p.catch) p.catch(() => {});
}

function openModal(e){
  e?.preventDefault();
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => closeBtn?.focus(), 0);
  playSono(); 
}

function closeModal(){
  modal.classList.remove('is-open');
  document.body.style.overflow = '';
}

openBtn?.addEventListener('click', openModal);
closeBtn?.addEventListener('click', closeModal);
modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });


// ==========================================
// 2. LÓGICA NOVA (40 CLIPES DA TWITCH)
// ==========================================
const totalDeClipes = 40;
const clipesLocal = [];

// Gera a lista tratando os espaços (ex: "clipe 1.mp4" vira "clipe%201.mp4")
for (let i = 1; i <= totalDeClipes; i++) {
  clipesLocal.push(encodeURI(`./imagens/clipes/clipe ${i}.mp4`));
}

let indiceAtual = 0;
const modalC = document.getElementById('modalClips');
const btnOpenClips = document.getElementById('openClips');
const btnCloseClips = document.getElementById('closeClips');
const videoPlayer = document.getElementById('meuVideoPlayer');
const btnNext = document.getElementById('nextClip');
const btnPrev = document.getElementById('prevClip');

function carregarVideo(index) {
  if (clipesLocal[index] && videoPlayer) {
    videoPlayer.src = clipesLocal[index];
    videoPlayer.load();
    const playPromise = videoPlayer.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => console.log("Clique no play para iniciar o vídeo."));
    }
  }
}

// Abrir Clipes
btnOpenClips?.addEventListener('click', (e) => {
  e.preventDefault();
  playSono(); // Também toca a risada ao abrir os vídeos
  
  indiceAtual = Math.floor(Math.random() * totalDeClipes); // Inicia num clipe aleatório
  carregarVideo(indiceAtual);
  
  modalC.classList.add('is-open');
  document.body.style.overflow = 'hidden';
});

// Fechar Clipes
btnCloseClips?.addEventListener('click', () => {
  modalC.classList.remove('is-open');
  document.body.style.overflow = '';
  if (videoPlayer) {
    videoPlayer.pause();
    videoPlayer.src = ""; // Limpa a memória
  }
});

// Avançar e Voltar
btnNext?.addEventListener('click', () => {
  indiceAtual = (indiceAtual + 1) % clipesLocal.length;
  carregarVideo(indiceAtual);
});

btnPrev?.addEventListener('click', () => {
  indiceAtual = (indiceAtual - 1 + clipesLocal.length) % clipesLocal.length;
  carregarVideo(indiceAtual);
});

// Fechar ao clicar fora
modalC?.addEventListener('click', (e) => { 
  if (e.target === modalC) btnCloseClips?.click(); 
});
