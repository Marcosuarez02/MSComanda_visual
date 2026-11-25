# MSComanda - Sistema Visual Interactivo de Comandas

MSComanda es una plataforma web interactiva y responsiva desarrollada en **HTML5, CSS3 moderno y JavaScript Vanilla**, basada fielmente en los diseños y prototipos de Figma para la gestión integral de comandas y operaciones en restaurantes pequeños y medianos.

---

## 🍽️ Módulos y Pantallas Implementadas

El proyecto replica con máxima fidelidad visual y funcional cada una de las pantallas diseñadas:

### 1. Landing Page Comercial (`index.html`)
* **Hero Section:** Propuesta de valor con tipografía serif editorial, botón de llamada a la acción y un mockup interactivo de la pantalla de cocina oscura con pedidos en tiempo real.
* **Cinta de Beneficios:** Garantías operativas (*"Funciona sin internet"*, *"Tiempo real"*, *"Sin ayuda técnica"*, *"Hecho en Colombia"*).
* **Cómo Funciona (3 Pasos):** Flujo de trabajo coordinado entre Mesera (celular), Cocina (KDS instantáneo) y Caja (cobro sin errores).
* **Funcionalidades:** Cuadrícula con las 6 características clave (Modo local sin internet, alertas en vivo, mapa de mesas, roles y permisos, comandas térmicas y reportes diarios).
* **Planes y Precios:** Comparativa entre el plan **Local (Gratis)** y el plan **Nube ($39.000 COP/mes)**.
* **Preguntas Frecuentes:** Acordeón interactivo con dudas comunes sobre red local, compatibilidad de impresoras y migración de datos.
* **Banner y Footer:** Llamado a la acción final con enlaces a recursos, producto y notas legales (Proyecto desarrollado en el SENA, Colombia).

### 2. Autenticación y Control de Acceso
* **Acceso al Panel (`login.html`):** Inicio de sesión con credenciales, checkbox para recordar sesión y **selector de acceso rápido por rol** (`cocina`, `Pedido`, `Caja`, `Administrador`).
* **Registro de Restaurante (`registro.html`):** Formulario para registrar restaurante, datos del propietario, teléfono/WhatsApp, correo y clave de acceso.
* **Recuperar Contraseña (`recuperar-password.html`):** Restablecimiento de credenciales mediante cédula o correo electrónico.

### 3. Portal Web del Restaurante (`restaurante.html`)
* Vista pública generada para los clientes (*"El Fogón Santandereano"*).
* Cabecera con marca, horarios, dirección física y enlace directo a WhatsApp.
* Carta interactiva con categorías (Platos Fuertes, Bebidas) y precios actualizados en tiempo real.
* Botón flotante para pedidos vía WhatsApp.

### 4. Toma de Pedidos / Mesero (`toma-pedido.html`)
* Identificación de mesera en servicio y mesa activa (*Mesa 4 - Terraza*).
* Filtros rápidos de menú por categorías: *Todos, Platos Típicos, Bebidas, Adiciones*.
* Cuadrícula de platos interactivos con adición inmediata a la comanda.
* Panel lateral reactivo *"Comanda en Curso"*:
  * Conteo de artículos y cálculo dinámico de subtotales.
  * Inputs para ingresar notas personalizadas por cada plato (*"Término 3/4", "Sin aguacate"*, etc.).
  * Botón *"Enviar a Cocina"* con confirmación visual.

### 5. Cocina en Vivo - KDS (`cocina.html`)
* Tema oscuro profesional (Dark Mode UI) optimizado para pantallas táctiles en cocina.
* Reloj digital sincronizado en vivo con segundos y etiqueta de turno (*Turno cena*).
* Contador en tiempo real de comandas activas.
* Ciclo de vida completo de cada orden:
  * `Nuevo` (azul) ➔ Iniciar preparación.
  * `En preparación` (amarillo) ➔ Marcar listo para servir.
  * `Listo` (verde) ➔ Entregar orden con despacho y animación de salida.
* **Modal "Disponibilidad del Menú":** Control de stock y platos agotados con interruptores en tiempo real (toggle switches).

### 6. Caja y Facturación (`caja.html`)
* Mapa y estado visual del salón con leyenda cromática (Libre en verde, Ocupada en rojo, Por cobrar en naranja).
* Selección interactiva de mesas con actualización instantánea del detalle de cuenta.
* Cálculo en tiempo real de Subtotal, IVA (15%), propina configurable y Total general.
* Acción *"Cobrar y Liberar Mesa"* con confirmación y reactivación de la mesa al estado disponible.

### 7. Panel de Administración (`admin.html`)
* **Marca y Sitio Web:** Formulario completo para personalizar nombre comercial, eslogan, ícono, logotipo, color de marca `#059669`, dirección física, WhatsApp e Instagram. **Incluye mockup de previsualización en vivo que reacciona en tiempo real a cada cambio.**
* **Carta y Platos:** Formulario para registrar nuevos platos con precio, categoría y descripción, junto a la tabla de carta actual con acción de eliminación.
* **Pisos y Mesas:** Creación de pisos y zonas con etiquetas interactivas y asignación de mesas habilitadas.
* **Empleados y Roles:** Registro de empleados con asignación de rol (Mesero, Cocina, Cajero, Admin) y PIN de 4 dígitos.

---

## 📂 Estructura de Archivos del Repositorio

```
MSComanda_visual/
├── index.html                   # Landing page principal comercial
├── login.html                   # Acceso al sistema y selector de roles
├── registro.html                # Registro de nuevo restaurante
├── recuperar-password.html      # Recuperación de contraseñas
├── restaurante.html             # Portal online público del restaurante
├── toma-pedido.html             # Módulo de toma de pedidos para meseros
├── cocina.html                  # Pantalla de cocina KDS en vivo (Dark Theme)
├── caja.html                    # Módulo de caja, mesas y facturación
├── admin.html                   # Panel administrativo (4 pestañas completas)
├── css/
│   ├── style.css                # Estilos base, reset, variables de diseño y tipografías
│   ├── landing.css              # Estilos de la landing page y componentes de presentación
│   ├── auth.css                 # Estilos para vistas de autenticación
│   ├── pos.css                  # Estilos para meseros, cocina KDS y caja
│   └── admin.css                # Estilos del panel de control y preview reactivo
├── js/
│   ├── landing.js               # Acordeón de FAQs y mockup interactivo
│   ├── pedido.js                # Lógica del mesero, carrito y notas
│   ├── cocina.js                # Reloj en vivo, ciclo de comandas y modal de stock
│   ├── caja.js                  # Lógica del mapa de mesas, cálculo de cuentas y cobros
│   └── admin.js                 # Pestañas administrativas, preview reactivo y CRUD
├── designs/                     # Exportaciones originales de los diseños de Figma
└── README.md                    # Documentación técnica
```

---

## 🚀 Cómo Visualizar el Proyecto Localmente

No se requieren dependencias de compilación ni servidores pesados:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Marcosuarez02/MSComanda_visual.git
   cd MSComanda_visual
   ```
2. Abre cualquier archivo HTML directamente en tu navegador favorito (por ejemplo con doble clic en `index.html`), o utiliza una extensión de servidor local como **Live Server** en VS Code o Python:
   ```bash
   # Con Python
   python -m http.server 8000
   ```
3. Visita `http://localhost:8000` en tu navegador.
