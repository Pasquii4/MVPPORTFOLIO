/**
 * Education View
 */

window.Views = window.Views || {};

window.Views.education = function() {
  const mainContent = document.getElementById('main-content');

  const html = `
    <div class="page-container">
      <h1 class="page-title">🎓 Educación Financiera</h1>
      
      <div class="grid-2">
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">🟢 Principiante</h2>
          </div>
          <div class="card-body">
            <ul style="padding-left: 20px;">
              <li>Introducción al mercado de valores</li>
              <li>Conceptos básicos de inversión</li>
              <li>Cómo abrir una cuenta de inversiones</li>
              <li>Tu primer trade</li>
            </ul>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h2 class="card-title">🟡 Intermedio</h2>
          </div>
          <div class="card-body">
            <ul style="padding-left: 20px;">
              <li>Análisis técnico básico</li>
              <li>Gestión del riesgo</li>
              <li>Diversificación de portafolio</li>
              <li>Swing trading</li>
            </ul>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h2 class="card-title">🔴 Avanzado</h2>
          </div>
          <div class="card-body">
            <ul style="padding-left: 20px;">
              <li>Análisis técnico avanzado</li>
              <li>Trading con opciones</li>
              <li>Estrategias complejas</li>
              <li>Psicología del trader</li>
            </ul>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h2 class="card-title">📚 Recursos</h2>
          </div>
          <div class="card-body">
            <ul style="padding-left: 20px;">
              <li>Libros recomendados</li>
              <li>Canales de YouTube</li>
              <li>Comunidades de traders</li>
              <li>Simuladores de trading</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;

  mainContent.innerHTML = html;
};
