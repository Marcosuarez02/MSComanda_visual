/**
 * MSComanda - Lógica de Caja y Mesas
 */

document.addEventListener('DOMContentLoaded', () => {
  const tablesData = [
    { id: 1, name: 'Mesa 01', status: 'free', info: 'Disponible', persons: 0, items: [] },
    { id: 2, name: 'Mesa 02', status: 'occupied', info: '4 personas · 36 min', persons: 4, items: [
      { name: 'Ensalada de la casa', qty: 1, price: 180 },
      { name: 'Pasta pomodoro', qty: 2, price: 320 }
    ] },
    { id: 3, name: 'Mesa 03', status: 'free', info: 'Disponible', persons: 0, items: [] },
    { id: 4, name: 'Mesa 04', status: 'pending', info: '2 personas · $1,276.50', persons: 2, accountNum: '0184', items: [
      { name: 'Tacos de arrachera', qty: 2, price: 440 },
      { name: 'Guacamole', qty: 1, price: 185 },
      { name: 'Limonada', qty: 2, price: 160 },
      { name: 'Flan de vainilla', qty: 1, price: 140 }
    ] },
    { id: 5, name: 'Mesa 05', status: 'occupied', info: '3 personas · 18 min', persons: 3, items: [
      { name: 'Bandeja Paisa', qty: 2, price: 640 },
      { name: 'Jugo de Mora', qty: 2, price: 130 }
    ] },
    { id: 6, name: 'Mesa 06', status: 'free', info: 'Disponible', persons: 0, items: [] },
    { id: 7, name: 'Mesa 07', status: 'occupied', info: '2 personas · 44 min', persons: 2, items: [
      { name: 'Hamburguesa clásica', qty: 2, price: 520 },
      { name: 'Papas trufadas', qty: 1, price: 210 }
    ] },
    { id: 8, name: 'Mesa 08', status: 'pending', info: '5 personas · $2,940.00', persons: 5, accountNum: '0185', items: [
      { name: 'Sancocho de Gallina', qty: 3, price: 1200 },
      { name: 'Ajiaco Santafereño', qty: 2, price: 900 },
      { name: 'Limonada de Coco', qty: 5, price: 450 }
    ] },
    { id: 9, name: 'Mesa 09', status: 'free', info: 'Disponible', persons: 0, items: [] }
  ];

  let selectedTableId = 4; // Por defecto Mesa 04 como en Figma
  let currentTip = 0.00;

  const tablesGrid = document.getElementById('tablesGrid');
  const billTitle = document.getElementById('billTitle');
  const billSub = document.getElementById('billSub');
  const billBadge = document.getElementById('billBadge');
  const billItems = document.getElementById('billItems');
  const billSubtotal = document.getElementById('billSubtotal');
  const billTax = document.getElementById('billTax');
  const billTipInput = document.getElementById('billTipInput');
  const billTotal = document.getElementById('billTotal');
  const btnCobrar = document.getElementById('btnCobrar');

  function formatPrice(val) {
    return '$' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function renderTables() {
    if (!tablesGrid) return;
    tablesGrid.innerHTML = '';

    tablesData.forEach(tbl => {
      const card = document.createElement('div');
      card.className = `table-card ${tbl.id === selectedTableId ? 'selected' : ''}`;
      
      let statusText = 'Libre';
      if (tbl.status === 'occupied') statusText = 'Ocupada';
      if (tbl.status === 'pending') statusText = 'Por cobrar';

      card.innerHTML = `
        <div class="table-card-top">
          <div class="table-card-num">${tbl.name}</div>
          <span class="table-status-indicator ${tbl.status}"></span>
        </div>
        <div class="table-card-bottom">
          <div class="table-status-label ${tbl.status}">${statusText}</div>
          <div class="table-meta-text">${tbl.info}</div>
        </div>
      `;

      card.addEventListener('click', () => {
        selectedTableId = tbl.id;
        renderTables();
        renderBillPanel();
      });

      tablesGrid.appendChild(card);
    });
  }

  function renderBillPanel() {
    const table = tablesData.find(t => t.id === selectedTableId);
    if (!table) return;

    if (table.status === 'free') {
      billBadge.textContent = 'DISPONIBLE';
      billBadge.style.color = 'var(--status-free)';
      billTitle.textContent = table.name;
      billSub.textContent = 'Mesa lista para nuevos clientes';
      billItems.innerHTML = '<p style="color: #9ca3af; text-align: center; padding: 2rem 0;">No hay consumos pendientes</p>';
      billSubtotal.textContent = '$0.00';
      billTax.textContent = '$0.00';
      billTotal.textContent = '$0.00';
      btnCobrar.disabled = true;
      btnCobrar.textContent = 'Mesa Libre';
      return;
    }

    btnCobrar.disabled = false;
    btnCobrar.textContent = 'Cobrar y Liberar Mesa';

    if (table.status === 'pending') {
      billBadge.textContent = 'POR COBRAR';
      billBadge.style.color = 'var(--status-pending)';
    } else {
      billBadge.textContent = 'EN CONSUMO';
      billBadge.style.color = 'var(--status-occupied)';
    }

    billTitle.textContent = table.name;
    billSub.textContent = `${table.persons} personas · Cuenta #${table.accountNum || '0190'}`;

    // Render items
    billItems.innerHTML = '';
    let subtotal = 0;
    table.items.forEach(it => {
      subtotal += it.price;
      const row = document.createElement('div');
      row.className = 'bill-item-row';
      row.innerHTML = `
        <span>${it.qty}× ${it.name}</span>
        <span style="font-weight: 600;">$${it.price.toFixed(2)}</span>
      `;
      billItems.appendChild(row);
    });

    const tax = subtotal * 0.15;
    const total = subtotal + tax + currentTip;

    billSubtotal.textContent = formatPrice(subtotal);
    billTax.textContent = formatPrice(tax);
    billTotal.textContent = formatPrice(total);
  }

  if (billTipInput) {
    billTipInput.addEventListener('input', (e) => {
      currentTip = parseFloat(e.target.value) || 0;
      renderBillPanel();
    });
  }

  if (btnCobrar) {
    btnCobrar.addEventListener('click', () => {
      const table = tablesData.find(t => t.id === selectedTableId);
      if (!table || table.status === 'free') return;

      const confirmCobro = confirm(`¿Confirmar cobro y liberar la ${table.name}?`);
      if (confirmCobro) {
        table.status = 'free';
        table.info = 'Disponible';
        table.items = [];
        table.persons = 0;
        alert(`✓ ${table.name} cobrada con éxito. Mesa liberada.`);
        renderTables();
        renderBillPanel();
      }
    });
  }

  renderTables();
  renderBillPanel();
});
