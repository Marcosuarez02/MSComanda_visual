/**
 * MSComanda - Lógica de la Landing Page
 */

document.addEventListener('DOMContentLoaded', () => {
  // Manejo del Acordeón de FAQ
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parentItem = header.parentElement;
      const isActive = parentItem.classList.contains('active');

      // Cerrar otros items si se desea estilo único abierto
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
      });

      if (!isActive) {
        parentItem.classList.add('active');
      }
    });
  });

  // Simulación interactiva de estados en el Mockup de Cocina
  const mockTags = document.querySelectorAll('.mockup-card');
  mockTags.forEach(card => {
    card.addEventListener('click', () => {
      const tag = card.querySelector('.mockup-tag');
      if (!tag) return;

      if (tag.classList.contains('mockup-tag-new')) {
        tag.className = 'mockup-tag mockup-tag-prep';
        tag.innerHTML = `🔥 En preparación`;
      } else if (tag.classList.contains('mockup-tag-prep')) {
        tag.className = 'mockup-tag mockup-tag-ready';
        tag.innerHTML = `✓ Listo para servir`;
      } else {
        tag.className = 'mockup-tag mockup-tag-new';
        tag.innerHTML = `⏱ Nuevo`;
      }
    });
  });
});
