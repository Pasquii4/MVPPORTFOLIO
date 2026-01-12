# 🎨 Advanced Components Guide - Portfolio Tracker v2.0

**Fase 2: Componentes Avanzados** ✅ **COMPLETADO**

## Nuevos Componentes Avanzados

### 1. **Table Component - Tablas Profesionales**
Tablas con sorting, filtrado, paginación y selección

```javascript
import { Table } from './src/js/components/index.js';

const positions = [
  { ticker: 'AAPL', quantity: 10, bought: 150, current: 180, pnl: 30 },
  { ticker: 'MSFT', quantity: 5, bought: 300, current: 295, pnl: -5 },
  // ... más posiciones
];

const table = Table.create({
  columns: [
    { key: 'ticker', label: 'Ticker', sortable: true },
    { key: 'quantity', label: 'Cantidad', sortable: true },
    { key: 'bought', label: 'Precio Compra', sortable: true },
    { key: 'current', label: 'Precio Actual', sortable: true },
    { key: 'pnl', label: 'P&L', sortable: true },
  ],
  data: positions,
  sortable: true,
  filterable: true,
  paginated: true,
  selectable: true,
  rowsPerPage: 10,
  onRowClick: (row, index) => console.log('Fila clickeada:', row),
  onSelectionChange: (selected) => console.log('Seleccionadas:', selected),
});

document.body.appendChild(table);

// Métodos útiles
Table.setData(table, newPositions); // Actualizar datos
const selected = Table.getSelectedRows(table); // Obtener filas seleccionadas
```

**Características:**
- ✅ Ordenamiento por columna (click en header)
- ✅ Búsqueda en tiempo real
- ✅ Paginación con opciones de filas
- ✅ Selección múltiple de filas
- ✅ Responsive design

---

### 2. **Modal Component - Modales Profesionales**
Modales avanzados con animaciones y múltiples estados

```javascript
import { Modal } from './src/js/components/index.js';

// Crear modal personalizado
const modal = Modal.create({
  title: 'Vender Posición',
  content: '<p>¿Estás seguro de que deseas vender esta posición?</p>',
  buttons: [
    { label: 'Cancelar', type: 'ghost' },
    { label: 'Vender', type: 'danger', onClick: () => console.log('Vendido!') }
  ],
  size: 'default', // 'small', 'default', 'large', 'fullscreen'
  closeButton: true,
  backdropClose: true,
  onClose: () => console.log('Modal cerrado'),
});

// Abrir modal
Modal.open(modal.id);

// Cerrar modal
Modal.close(modal.id);

// Cerrar todos los modales
Modal.closeAll();
```

**Modales Predefinidos:**

```javascript
// Alert
Modal.alert('Título', 'Mensaje', () => console.log('Cerrado'));

// Confirm
Modal.confirm(
  'Confirmar',
  '¿Deseas continuar?',
  () => console.log('Confirmado'),
  () => console.log('Cancelado')
);

// Success
Modal.success('Éxito', 'Operación completada exitosamente');

// Error
Modal.error('Error', 'Ha ocurrido un error, intenta nuevamente');

// Loading
const loadingId = Modal.loading('Por favor espera...');
// ... después de operación
Modal.close(loadingId);
```

**Características:**
- ✅ Animaciones suaves
- ✅ Backdrop con blur
- ✅ Cierre con ESC o click en backdrop
- ✅ Botones personalizables
- ✅ Responsive en mobile

---

### 3. **Form Builder - Constructor de Formularios**
Constructor dinámico de formularios con validación integrada

```javascript
import { Form } from './src/js/components/index.js';

const form = Form.create({
  fields: [
    {
      name: 'ticker',
      type: 'text',
      label: 'Ticker',
      placeholder: 'AAPL',
      required: true,
      icon: '📊',
    },
    {
      name: 'quantity',
      type: 'number',
      label: 'Cantidad',
      placeholder: '100',
      required: true,
    },
    {
      name: 'buy_date',
      type: 'date',
      label: 'Fecha de Compra',
      required: true,
    },
    {
      name: 'buy_price',
      type: 'number',
      label: 'Precio de Compra',
      placeholder: '150.00',
      required: true,
    },
    {
      name: 'currency',
      type: 'select',
      label: 'Moneda',
      options: [
        { value: 'USD', label: '$ USD' },
        { value: 'EUR', label: '€ EUR' },
      ],
      required: true,
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Notas',
      placeholder: 'Agregar notas sobre esta posición...',
    },
  ],
  submitLabel: 'Agregar Posición',
  resetLabel: 'Limpiar',
  validation: true,
  layout: 'vertical', // 'vertical', 'horizontal', 'grid'
  onSubmit: async (data) => {
    console.log('Datos del formulario:', data);
    // Enviar a API
    const response = await fetch('/api/positions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    console.log('Guardado!');
  },
  onReset: () => console.log('Formulario limpiado'),
});

document.body.appendChild(form);

// Métodos útiles
Form.setValues(form, { ticker: 'MSFT', quantity: 5 }); // Establecer valores
const data = Form.getValues(form); // Obtener valores
Form.setFieldError(form, 'ticker', 'Este ticker ya existe'); // Mostrar error
Form.validate(form); // Validar manualmente
Form.reset(form); // Limpiar form
```

**Tipos de Campos Soportados:**
- ✅ text, email, password, number, date, search
- ✅ select (dropdown)
- ✅ textarea
- ✅ Validación integrada
- ✅ Estados de error

---

### 4. **Chart Component - Gráficos Interactivos**
Gráficos reutilizables para visualización de datos

