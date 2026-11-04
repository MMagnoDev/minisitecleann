/**
 * AGÊNCIA MINIMUM | IDENTIDADES VISUAIS AUTÊNTICAS E MINIMALISTAS
 * Interações e Sistema de Modais
 */

document.addEventListener('DOMContentLoaded', () => {
  const allModals = document.querySelectorAll('.custom-modal-backdrop');
  const modalOpenButtons = document.querySelectorAll('[data-open-modal]');
  const modalCloseButtons = document.querySelectorAll('[data-close-modal]');

  // Abre Modal específico
  function openModal(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
      targetModal.classList.add('is-open');
      targetModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  // Fecha Modal específico
  function closeModal(modalElement) {
    if (modalElement) {
      modalElement.classList.remove('is-open');
      modalElement.setAttribute('aria-hidden', 'true');
      
      const hasOpenModals = document.querySelector('.custom-modal-backdrop.is-open');
      if (!hasOpenModals) {
        document.body.style.overflow = '';
      }
    }
  }

  // Fecha todos os Modais
  function closeAllModals() {
    allModals.forEach(m => closeModal(m));
  }

  // Ouvintes de clique para botões que abrem modais
  modalOpenButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-open-modal');
      if (targetId) {
        openModal(targetId);
      }
    });
  });

  // Ouvintes de clique para botões de fechar (ícone X)
  modalCloseButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = e.target.closest('.custom-modal-backdrop');
      closeModal(modal);
    });
  });

  // Fecha ao clicar fora da janela (no backdrop de vidro)
  allModals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Fecha com a tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
});
