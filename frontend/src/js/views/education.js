/**
 * Education View
 */

const Views = window.Views || {};

Views.education = function() {
  const mainContent = document.getElementById('main-content');

  const courses = [
    { id: 1, title: 'Introducción al Trading', level: 'Principiante', duration: '2h', instructor: 'Juan Pérez' },
    { id: 2, title: 'Análisis Técnico Avanzado', level: 'Intermedio', duration: '4h', instructor: 'María García' },
    { id: 3, title: 'Gestión de Riesgo', level: 'Intermedio', duration: '3h', instructor: 'Carlos López' },
    { id: 4, title: 'Trading Algorítmico', level: 'Avanzado', duration: '6h', instructor: 'David Smith' }
  ];

  const html = `
    <div class="page-container">
      <h1 class="page-title">🎓 Educación</h1>
      
      <div class="courses-grid">
        ${courses.map(course => `
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">${course.title}</h3>
            </div>
            <div class="card-body">
              <p style="margin-bottom: 8px;"><strong>Nivel:</strong> ${course.level}</p>
              <p style="margin-bottom: 8px;"><strong>Duración:</strong> ${course.duration}</p>
              <p style="margin-bottom: 0;"><strong>Instructor:</strong> ${course.instructor}</p>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary btn-sm" onclick="enrollCourse(${course.id})" style="width: 100%;">Inscribirse</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  mainContent.innerHTML = html;
};

function enrollCourse(courseId) {
  showNotification('¡Inscripción confirmada!', 'success');
}

if (!window.Views) window.Views = {};
window.Views.education = Views.education;