```javascript
import ChartComponent from './src/js/components/index.js';

// Gráfico personalizado
const chart = ChartComponent.create({
  type: 'line', // 'pie', 'line', 'bar', 'doughnut', 'bubble'
  title: 'Valor del Portfolio',
  data: {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [{
      label: 'Valor',
      data: [50000, 52000, 51000, 54000, 55000, 57000],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
    }],
  },
  responsive: true,
  height: 300,
});

// Renderizar el gráfico
chart.render();
document.body.appendChild(chart);
```

**Gráficos Predefinidos:**

```javascript
// Distribución del Portfolio (Pie Chart)
const distributionChart = ChartComponent.portfolioDistribution([
  { ticker: 'AAPL', value: 25000 },
  { ticker: 'MSFT', value: 20000 },
  { ticker: 'GOOGL', value: 15000 },
  { ticker: 'AMZN', value: 10000 },
]);

// Performance a lo Largo del Tiempo
const performanceChart = ChartComponent.performanceOverTime(
  ['01 Ene', '08 Ene', '15 Ene', '22 Ene'],
  [50000, 52000, 51500, 54200]
);

// Comparación de Holdings
const comparisonChart = ChartComponent.holdingsComparison([
  { ticker: 'AAPL', bought: 150, current: 180 },
  { ticker: 'MSFT', bought: 300, current: 295 },
  { ticker: 'GOOGL', bought: 2800, current: 3000 },
]);

// Riesgo vs Retorno
const riskChart = ChartComponent.riskReturn([
  { ticker: 'AAPL', risk: 0.15, return: 0.25, value: 25000 },
  { ticker: 'MSFT', risk: 0.12, return: 0.20, value: 20000 },
]);
```

**Características:**
- ✅ Múltiples tipos de gráficos
- ✅ Responsive y mobile-friendly
- ✅ Exportación a imagen
- ✅ Interactividad (hover, click)
- ✅ Requiere Chart.js

---

## Instalación de Dependencias

Para que los gráficos funcionen, agreg Chart.js a tu `index.html`:

```html
<!-- En el head o antes de cerrar body -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

---

## Integración con HTML

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio Tracker v2.0</title>
  
  <!-- Estilos -->
  <link rel="stylesheet" href="src/assets/styles/main.css">
  <link rel="stylesheet" href="src/assets/styles/components.css">
  <link rel="stylesheet" href="src/assets/styles/advanced-components.css">
</head>
<body>
  <div id="app"></div>

  <!-- Chart.js para gráficos -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  
  <!-- Tu aplicación -->
  <script type="module" src="src/js/app.js"></script>
</body>
</html>
```

---

## Ejemplo Completo: Dashboard

```javascript
import { Card, Table, ChartComponent } from './src/js/components/index.js';
import Formatters from './src/js/utils/formatters.js';

// Datos
const positions = [
  { ticker: 'AAPL', quantity: 10, bought: 150, current: 180 },
  { ticker: 'MSFT', quantity: 5, bought: 300, current: 295 },
];

// KPI Cards
const app = document.getElementById('app');

const cardsContainer = document.createElement('div');
cardsContainer.className = 'cards-grid';
cardsContainer.style.display = 'grid';
cardsContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
cardsContainer.style.gap = '16px';
cardsContainer.style.marginBottom = '32px';

const totalInvested = positions.reduce((sum, p) => sum + (p.quantity * p.bought), 0);
const currentValue = positions.reduce((sum, p) => sum + (p.quantity * p.current), 0);
const pnl = currentValue - totalInvested;
const roi = (pnl / totalInvested) * 100;

cardsContainer.appendChild(Card.totalInvested(
  Formatters.currency(totalInvested),
  `${roi.toFixed(2)}%`
));
cardsContainer.appendChild(Card.currentValue(
  Formatters.currency(currentValue),
  `${roi.toFixed(2)}%`
));
cardsContainer.appendChild(Card.profitLoss(
  Formatters.currency(pnl)
));
cardsContainer.appendChild(Card.roi(`${roi.toFixed(2)}%`));

app.appendChild(cardsContainer);

// Tabla de posiciones
const table = Table.create({
  columns: [
    { key: 'ticker', label: 'Ticker', sortable: true },
    { key: 'quantity', label: 'Cantidad', sortable: true },
    { key: 'bought', label: 'Compra', sortable: true },
    { key: 'current', label: 'Actual', sortable: true },
  ],
  data: positions,
  sortable: true,
  filterable: true,
  paginated: true,
  selectable: true,
});

app.appendChild(table);

// Gráfico de distribución
const chart = ChartComponent.portfolioDistribution(
  positions.map(p => ({
    ticker: p.ticker,
    value: p.quantity * p.current,
  }))
);

chart.render();
app.appendChild(chart);
```

---

## Próximas Fases

### Fase 3: Layouts (4h)
- [ ] Sidebar navigation
- [ ] Top navbar
- [ ] Main layout system
- [ ] Responsive grid

### Fase 4: Views (4h)
- [ ] Dashboard view
- [ ] Positions manager
- [ ] Analytics view
- [ ] Settings page

### Fase 5: Features (2h)
- [ ] Dark/Light mode
- [ ] Animations
- [ ] Drag & drop
- [ ] Real-time updates

---

## Status

✅ **Fase 1 (Componentes Base)** - COMPLETA
✅ **Fase 2 (Componentes Avanzados)** - COMPLETA
⏳ **Fase 3 (Layouts)** - PRÓXIMO
⏳ **Fase 4 (Views)** - DESPUÉS
⏳ **Fase 5 (Features)** - FINAL

---

**Fecha**: 12/01/2026  
**Componentes Totales**: 10  
**Líneas de Código**: ~5,000+  
**Status**: 🚀 PRODUCTION READY
