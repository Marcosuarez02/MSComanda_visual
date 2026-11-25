/**
 * MSComanda - Lógica de Toma de Pedidos (Mesero)
 */

document.addEventListener('DOMContentLoaded', () => {
  const menuData = [
    { id: 1, name: 'Bandeja Paisa', category: 'tipicos', price: 32000, desc: 'Frijoles, chicharrón, carne molida, huevo' },
    { id: 2, name: 'Sancocho de Gallina', category: 'tipicos', price: 28000, desc: 'Acompañado con arroz y yuca' },
    { id: 3, name: 'Ajiaco Santafereño', category: 'tipicos', price: 26000, desc: 'Pollo, alcaparras y crema de leche' },
    { id: 4, name: 'Limonada de Coco', category: 'bebidas', price: 9000, desc: 'Bebida natural cremosa' },
    { id: 5, name: 'Jugo de Mora', category: 'bebidas', price: 6500, desc: 'En agua o leche deslactosada' },
    { id: 6, name: 'Porción de Aguacate', category: 'adiciones', price: 5000, desc: 'Aguacate hass fresco' },
    { id: 7, name: 'Arepa con Queso', category: 'adiciones', price: 6000, desc: 'Arepa de maíz con queso campesino' }
  ];

  // Estado de la comanda inicial (reproduciendo la de toma_pedido.png)
  let orderItems = [
    { id: 1, name: 'Bandeja Paisa', price: 32000, qty: 2, note: 'Término 3/4 carne, sin aguacate' },
    { id: 5, name: 'Jugo de Mora', price: 6500, qty: 1, note: 'En agua, bajo de azúcar' }
  ];

  const dishesGrid = document.getElementById('dishesGrid');
  const orderList = document.getElementById('orderList');
  const subtotalEl = document.getElementById('subtotalValue');
  const countBadge = document.getElementById('orderCountBadge');
  const filterPills = document.querySelectorAll('.filter-pill');

  function formatMoney(amount) {
    return '$' + amount.toLocaleString('es-CO');
  }

  function renderDishes(category = 'all') {
    if (!dishesGrid) return;
    dishesGrid.innerHTML = '';

    const filtered = category === 'all' 
      ? menuData 
      : menuData.filter(d => d.category === category);

    filtered.forEach(dish => {
      const card = document.createElement('div');
      card.className = 'dish-item-card';
      card.innerHTML = `
        <div>
          <h4 class="dish-item-name">${dish.name}</h4>
          <p class="dish-item-desc">${dish.desc}</p>
        </div>
        <div class="dish-item-price">${formatMoney(dish.price)}</div>
      `;
      card.addEventListener('click', () => addToOrder(dish));
      dishesGrid.appendChild(card);
    });
  }

  function renderOrder() {
    if (!orderList) return;
    orderList.innerHTML = '';

    let total = 0;
    let totalItems = 0;

    orderItems.forEach((item, index) => {
      total += item.price * item.qty;
      totalItems += item.qty;

      const row = document.createElement('div');
      row.className = 'order-item-row';
      row.innerHTML = `
        <div class="order-item-main">
          <span><span class="order-item-qty">${item.qty}×</span> ${item.name}</span>
          <span>${formatMoney(item.price * item.qty)}</span>
        </div>
        <input type="text" class="order-item-note-input" value="${item.note || ''}" placeholder="Agregar nota (ej. sin cebolla)" data-index="${index}">
      `;

      // Evento para guardar notas
      const noteInput = row.querySelector('.order-item-note-input');
      noteInput.addEventListener('input', (e) => {
        orderItems[index].note = e.target.value;
      });

      orderList.appendChild(row);
    });

    if (subtotalEl) subtotalEl.textContent = formatMoney(total);
    if (countBadge) countBadge.textContent = `${totalItems} Artículos`;
  }

  function addToOrder(dish) {
    const existing = orderItems.find(i => i.id === dish.id);
    if (existing) {
      existing.qty++;
    } else {
      orderItems.push({
        id: dish.id,
        name: dish.name,
        price: dish.price,
        qty: 1,
        note: ''
      });
    }
    renderOrder();
  }

  // Filtros
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      renderDishes(pill.dataset.category);
    });
  });

  // Botón Enviar a Cocina
  const btnSend = document.getElementById('btnSendToKitchen');
  if (btnSend) {
    btnSend.addEventListener('click', () => {
      if (orderItems.length === 0) {
        alert('Por favor agrega al menos un plato a la comanda.');
        return;
      }
      btnSend.disabled = true;
      btnSend.textContent = 'Enviando comanda...';
      setTimeout(() => {
        alert('✓ ¡Comanda enviada a Cocina exitosamente!');
        btnSend.disabled = false;
        btnSend.textContent = 'Enviar a Cocina';
        orderItems = [];
        renderOrder();
      }, 700);
    });
  }

  renderDishes('all');
  renderOrder();
});
