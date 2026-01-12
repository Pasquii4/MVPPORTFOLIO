# 🎨 Components Library Guide - Portfolio Tracker v2.0

**Fase 1: Componentes Base** ✅ **COMPLETADO**

## Componentes Disponibles

### 1. **Card Component**
Contenedor versátil para mostrar información

```javascript
import { Card } from './src/js/components/index.js';

// Crear card personalizado
const card = Card.create({
  title: 'Total Invertido',
  value: '$50,000',
  icon: '💰',
  trend: '+5.2%',
  trendDirection: 'up', // 'up', 'down', 'neutral'
  onClick: () => console.log('clicked')
});

document.body.appendChild(card);

// Variantes predefinidas
const totalCard = Card.totalInvested('$50,000', '+5.2%');
const valueCard = Card.currentValue('$52,600', '+5.2%');
const pnlCard = Card.profitLoss('+$2,600');
const roiCard = Card.roi('+5.2%');
```

### 2. **Button Component**
Botones con múltiples variantes

```javascript
import { Button } from './src/js/components/index.js';

// Crear botón personalizado
const btn = Button.create({
  label: 'Guardar',
  type: 'primary', // 'primary', 'secondary', 'danger', 'ghost'
  size: 'default', // 'small', 'default', 'large'
  onClick: () => alert('Saved!'),
  icon: '💾'
});

// Variantes predefinidas
const saveBtn = Button.save(onClick);
const deleteBtn = Button.delete(onClick);
const cancelBtn = Button.cancel(onClick);
const addBtn = Button.add(onClick);

// Loading state
Button.setLoading(btn, true);
Button.setLoading(btn, false);
```

### 3. **Badge Component**
Etiquetas y badges de estado

```javascript
import { Badge } from './src/js/components/index.js';

// Crear badge personalizado
const badge = Badge.create({
  label: 'Active',
  variant: 'success', // 'default', 'success', 'warning', 'error', 'info'
  size: 'default', // 'small', 'default', 'large'
  icon: '✅'
});

// Variantes predefinidas
const successBadge = Badge.success('Completado');
const warningBadge = Badge.warning('Pendiente');
const errorBadge = Badge.error('Error');
const infoBadge = Badge.info('Información');

// Status badges
const statusBadge = Badge.status('open'); // 'open', 'closed', 'pending', 'error'

// Trend badges
const trendUp = Badge.trend('up');
const trendDown = Badge.trend('down');
```

### 4. **Input Component**
Campos de entrada con validación

```javascript
import { Input } from './src/js/components/index.js';

// Crear input personalizado
const input = Input.create({
  type: 'text',
  name: 'ticker',
  label: 'Ticker',
  placeholder: 'Ej: AAPL',
  required: true,
  icon: '📊',
  onChange: (e) => console.log(e.target.value),
  error: null // Muestra error si existe
});

// Variantes predefinidas
const textInput = Input.text('Nombre', 'Ingresa tu nombre');
const emailInput = Input.email('Email', 'email@example.com');
const dateInput = Input.date('Fecha de compra');
const numberInput = Input.number('Cantidad', '100');
const searchInput = Input.search('Buscar...');
const passwordInput = Input.password('Contraseña', '****');

// Métodos útiles
const value = input.getValue();
input.setValue('MSFT');
input.setError('Este campo es requerido');
```

### 5. **Select Component**
Dropdown selectores

```javascript
import { Select } from './src/js/components/index.js';

// Crear select personalizado
const select = Select.create({
  name: 'status',
  label: 'Estado',
  options: [
    { value: 'open', label: 'Abierto' },
    { value: 'closed', label: 'Cerrado' },
  ],
  onChange: (e) => console.log(e.target.value)
});

// Variantes predefinidas
const currencySelect = Select.currency((e) => console.log(e));
const timeframeSelect = Select.timeframe((e) => console.log(e));

// Métodos útiles
const value = select.getValue();
select.setValue('closed');
select.setOptions([
  { value: 'new', label: 'Nuevo' },
  { value: 'old', label: 'Antiguo' }
]);
```

### 6. **Loader Component**
Cargadores, skeletons y spinners

```javascript
import { Loader } from './src/js/components/index.js';

// Spinner
const spinner = Loader.spinner({
  size: 'default', // 'small', 'default', 'large'
  text: 'Cargando...',
  centered: true
});

// Skeleton loader
const skeleton = Loader.skeleton({
  rows: 3,
  type: 'text' // 'text', 'card', 'table', 'lines'
});

const tableSketon = Loader.skeleton({
  rows: 5,
  columns: 4,
  type: 'table'
});

// Progress bar
const progress = Loader.progressBar({
  value: 65,
  max: 100,
  color: 'primary', // 'primary', 'success', 'warning', 'error'
  showLabel: true
});

// Pulse animation
const pulse = Loader.pulse({
  size: '40px',
  duration: '2s'
});
```

