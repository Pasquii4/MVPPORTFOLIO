/**
 * Vista Educación
 */

async function renderEducationView() {
    const content = document.getElementById('content');
    content.innerHTML = '<p class="text-gray-400">Cargando educación...</p>';

    try {
        showLoading('Cargando contenido educativo...');
        const [ratios, glossary, tips] = await Promise.all([
            EducationAPI.getRatios(),
            EducationAPI.getGlossary(),
            EducationAPI.getTips(),
        ]);
        hideLoading();

        let ratiosHTML = '<div class="grid grid-cols-1 md:grid-cols-2 gap-4">';
        Object.entries(ratios.ratios || {}).forEach(([key, ratio]) => {
            ratiosHTML += `
                <div class="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <h4 class="font-bold text-primary">${key}</h4>
                    <p class="text-sm text-gray-300 mt-1">${ratio.name}</p>
                    <p class="text-xs text-gray-400 mt-2">📚 ${ratio.description}</p>
                    <p class="text-xs text-yellow-400 mt-2">Ideal: ${ratio.ideal_value}</p>
                </div>
            `;
        });
        ratiosHTML += '</div>';

        let glossaryHTML = '<div class="grid grid-cols-1 md:grid-cols-2 gap-4">';
        Object.entries(glossary.glossary || {}).forEach(([term, definition]) => {
            glossaryHTML += `
                <div class="bg-gray-700 p-3 rounded-lg">
                    <p class="font-bold text-primary">${term}</p>
                    <p class="text-sm text-gray-300 mt-1">${definition}</p>
                </div>
            `;
        });
        glossaryHTML += '</div>';

        let tipsHTML = '<div class="space-y-2">';
        (tips.tips || []).forEach(tip => {
            tipsHTML += `<div class="bg-blue-900 bg-opacity-30 p-3 rounded-lg border-l-4 border-blue-500 text-gray-300">${tip}</div>`;
        });
        tipsHTML += '</div>';

        content.innerHTML = `
            <div class="space-y-8">
                <div>
                    <h3 class="text-2xl font-bold mb-4">💴 Ratios financieros</h3>
                    ${ratiosHTML}
                </div>
                <div>
                    <h3 class="text-2xl font-bold mb-4">📚 Glosario</h3>
                    ${glossaryHTML}
                </div>
                <div>
                    <h3 class="text-2xl font-bold mb-4">💡 Tips</h3>
                    ${tipsHTML}
                </div>
            </div>
        `;
    } catch (e) {
        hideLoading();
        showNotification('Error cargando educación: ' + e.message, 'error');
    }
}
