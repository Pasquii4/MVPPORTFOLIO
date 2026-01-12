/**
 * Componente Modal
 */

function createModal(title, content, actions = []) {
    const container = document.getElementById('modal-container');
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    let actionsHTML = '';
    if (actions.length > 0) {
        actionsHTML = '<div class="flex gap-3 justify-end mt-6">';
        actions.forEach(action => {
            actionsHTML += `<button class="px-4 py-2 ${action.class} rounded text-sm font-medium">${action.label}</button>`;
        });
        actionsHTML += '</div>';
    }
    
    modal.innerHTML = `
        <div class="bg-gray-800 rounded-lg shadow-2xl max-w-md w-full mx-4 p-6">
            <h3 class="text-xl font-bold mb-4">${title}</h3>
            <div class="text-gray-300 mb-4">${content}</div>
            ${actionsHTML}
        </div>
    `;
    
    container.appendChild(modal);
    
    // Attach handlers
    const buttons = modal.querySelectorAll('button');
    buttons.forEach((btn, idx) => {
        if (actions[idx]) {
            btn.addEventListener('click', () => {
                if (actions[idx].callback) actions[idx].callback();
                modal.remove();
            });
        }
    });
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    return modal;
}