## Styling & CSS Variables

Todos los componentes usan **CSS variables** para tematización consistente:

```css
/* Light Mode (Default) */
--color-primary: #3b82f6
--color-secondary: #f3f4f6
--color-success: #10b981
--color-warning: #f59e0b
--color-error: #ef4444

/* Dark Mode */
--color-primary: #60a5fa
--color-secondary: #374151
/* etc... */
```

## Utilities

### Formatters

```javascript
import Formatters from './src/js/utils/formatters.js';

// Currency
Formatters.currency(50000); // '$50,000.00'
Formatters.currency(50000, '€', 2); // '€50,000.00'

// Percentage
Formatters.percentage(5.2); // '5.20%'
Formatters.percentage(-3.5); // '-3.50%'

// Numbers
Formatters.number(50000); // '50,000'
Formatters.number(1234.567, 2); // '1,234.57'

// Dates
Formatters.date('2026-01-12'); // '12/01/2026'
Formatters.date('2026-01-12', 'YYYY-MM-DD'); // '2026-01-12'
Formatters.relativeTime('2026-01-12'); // 'hace 2 horas'

// P&L
Formatters.pnl(2600); // '📈 +$2,600.00'
Formatters.pnl(-500); // '📉 $-500.00'

// Abbreviate
Formatters.abbreviate(1500000); // '1.5M'
Formatters.abbreviate(5000); // '5.0K'
```

### Theme Manager

```javascript
import ThemeManager from './src/js/utils/theme.js';

// Inicializar
ThemeManager.init();

// Toggle
ThemeManager.toggle();

// Set manual
ThemeManager.setLight();
ThemeManager.setDark();
ThemeManager.setAuto();

// Get active
if (ThemeManager.isDark()) {
  console.log('Dark mode');
}

const theme = ThemeManager.getActiveTheme(); // 'light' o 'dark'
```

## Ejemplos Completos

### Dashboard KPI Cards

```javascript
import { Card } from './src/js/components/index.js';
import Formatters from './src/js/utils/formatters.js';

const portfolio = {
  invested: 50000,
  current: 52600,
  pnl: 2600,
  roi: 5.2
};

const cardsContainer = document.createElement('div');
cardsContainer.className = 'cards-grid';

cardsContainer.appendChild(Card.totalInvested(
  Formatters.currency(portfolio.invested),
  '+5.2%'
));

cardsContainer.appendChild(Card.currentValue(
  Formatters.currency(portfolio.current),
  '+5.2%'
));

cardsContainer.appendChild(Card.profitLoss(
  Formatters.currency(portfolio.pnl)
));

cardsContainer.appendChild(Card.roi(
  Formatters.percentage(portfolio.roi)
));

document.body.appendChild(cardsContainer);
```

### Form with Input + Select + Button

```javascript
import { Input, Select, Button } from './src/js/components/index.js';

const form = document.createElement('form');
form.className = 'form-container';

const tickerInput = Input.text('Ticker', 'AAPL');
const quantityInput = Input.number('Cantidad', '100');
const dateInput = Input.date('Fecha');
const currencySelect = Select.currency();

const saveBtn = Button.save(() => {
  console.log({
    ticker: tickerInput.getValue(),
    quantity: quantityInput.getValue(),
    date: dateInput.getValue(),
    currency: currencySelect.getValue()
  });
});

form.appendChild(tickerInput);
form.appendChild(quantityInput);
form.appendChild(dateInput);
form.appendChild(currencySelect);
form.appendChild(saveBtn);

document.body.appendChild(form);
```

## Próximas Fases

### Fase 2: Componentes Avanzados (4h)
- [ ] Table component (sortable, filterable)
- [ ] Modal component mejorado
- [ ] Form builder
- [ ] Chart wrapper

### Fase 3: Layouts (4h)
- [ ] Sidebar navigation
- [ ] Top navbar
- [ ] Main layout system

### Fase 4: Views (4h)
- [ ] Dashboard view
- [ ] Positions manager
- [ ] Analytics view

## Notas Importantes

✅ **Zero dependencies** - Todo vanilla JavaScript
✅ **CSS Variables** - Fácil tematización (dark/light mode)
✅ **Accesible** - WCAG 2.1 compliant
✅ **Responsive** - Mobile-first design
✅ **Modular** - Componentes independientes
✅ **Reutilizable** - Plantillas predefinidas

---

**Status**: ✅ FASE 1 COMPLETA  
**Fecha**: 12/01/2026  
**Próximo**: Componentes Avanzados
