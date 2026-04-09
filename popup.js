// --- CONFIGURAÇÕES GERAIS E ELEMENTOS ---
const sfxLaugh = document.getElementById('sfxSono');

// Popup de Imagem (Top 1 Shaco)
const modalImg = document.getElementById('popup');
const openImgBtn = document.getElementById('openPopup');
const closeImgBtn = modalImg.querySelector('.modal_close');

// Popup de Clipes
const modalC = document.getElementById('modalClips');
const openClipsBtn = document.getElementById('openClips');
const closeClipsBtn = document.getElementById('closeClips');
const videoPlayer = document.getElementById('meuVideoPlayer');
const btnNext = document.getElementById('nextClip');
const btnPrev = document.getElementById('prevClip');

// --- LÓGICA DOS 40 CLIPES ---
const totalDeClipes = 40;
const clipesLocal = [];

// Gera a lista tratando os espaços nos nomes (ex: "clipe 1.mp4" vira "clipe%201.mp4")
for (let i = 1; i <= totalDeClipes; i++) {
  const caminho = `./imagens/clipes/clipe ${i}.mp4`;
  clipesLocal.push(encodeURI(caminho));
}

let indiceAtual = 0;

function carregarVideo(index) {
  if (clipesLocal[index]) {
    videoPlayer.src = clipesLocal[index];
    videoPlayer.load();
    videoPlayer.play().catch(() => console.log("Clique no play para iniciar o vídeo"));
  }
}

// --- FUNÇÕES DE ABRIR/FECHAR ---

// Abrir Modal de Imagem
openImgBtn.onclick = (e) => {
  e.preventDefault();
  modalImg.classList.add('is-open');
  if (sfxLaugh) sfxLaugh.play();
};

// Fechar Modal de Imagem
closeImgBtn.onclick = () => {
  modalImg.classList.remove('is-open');
};

// Abrir Modal de Clipes
openClipsBtn.onclick = (e) => {
  e.preventDefault();
  if (sfxLaugh) {
    sfxLaugh.currentTime = 0;
    sfxLaugh.play();
  }
  // Sorteia um clipe inicial para não ser sempre o mesmo
  indiceAtual = Math.floor(Math.random() * totalDeClipes);
  carregarVideo(indiceAtual);
  modalC.classList.add('is-open');
  document.body.style.overflow = 'hidden'; // Trava o scroll da página
};

// Fechar Modal de Clipes
closeClipsBtn.onclick = () => {
  modalC.classList.remove('is-open');
  videoPlayer.pause();
  videoPlayer.src = ""; // Limpa o vídeo para economizar memória
  document.body.style.overflow = '';
};

// --- NAVEGAÇÃO DOS CLIPES ---

btnNext.onclick = () => {
  indiceAtual = (indiceAtual + 1) % clipesLocal.length;
  carregarVideo(indiceAtual);
};

btnPrev.onclick = () => {
  indiceAtual = (indiceAtual - 1 + clipesLocal.length) % clipesLocal.length;
  carregarVideo(indiceAtual);
};

// Fechar modais ao clicar fora (no fundo escuro)
window.onclick = (e) => {
  if (e.target === modalImg) closeImgBtn.click();
  if (e.target === modalC) closeClipsBtn.click();
};

// Fechar no ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (modalImg.classList.contains('is-open')) closeImgBtn.click();
    if (modalC.classList.contains('is-open')) closeClipsBtn.click();
  }
});
