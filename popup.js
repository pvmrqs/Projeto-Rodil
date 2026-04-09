// --- ELEMENTOS DO ÁUDIO ---
const sfx = document.getElementById('sfxSono');

function playSono() {
  if (!sfx) return;
  sfx.currentTime = 0; // Reseta o áudio para tocar do zero
  sfx.volume = 0.7;    // Volume a 70%
  const p = sfx.play();
  if (p && p.catch) p.catch(() => console.log("Áudio bloqueado pelo navegador"));
}

// --- LÓGICA DO POPUP DE IMAGEM (Top 1 Shaco) ---
const openImgBtn = document.getElementById('openPopup');
const modalImg = document.getElementById('popup');
const closeImgBtn = modalImg?.querySelector('.modal_close');

function openModalImg(e) {
  e?.preventDefault();
  modalImg.classList.add('is-open');
  document.body.style.overflow = 'hidden'; // Trava o scroll da página
  playSono(); // Toca a risada
}

function closeModalImg() {
  modalImg.classList.remove('is-open');
  document.body.style.overflow = ''; // Destrava o scroll
}

openImgBtn?.addEventListener('click', openModalImg);
closeImgBtn?.addEventListener('click', closeModalImg);

// --- LÓGICA DO POPUP DE CLIPES ---
const totalDeClipes = 40;
const clipesLocal = [];

// Gera a lista de clipes e usa encodeURI para o navegador entender os espaços (ex: "clipe 1.mp4")
for (let i = 1; i <= totalDeClipes; i++) {
  const caminho = `./imagens/clipes/clipe ${i}.mp4`;
  clipesLocal.push(encodeURI(caminho));
}

let indiceAtual = 0;
const modalC = document.getElementById('modalClips');
const openClipsBtn = document.getElementById('openClips');
const closeClipsBtn = document.getElementById('closeClips');
const videoPlayer = document.getElementById('meuVideoPlayer');
const btnNext = document.getElementById('nextClip');
const btnPrev = document.getElementById('prevClip');

function carregarVideo(index) {
  if (clipesLocal[index] && videoPlayer) {
    videoPlayer.src = clipesLocal[index];
    videoPlayer.load();
    
    // Tenta dar play automaticamente
    const playPromise = videoPlayer.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => console.
