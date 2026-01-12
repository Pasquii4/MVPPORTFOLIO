/**
 * Sidebar Navigation Component
 * Features: Collapsible, icons, active states, animations
 */

class Sidebar {
  constructor(options = {}) {
    this.options = {
      collapsible: true,
      collapsed: false,
      width: '280px',
      miniWidth: '80px',
      items: [],
      onItemClick: () => {},
      ...options,
    };
    this.isCollapsed = this.options.collapsed;
    this.element = null;
    this.items = new Map();
  }

  static create(options) {
    const sidebar = new Sidebar(options);
    sidebar.render();
    return sidebar;
  }

  render() {
    this.element = document.createElement('aside');
    this.element.className = `sidebar ${this.isCollapsed ? 'sidebar--collapsed' : ''}`;
    this.element.style.setProperty('--sidebar-width', this.options.width);
    this.element.style.setProperty('--sidebar-mini-width', this.options.miniWidth);

    const header = document.createElement('div');
    header.className = 'sidebar-header';
    header.innerHTML = `
      <div class="sidebar-brand">
        <span class="sidebar-logo">Chart</span>
        <h1 class="sidebar-title">Portfolio</h1>
      </div>
    `;

    if (this.options.collapsible) {
      const toggleBtn = document.createElement('button');
      toggleBtn.className = 'sidebar-toggle';
      toggleBtn.textContent = '≡';
      toggleBtn.addEventListener('click', () => this.toggle());
      header.appendChild(toggleBtn);
    }

    const nav = document.createElement('nav');
    nav.className = 'sidebar-nav';
    this.options.items.forEach((item) => {
      const navItem = this.createNavItem(item);
      nav.appendChild(navItem);
      this.items.set(item.id || item.label, navItem);
    });

    const footer = document.createElement('div');
    footer.className = 'sidebar-footer';
    footer.innerHTML = `<div class="sidebar-user"><p class="user-name">User</p></div>`;

    this.element.appendChild(header);
    this.element.appendChild(nav);
    this.element.appendChild(footer);
    return this.element;
  }

  createNavItem(item) {
    const navItem = document.createElement('a');
    navItem.href = item.href || '#';
    navItem.className = `nav-item ${item.active ? 'active' : ''}`;
    navItem.title = item.label;

    const icon = document.createElement('span');
    icon.className = 'nav-icon';
    icon.textContent = item.icon || 'O';

    const label = document.createElement('span');
    label.className = 'nav-label';
    label.textContent = item.label;

    navItem.appendChild(icon);
    navItem.appendChild(label);

    navItem.addEventListener('click', (e) => {
      e.preventDefault();
      this.element.querySelectorAll('.nav-item').forEach((el) => {
        el.classList.remove('active');
      });
      navItem.classList.add('active');
      this.options.onItemClick(item, e);
    });

    return navItem;
  }

  toggle() {
    this.isCollapsed = !this.isCollapsed;
    this.element.classList.toggle('sidebar--collapsed');
    localStorage.setItem('sidebar-collapsed', this.isCollapsed);
  }

  setActiveItem(itemId) {
    this.element.querySelectorAll('.nav-item').forEach((el) => {
      el.classList.remove('active');
    });
    const item = this.items.get(itemId);
    if (item) item.classList.add('active');
  }

  addItem(item) {
    const nav = this.element.querySelector('.sidebar-nav');
    const navItem = this.createNavItem(item);
    nav.appendChild(navItem);
    this.items.set(item.id || item.label, navItem);
  }

  removeItem(itemId) {
    const item = this.items.get(itemId);
    if (item) {
      item.remove();
      this.items.delete(itemId);
    }
  }

  getElement() {
    return this.element;
  }
}

// Registrar globalmente (sin export para scripts normales)
window.Sidebar = Sidebar;
