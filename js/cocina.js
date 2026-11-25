/**
 * MSComanda - Lógica de Cocina en Vivo (KDS)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Reloj digital en vivo
  const clockEl = document.getElementById('kdsClock');
  function updateClock() {
    if (!clockEl) return;
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = `${h}:${m}:${s}`;
  }
  setInterval(updateClock, 1000);
  updateClock();

  // Manejo de Modal de Disponibilidad / Platos Agotados
  const modalOverlay = document.getElementById('disponibilidadModal');
  const btnOpenModal = document.getElementById('btnOpenStockModal');
  const btnCloseModal = document.getElementById('btnCloseStockModal');

  if (btnOpenModal && modalOverlay) {
    btnOpenModal.addEventListener('click', () => {
      modalOverlay.classList.add('active');
    });
  }

  if (btnCloseModal && modalOverlay) {
    btnCloseModal.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  // Cerrar al dar click fuera del modal
  window.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });

  // Switches de disponibilidad
  const stockSwitches = document.querySelectorAll('.stock-toggle');
  stockSwitches.forEach(toggle => {
    toggle.addEventListener('change', (e) => {
      const row = e.target.closest('.modal-dish-row');
      const statusLabel = row.querySelector('.modal-dish-status-text');
      if (e.target.checked) {
        statusLabel.innerHTML = '<span class="status-dot-green">●</span> Disponible';
      } else {
        statusLabel.innerHTML = '<span class="status-dot-red">●</span> Agotado';
      }
    });
  });

  // Acciones en tarjetas de comanda
  const kdsCards = document.querySelectorAll('.kds-card');
  kdsCards.forEach(card => {
    const actionBtn = card.querySelector('.kds-action-btn');
    if (!actionBtn) return;

    actionBtn.addEventListener('click', () => {
      const badge = card.querySelector('.kds-badge');

      if (actionBtn.classList.contains('kds-btn-start')) {
        // Pasa a En preparación
        actionBtn.className = 'kds-action-btn kds-btn-ready';
        actionBtn.textContent = 'Marcar listo para servir';
        if (badge) {
          badge.className = 'kds-badge badge';
          badge.style.backgroundColor = 'rgba(245, 158, 11, 0.2)';
          badge.style.color = '#fbbf24';
          badge.textContent = 'En preparación';
        }
      } else if (actionBtn.classList.contains('kds-btn-ready')) {
        // Pasa a Listo
        actionBtn.className = 'kds-action-btn kds-btn-deliver';
        actionBtn.textContent = 'Entregado →';
        if (badge) {
          badge.className = 'kds-badge badge';
          badge.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
          badge.style.color = '#34d399';
          badge.textContent = 'Listo';
        }
      } else if (actionBtn.classList.contains('kds-btn-deliver')) {
        // Entregado -> Eliminar tarjeta con fade
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
          card.remove();
          updateActiveOrdersCount();
        }, 300);
      }
    });
  });

  function updateActiveOrdersCount() {
    const countEl = document.getElementById('activeOrdersCount');
    const remaining = document.querySelectorAll('.kds-card').length;
    if (countEl) {
      countEl.textContent = `${remaining} comandas activas · Viernes, 11 de septiembre`;
    }
  }
});
