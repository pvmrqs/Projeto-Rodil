const modal = document.getElementById('popup');
const openBtn = document.getElementById('openPopup');
const closeBtn = modal.querySelector('.modal_close');

function openModal(e){
  e?.preventDefault();
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  // foca no botão para acessibilidade
  setTimeout(() => closeBtn.focus(), 0);
}
function closeModal(){
  modal.classList.remove('is-open');
  document.body.style.overflow = '';
}

openBtn?.addEventListener('click', openModal);
closeBtn?.addEventListener('click', closeModal);

// já mantém: clicar fora e tecla Esc
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });