/**
 * Education View - Financial education and learning resources
 */

window.Views = window.Views || {};

window.Views.education = function() {
  const mainContent = document.getElementById('main-content');

  const html = `
    <div class="page-container">
      <h1 class="page-title">🎓 Educación Financiera</h1>
      <p class="page-subtitle">Aprende a invertir con confianza</p>
      
      <!-- Beginner Course -->
      <div class="card mb-4">
        <div class="card-header">
          <h2 class="card-title">🟢 Principiante</h2>
          <span class="badge badge-success">Recomendado para empezar</span>
        </div>
        <div class="card-body">
          <p style="margin-bottom: 16px; color: var(--color-text-secondary);">
            Conceptos fundamentales de inversión en bolsa y mercados financieros.
          </p>
          <ul style="padding-left: 20px; margin-bottom: 16px;">
            <li>📀 Introducción al mercado de valores</li>
            <li>💵 Conceptos básicos de inversión</li>
            <li>🎦 Cómo abrir una cuenta de inversiones</li>
            <li>🤘 Tu primer trade paso a paso</li>
            <li>📈 Lectura de gráficos básica</li>
          </ul>
          <button class="btn btn-primary" onclick="showNotification('Contenido en desarrollo', 'info')">Empezar Ahora</button>
        </div>
      </div>

      <!-- Intermediate Course -->
      <div class="card mb-4">
        <div class="card-header">
          <h2 class="card-title">🟡 Intermedio</h2>
          <span class="badge badge-info">Para desarrollar habilidades</span>
        </div>
        <div class="card-body">
          <p style="margin-bottom: 16px; color: var(--color-text-secondary);">
            Estrategias de trading, análisis técnico y gestión del riesgo.
          </p>
          <ul style="padding-left: 20px; margin-bottom: 16px;">
            <li>🔍 Análisis técnico intermedio</li>
            <li>⚠️ Gestión profesional del riesgo</li>
            <li>📈 Diversificación de portafolio</li>
            <li>📊 Swing trading efectivo</li>
            <li>🤢 Psicología del trader</li>
          </ul>
          <button class="btn btn-outline" onclick="showNotification('Contenido en desarrollo', 'info')">Ver Más</button>
        </div>
      </div>

      <!-- Advanced Course -->
      <div class="card mb-4">
        <div class="card-header">
          <h2 class="card-title">🔴 Avanzado</h2>
          <span class="badge badge-warning">Para expertos</span>
        </div>
        <div class="card-body">
          <p style="margin-bottom: 16px; color: var(--color-text-secondary);">
            Estrategias complejas, trading de opciones y sistemas automáticos.
          </p>
          <ul style="padding-left: 20px; margin-bottom: 16px;">
            <li>🧠 Análisis técnico avanzado</li>
            <li>📊 Trading con opciones</li>
            <li>💺 Estrategias complejas</li>
            <li>🦾 Sistemas automáticos (bots)</li>
            <li>📝 Backtesting y optimización</li>
          </ul>
          <button class="btn btn-outline" onclick="showNotification('Contenido en desarrollo', 'info')">Ver Más</button>
        </div>
      </div>

      <!-- Resources -->
      <div class="grid-2 mb-4">
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">📚 Libros Recomendados</h2>
          </div>
          <div class="card-body">
            <ul style="padding-left: 20px;">
              <li><strong>A Random Walk Down Wall Street</strong> - Burton Malkiel</li>
              <li><strong>The Intelligent Investor</strong> - Benjamin Graham</li>
              <li><strong>Market Wizards</strong> - Jack Schwager</li>
              <li><strong>Technical Analysis of the Financial Markets</strong> - John Murphy</li>
              <li><strong>El Inversor Inteligente</strong> - Benjamin Graham (ES)</li>
            </ul>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h2 class="card-title">🎥 Canales de YouTube</h2>
          </div>
          <div class="card-body">
            <ul style="padding-left: 20px;">
              <li><strong>Investopedia</strong> - Educación general</li>
              <li><strong>Andres Guzman</strong> - Trading español</li>
              <li><strong>Tradersuniversity</strong> - Técnicas avanzadas</li>
              <li><strong>CME Group</strong> - Mercados y derivados</li>
              <li><strong>TradingView</strong> - Análisis técnico</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Tools -->
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">🛠️ Herramientas Ütiles</h2>
        </div>
        <div class="card-body">
          <div class="grid-2">
            <div style="padding: 16px; background: var(--color-secondary); border-radius: 8px;">
              <h4 style="margin-top: 0;">Simuladores de Trading</h4>
              <p style="color: var(--color-text-secondary); font-size: 0.9rem; margin-bottom: 12px;">
                Practica sin dinero real
              </p>
              <button class="btn btn-sm btn-primary" onclick="showNotification('Abriendo...', 'info')">TradingView Paper Trading</button>
            </div>
            <div style="padding: 16px; background: var(--color-secondary); border-radius: 8px;">
              <h4 style="margin-top: 0;">Análisis Fundamental</h4>
              <p style="color: var(--color-text-secondary); font-size: 0.9rem; margin-bottom: 12px;">
                Investigación de empresas
              </p>
              <button class="btn btn-sm btn-primary" onclick="showNotification('Abriendo...', 'info')">Yahoo Finance</button>
            </div>
            <div style="padding: 16px; background: var(--color-secondary); border-radius: 8px;">
              <h4 style="margin-top: 0;">Noticias de Mercado</h4>
              <p style="color: var(--color-text-secondary); font-size: 0.9rem; margin-bottom: 12px;">
                Últimas noticias financieras
              </p>
              <button class="btn btn-sm btn-primary" onclick="showNotification('Abriendo...', 'info')">Reuters / Bloomberg</button>
            </div>
            <div style="padding: 16px; background: var(--color-secondary); border-radius: 8px;">
              <h4 style="margin-top: 0;">Comunidades de Trading</h4>
              <p style="color: var(--color-text-secondary); font-size: 0.9rem; margin-bottom: 12px;">
                Conecta con otros traders
              </p>
              <button class="btn btn-sm btn-primary" onclick="showNotification('Abriendo...', 'info')">Stocktwits / Reddit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  mainContent.innerHTML = html;
};
