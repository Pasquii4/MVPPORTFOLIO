/**
 * Loader Component
 */

function showLoader() {
  const loader = document.createElement('div');
  loader.className = 'loader';
  loader.id = 'app-loader';
  loader.innerHTML = `
    <div class="loader-spinner"></div>
    <div class="loader-text">Cargando...</div>
  `;
  return loader;
}

function hideLoader() {
  const loader = document.getElementById('app-loader');
  if (loader) loader.remove();
}
