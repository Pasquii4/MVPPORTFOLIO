/**
 * Education View
 * Contenido educativo
 */
Views.education = function() {
  const container = document.getElementById('app-view');
  container.innerHTML = '';
  
  const title = document.createElement('h1');
  title.className = 'page-title';
  title.textContent = '🎓 Educación';
  container.appendChild(title);
  
  // Cursos
  const courses = [
    {
      level: 'Principiante',
      title: 'Introducción a la Inversión',
      description: 'Aprende los conceptos básicos de la inversión en acciones',
      lessons: 8
    },
    {
      level: 'Intermedio',
      title: 'Análisis Técnico',
      description: 'Domina las técnicas de análisis de gráficos',
      lessons: 12
    },
    {
      level: 'Intermedio',
      title: 'Análisis Fundamental',
      description: 'Evalúa empresas usando información financiera',
      lessons: 10
    },
    {
      level: 'Avanzado',
      title: 'Estrategias Avanzadas',
      description: 'Aprende estrategias de trading profesionales',
      lessons: 15
    }
  ];
  
  const coursesGrid = document.createElement('div');
  coursesGrid.className = 'courses-grid';
  
  courses.forEach(course => {
    const courseCard = Card.create({
      title: course.title,
      content: `
        <div class="course-content">
          <div class="course-level badge badge-${course.level.toLowerCase()}">${course.level}</div>
          <p class="course-description">${course.description}</p>
          <div class="course-meta">
            <span class="course-lessons">📚 ${course.lessons} lecciones</span>
          </div>
        </div>
      `,
      footer: '<button class="btn btn-primary">Comenzar</button>'
    });
    coursesGrid.appendChild(courseCard);
  });
  
  container.appendChild(coursesGrid);
  
  if (navbarComponent) {
    navbarComponent.setTitle('🎓 Educación');
  }
  
  if (sidebarComponent) {
    sidebarComponent.updateActive('education');
  }
};