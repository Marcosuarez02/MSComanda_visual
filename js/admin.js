/**
 * MSComanda - Lógica del Panel de Administración
 */

document.addEventListener('DOMContentLoaded', () => {
  // Manejo de Pestañas / Tabs
  const navItems = document.querySelectorAll('.admin-nav-item');
  const viewSections = document.querySelectorAll('.admin-view-section');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(nav => nav.classList.remove('active'));
      viewSections.forEach(sec => sec.style.display = 'none');

      item.classList.add('active');
      const targetId = item.dataset.target;
      const targetSec = document.getElementById(targetId);
      if (targetSec) {
        targetSec.style.display = 'block';
      }
    });
  });

  // 1. Marca y Sitio Web: Reactividad en tiempo real en la Vista Previa
  const inputBrandName = document.getElementById('brandNameInput');
  const inputSlogan = document.getElementById('brandSloganInput');
  const inputEmoji = document.getElementById('brandEmojiInput');
  const inputColor = document.getElementById('brandColorInput');
  const colorSample = document.getElementById('colorSample');
  const inputAddress = document.getElementById('brandAddressInput');
  const inputWhatsApp = document.getElementById('brandWhatsAppInput');
  const inputInstagram = document.getElementById('brandInstagramInput');

  // Elementos de la preview
  const prevTitle = document.getElementById('prevTitle');
  const prevLogoText = document.getElementById('prevLogoText');
  const prevLogoEmoji = document.getElementById('prevLogoEmoji');
  const prevSlogan = document.getElementById('prevSlogan');
  const prevAddress = document.getElementById('prevAddress');
  const prevWhatsApp = document.getElementById('prevWhatsApp');
  const prevInstagram = document.getElementById('prevInstagram');
  const prevBtnMesa = document.getElementById('prevBtnMesa');
  const prevBtnCarta = document.getElementById('prevBtnCarta');

  function updatePreview() {
    if (inputBrandName && prevTitle) {
      prevTitle.textContent = inputBrandName.value || 'Mi Restaurante';
      if (prevLogoText) prevLogoText.textContent = inputBrandName.value || 'Mi Restaurante';
    }
    if (inputSlogan && prevSlogan) prevSlogan.textContent = inputSlogan.value || '';
    if (inputEmoji && prevLogoEmoji) prevLogoEmoji.textContent = inputEmoji.value || '🍲';
    if (inputAddress && prevAddress) prevAddress.textContent = inputAddress.value || '';
    if (inputWhatsApp && prevWhatsApp) prevWhatsApp.textContent = inputWhatsApp.value || '';
    if (inputInstagram && prevInstagram) prevInstagram.textContent = inputInstagram.value || '';

    if (inputColor) {
      const colorVal = inputColor.value;
      if (colorSample) colorSample.style.backgroundColor = colorVal;
      if (prevBtnMesa) prevBtnMesa.style.backgroundColor = colorVal;
      if (prevBtnCarta) prevBtnCarta.style.backgroundColor = colorVal;
    }
  }

  [inputBrandName, inputSlogan, inputEmoji, inputAddress, inputWhatsApp, inputInstagram].forEach(inp => {
    if (inp) inp.addEventListener('input', updatePreview);
  });

  if (inputColor) {
    inputColor.addEventListener('input', updatePreview);
  }

  const btnSaveBrand = document.getElementById('btnSaveBrand');
  if (btnSaveBrand) {
    btnSaveBrand.addEventListener('click', (e) => {
      e.preventDefault();
      alert('✓ Ajustes de marca guardados con éxito.');
    });
  }

  // Copiar link de restaurante.html
  const btnCopyLink = document.getElementById('btnCopyLink');
  if (btnCopyLink) {
    btnCopyLink.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.origin + window.location.pathname.replace('admin.html', 'restaurante.html'));
      btnCopyLink.textContent = '¡Copiado!';
      setTimeout(() => { btnCopyLink.textContent = 'Copiar Link'; }, 2000);
    });
  }

  // 2. Gestión de Carta y Platos
  const formAddDish = document.getElementById('formAddDish');
  const dishesTableBody = document.getElementById('dishesTableBody');

  if (formAddDish && dishesTableBody) {
    formAddDish.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('dishNameInput').value;
      const cat = document.getElementById('dishCatInput').value;
      const price = parseFloat(document.getElementById('dishPriceInput').value) || 0;
      const desc = document.getElementById('dishDescInput').value;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight: 700;">${name}</td>
        <td><span class="badge" style="background:#f3f4f6; color:#374151;">${cat}</span></td>
        <td style="font-weight: 700;">$${price.toLocaleString('es-CO')}</td>
        <td style="color: var(--text-muted); font-size: 0.85rem; max-width: 320px;">${desc}</td>
        <td><button class="btn-delete-row">Eliminar</button></td>
      `;

      tr.querySelector('.btn-delete-row').addEventListener('click', () => tr.remove());
      dishesTableBody.appendChild(tr);

      formAddDish.reset();
      alert(`✓ Plato "${name}" añadido a la carta.`);
    });

    document.querySelectorAll('#dishesTableBody .btn-delete-row').forEach(btn => {
      btn.addEventListener('click', (e) => e.target.closest('tr').remove());
    });
  }

  // 3. Pisos y Mesas
  const formAddZone = document.getElementById('formAddZone');
  const zonesChipsRow = document.getElementById('zonesChipsRow');
  const tableZoneSelect = document.getElementById('tableZoneSelect');
  const formAddTable = document.getElementById('formAddTable');
  const tablesTableBody = document.getElementById('tablesTableBody');

  if (formAddZone && zonesChipsRow) {
    formAddZone.addEventListener('submit', (e) => {
      e.preventDefault();
      const zoneName = document.getElementById('zoneNameInput').value;
      if (!zoneName) return;

      const chip = document.createElement('div');
      chip.className = 'zone-chip';
      chip.innerHTML = `📍 ${zoneName} <span class="zone-chip-close">×</span>`;
      chip.querySelector('.zone-chip-close').addEventListener('click', () => chip.remove());
      zonesChipsRow.appendChild(chip);

      if (tableZoneSelect) {
        const opt = document.createElement('option');
        opt.value = zoneName;
        opt.textContent = zoneName;
        tableZoneSelect.appendChild(opt);
      }

      document.getElementById('zoneNameInput').value = '';
    });

    document.querySelectorAll('.zone-chip-close').forEach(close => {
      close.addEventListener('click', (e) => e.target.closest('.zone-chip').remove());
    });
  }

  if (formAddTable && tablesTableBody) {
    formAddTable.addEventListener('submit', (e) => {
      e.preventDefault();
      const tableName = document.getElementById('tableNameInput').value;
      const zone = document.getElementById('tableZoneSelect').value;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight: 700;">${tableName}</td>
        <td><span class="badge" style="background:#f3f4f6; color:#374151;">${zone}</span></td>
        <td><button class="btn-delete-row">Eliminar</button></td>
      `;
      tr.querySelector('.btn-delete-row').addEventListener('click', () => tr.remove());
      tablesTableBody.appendChild(tr);

      document.getElementById('tableNameInput').value = '';
    });

    document.querySelectorAll('#tablesTableBody .btn-delete-row').forEach(btn => {
      btn.addEventListener('click', (e) => e.target.closest('tr').remove());
    });
  }

  // 4. Empleados y Roles
  const formAddEmp = document.getElementById('formAddEmp');
  const empTableBody = document.getElementById('empTableBody');

  if (formAddEmp && empTableBody) {
    formAddEmp.addEventListener('submit', (e) => {
      e.preventDefault();
      const doc = document.getElementById('empDocInput').value;
      const name = document.getElementById('empNameInput').value;
      const role = document.getElementById('empRoleSelect').value;
      const pin = document.getElementById('empPinInput').value;

      let badgeBg = '#dbeafe';
      let badgeColor = '#1d4ed8';
      if (role === 'Cocina') { badgeBg = '#fef3c7'; badgeColor = '#b45309'; }
      if (role === 'Cajero') { badgeBg = '#f3e8ff'; badgeColor = '#7e22ce'; }

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${doc}</td>
        <td style="font-weight: 700;">${name}</td>
        <td><span class="badge" style="background:${badgeBg}; color:${badgeColor};">${role}</span></td>
        <td>••••</td>
        <td><button class="btn-delete-row">Eliminar</button></td>
      `;
      tr.querySelector('.btn-delete-row').addEventListener('click', () => tr.remove());
      empTableBody.appendChild(tr);

      formAddEmp.reset();
      alert(`✓ Empleado "${name}" registrado con éxito.`);
    });

    document.querySelectorAll('#empTableBody .btn-delete-row').forEach(btn => {
      btn.addEventListener('click', (e) => e.target.closest('tr').remove());
    });
  }
});
