/**
 * Modal Component
 */

function showModal(title, content, actions = []) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-overlay"></div>
    <div class="modal-content">
      <div class="modal-header">
        <h2>${title}</h2>
        <button class="modal-close">&times;</button>
      </div>
      <div class="modal-body">${content}</div>
      <div class="modal-footer">
        ${actions.map(action => `
          <button class="btn ${action.className || 'btn-secondary'}" data-action="${action.id}">
            ${action.text}
          </button>
        `).join('')}
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
  modal.querySelector('.modal-overlay').addEventListener('click', () => modal.remove());
  
  actions.forEach(action => {
    const btn = modal.querySelector(`[data-action="${action.id}"]`);
    if (btn && action.onClick) {
      btn.addEventListener('click', action.onClick);
    }
  });
  
  return modal;
}
