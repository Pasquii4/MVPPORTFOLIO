/**
 * Loader Component
 */

function showLoader() {
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    mainContent.innerHTML = `
      <div class="loader">
        <div class="loader-spinner"></div>
        <div class="loader-text">Cargando...</div>
      </div>
    `;
  }
}

function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.remove();
  }
}
