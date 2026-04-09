const openBtn  = document.getElementById('openPopup');
const modal    = document.getElementById('popup');
const closeBtn = modal.querySelector('.modal_close');
const sfx      = document.getElementById('sfxSono');

function playSono() {
  if (!sfx) return;
  sfx.currentTime = 0;
  sfx.volume = 0.7; // ajuste a gosto
  const p = sfx.play();
  if (p && p.catch) p.catch(() => {}); // evita warning se algo bloquear
}

function openModal(e){
  e?.preventDefault();
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => closeBtn.focus(), 0);
  playSono(); // toca ao abrir
}

function closeModal(){
  modal.classList.remove('is-open');
  document.body.style.overflow = '';
}

openBtn?.addEventListener('click', openModal);
closeBtn?.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// SE ENCONTRAR ALGO ASSIM NO SEU POPUP.JS, APAGUE OU COMENTE:
document.addEventListener('mousemove', (e) => {
    const shaco = document.querySelector('.shaco-container');
    // ... códigos que usam e.clientX ou e.clientY ...
});

// --- LÓGICA DOS CLIPES ---
const totalDeClipes = 40;
const clipesLocal = [];

// Gera a lista: ./imagens/clipes/clipe 1.mp4 ... clipe 40.mp4
for (let i = 1; i <= totalDeClipes; i++) {
  clipesLocal.push(`./imagens/clipes/clipe ${i}.mp4`);
}

let indiceAtual = 0;
const modalC = document.getElementById('modalClips');
const videoPlayer = document.getElementById('meuVideoPlayer');
const videoSource = document.getElementById('videoSource');
const sfxLaugh = document.getElementById('sfxSono');

function carregarVideo(index) {
  videoSource.src = clipesLocal[index];
  videoPlayer.load();
  videoPlayer.play();
}

// Abrir Clipes
document.getElementById('openClips').onclick = (e) => {
  e.preventDefault();
  sfxLaugh.play(); // Toca a risada ao abrir
  indiceAtual = Math.floor(Math.random() * totalDeClipes); // Começa em um aleatório
  carregarVideo(indiceAtual);
  modalC.classList.add('is-open');
};

// Fechar Clipes
document.getElementById('closeClips').onclick = () => {
  modalC.classList.remove('is-open');
  videoPlayer.pause();
};

// Navegação
document.getElementById('nextClip').onclick = () => {
  indiceAtual = (indiceAtual + 1) % clipesLocal.length;
  carregarVideo(indiceAtual);
};

document.getElementById('prevClip').onclick = () => {
  indiceAtual = (indiceAtual - 1 + clipesLocal.length) % clipesLocal.length;
  carregarVideo(indiceAtual);
};

// --- LÓGICA DO POPUP DE IMAGEM (EXISTENTE) ---
const modalImg = document.getElementById('popup');
document.getElementById('openPopup').onclick = (e) => {
  e.preventDefault();
  modalImg.classList.add('is-open');
};
document.querySelector('#popup .modal_close').onclick = () => {
  modalImg.classList.remove('is-open');
};

mande o js atualizado
