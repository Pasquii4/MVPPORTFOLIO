/**
 * Modal Component
 */

function showModal(options = {}) {
  const {
    title = 'Modal',
    content = '',
    buttons = []
  } = options;

  const modal = document.createElement('div');
  modal.className = 'modal';
  
  let buttonsHtml = '';
  buttons.forEach(btn => {
    buttonsHtml += `<button class="btn btn-${btn.type || 'primary'}" onclick="${btn.onClick}">${btn.text}</button>`;
  });

  modal.innerHTML = `
    <div class="modal-backdrop" onclick="this.parentElement.remove()"></div>
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">${title}</h2>
          <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
        </div>
        <div class="modal-body">${content}</div>
        <div class="modal-footer">${buttonsHtml}</div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  return modal;
}
