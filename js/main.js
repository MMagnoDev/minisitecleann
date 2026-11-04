/**
 * AGÊNCIA CLEAN DESIGN | IDENTIDADES VISUAIS AUTÊNTICAS E MINIMALISTAS
 * Interações, Sistema de Modais e Slideshow Suave do Time
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // SISTEMA DE MODAIS
  // ==========================================
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

  // ==========================================
  // SLIDESHOW SUAVE DO TIME (FUNDO E MODAL)
  // ==========================================
  const teamData = [
    { name: 'Rafael Fajardo', role: 'Liderança & Direção Criativa' },
    { name: 'Julie Fajardo', role: 'Liderança & Visão de Negócio' },
    { name: 'Julie Fajardo', role: 'Direção de Arte & Audiovisual' },
    { name: 'Gabriel', role: 'Equipe Criativa' },
    { name: 'Gustavo', role: 'Equipe Criativa' },
    { name: 'Mariana', role: 'Equipe Criativa' },
    { name: 'Alice', role: 'Equipe Criativa' },
    { name: 'Magno', role: 'Equipe Criativa' },
    { name: 'Raquel', role: 'Equipe Criativa' },
    { name: 'Stefani', role: 'Equipe Criativa' }
  ];

  const bgSlides = document.querySelectorAll('#siteBgSlideshow .site-bg-slide');
  const modalSlides = document.querySelectorAll('#aboutTeamSlider .team-photo-slide');
  const captionName = document.getElementById('aboutTeamMemberName');
  const captionRole = document.getElementById('aboutTeamMemberRole');

  if (bgSlides.length > 1) {
    let currentIndex = 0;
    const intervalTime = 3500; // 3.5 segundos por foto (ritmo mais dinâmico e suave)

    function advanceSlide() {
      const prevIndex = currentIndex;
      currentIndex = (currentIndex + 1) % bgSlides.length;

      // Transição suave no fundo do site
      const prevBg = bgSlides[prevIndex];
      const nextBg = bgSlides[currentIndex];
      if (prevBg && nextBg) {
        prevBg.classList.remove('is-active');
        prevBg.classList.add('is-previous');
        nextBg.classList.remove('is-previous');
        nextBg.classList.add('is-active');
      }

      // Transição suave no card do modal Sobre (se aberto/presente)
      if (modalSlides.length > 0) {
        const prevModalSlide = modalSlides[prevIndex];
        const nextModalSlide = modalSlides[currentIndex];
        if (prevModalSlide && nextModalSlide) {
          prevModalSlide.classList.remove('is-active');
          prevModalSlide.classList.add('is-previous');
          nextModalSlide.classList.remove('is-previous');
          nextModalSlide.classList.add('is-active');
        }
        if (captionName && teamData[currentIndex]) {
          captionName.textContent = teamData[currentIndex].name;
        }
        if (captionRole && teamData[currentIndex]) {
          captionRole.textContent = teamData[currentIndex].role;
        }
      }

      // Limpa classes anteriores após a duração da transição
      setTimeout(() => {
        if (prevBg) prevBg.classList.remove('is-previous');
        if (modalSlides.length > 0 && modalSlides[prevIndex]) {
          modalSlides[prevIndex].classList.remove('is-previous');
        }
      }, 1300);
    }

    setInterval(advanceSlide, intervalTime);
  }
});
