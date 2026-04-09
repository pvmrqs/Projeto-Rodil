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
// 2. LÓGICA DOS 40 CLIPES (AGORA EM ORDEM)
// ==========================================
const totalDeClipes = 40; // Lembre de voltar para 40 quando subir todos os vídeos!
const clipesLocal = [];

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
  playSono(); 
  
  // 👉 MUDANÇA AQUI: Começa sempre no clipe 1 (posição 0 na lista)
  indiceAtual = 0; 
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
    videoPlayer.src = ""; 
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

// 👉 BÔNUS: Pula para o próximo clipe sozinho quando o atual terminar!
videoPlayer?.addEventListener('ended', () => {
  btnNext?.click();
});

// Fechar ao clicar fora
modalC?.addEventListener('click', (e) => { 
  if (e.target === modalC) btnCloseClips?.click(); 
});
