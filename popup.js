const openBtn  = document.getElementById('openPopup');
const modal    = document.getElementById('popup');
const closeBtn = modal.querySelector('.modal_close');
const sfx      = document.getElementById('sfxSono');

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