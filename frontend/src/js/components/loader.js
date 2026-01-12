/**
 * Loader Component
 * Indicadores de carga
 */
class Loader {
  /**
   * Crear loader
   * @param {string} message - Mensaje de carga
   */
  static create(message = 'Cargando...') {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
      <div class="loader-spinner"></div>
      <div class="loader-text">${message}</div>
    `;
    return loader;
  }

  /**
   * Mostrar loader en elemento
   */
  static show(element, message = 'Cargando...') {
    const loader = this.create(message);
    element.appendChild(loader);
    element.classList.add('loading');
    return loader;
  }

  /**
   * Esconder loader
   */
  static hide(element) {
    const loader = element.querySelector('.loader');
    if (loader) loader.remove();
    element.classList.remove('loading');
  }
}

window.Loader = Loader;