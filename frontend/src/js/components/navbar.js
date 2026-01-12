/**
 * Top Navbar Component
 * Features: Search, notifications, user menu, theme toggle, sticky
 */

class Navbar {
  constructor(options = {}) {
    this.options = {
      sticky: true,
      searchable: true,
      notificationsCount: 0,
      userName: 'User',
      onSearch: () => {},
      onNotifications: () => {},
      onSettings: () => {},
      onLogout: () => {},
      onThemeToggle: () => {},
      ...options,
    };

    this.element = null;
    this.searchInput = null;
    this.notificationsBell = null;
    this.isDarkMode = this.getTheme() === 'dark';
  }

  static create(options) {
    const navbar = new Navbar(options);
    navbar.render();
    return navbar;
  }

  render() {
    this.element = document.createElement('nav');
    this.element.className = `navbar ${this.options.sticky ? 'navbar--sticky' : ''}`;

    // Left section - Search
    const left = document.createElement('div');
    left.className = 'navbar-left';

    if (this.options.searchable) {
      const searchContainer = document.createElement('div');
      searchContainer.className = 'navbar-search';
      this.searchInput = document.createElement('input');
      this.searchInput.type = 'text';
      this.searchInput.placeholder = 'Search positions, analytics...';
      this.searchInput.className = 'navbar-search-input';
      this.searchInput.addEventListener('input', (e) => {
        this.options.onSearch(e.target.value);
      });
      searchContainer.appendChild(this.searchInput);
      left.appendChild(searchContainer);
    }

    // Right section - Actions
    const right = document.createElement('div');
    right.className = 'navbar-right';

    // Notifications
    const notificationsContainer = document.createElement('div');
    notificationsContainer.className = 'navbar-notifications';
    this.notificationsBell = document.createElement('button');
    this.notificationsBell.className = 'navbar-icon-btn';
    this.notificationsBell.innerHTML = '\ud83d\udd14';
    if (this.options.notificationsCount > 0) {
      const badge = document.createElement('span');
      badge.className = 'notification-badge';
      badge.textContent = this.options.notificationsCount;
      this.notificationsBell.appendChild(badge);
    }
    this.notificationsBell.addEventListener('click', () => {
      this.options.onNotifications();
    });
    notificationsContainer.appendChild(this.notificationsBell);
    right.appendChild(notificationsContainer);

    // Theme toggle
    const themeBtn = document.createElement('button');
    themeBtn.className = 'navbar-icon-btn navbar-theme-btn';
    themeBtn.innerHTML = this.isDarkMode ? '\u2600' : '\ud83c\udf19';
    themeBtn.title = 'Toggle theme';
    themeBtn.addEventListener('click', () => {
      this.toggleTheme();
      this.options.onThemeToggle(this.isDarkMode);
    });
    right.appendChild(themeBtn);

    // User menu dropdown
    const userMenuContainer = document.createElement('div');
    userMenuContainer.className = 'navbar-user-menu';
    const userBtn = document.createElement('button');
    userBtn.className = 'navbar-user-btn';
    userBtn.innerHTML = `
      <img src="https://ui-avatars.com/api/?name=${this.options.userName}" alt="User" class="navbar-user-avatar">
      <span class="navbar-user-name">${this.options.userName}</span>
    `;

    const dropdown = document.createElement('div');
    dropdown.className = 'navbar-dropdown';
    dropdown.innerHTML = `
      <a href="#/settings" class="dropdown-item">Settings</a>
      <a href="#/profile" class="dropdown-item">Profile</a>
      <div class="dropdown-divider"></div>
      <a href="#" class="dropdown-item dropdown-danger">Logout</a>
    `;

    // Dropdown logic
    userBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('active');
    });

    dropdown.querySelector('.dropdown-danger').addEventListener('click', (e) => {
      e.preventDefault();
      this.options.onLogout();
    });

    document.addEventListener('click', () => {
      dropdown.classList.remove('active');
    });

    userMenuContainer.appendChild(userBtn);
    userMenuContainer.appendChild(dropdown);
    right.appendChild(userMenuContainer);

    this.element.appendChild(left);
    this.element.appendChild(right);

    return this.element;
  }

  getTheme() {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
  }

  setNotificationsCount(count) {
    this.options.notificationsCount = count;
    const badge = this.notificationsBell.querySelector('.notification-badge');
    if (count > 0) {
      if (!badge) {
        const newBadge = document.createElement('span');
        newBadge.className = 'notification-badge';
        newBadge.textContent = count;
        this.notificationsBell.appendChild(newBadge);
      } else {
        badge.textContent = count;
      }
    } else if (badge) {
      badge.remove();
    }
  }

  setUserName(name) {
    this.options.userName = name;
    const userBtn = this.element.querySelector('.navbar-user-btn');
    if (userBtn) {
      userBtn.innerHTML = `
        <img src="https://ui-avatars.com/api/?name=${name}" alt="User" class="navbar-user-avatar">
        <span class="navbar-user-name">${name}</span>
      `;
    }
  }

  getElement() {
    return this.element;
  }
}

export default Navbar;