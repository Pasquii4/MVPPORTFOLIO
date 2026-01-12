/**
 * Componente Chart.js
 */

function createPieChart(elementId, labels, data, colors = null) {
    const ctx = document.getElementById(elementId)?.getContext('2d');
    if (!ctx) return null;
    
    const defaultColors = [
        '#3b82f6', '#10b981', '#f59e0b', '#ef4444',
        '#8b5cf6', '#06b6d4', '#ec4899', '#6366f1',
    ];
    
    return new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels,
            datasets: [{
                data,
                backgroundColor: colors || defaultColors.slice(0, data.length),
                borderColor: '#1f2937',
                borderWidth: 2,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#d1d5db', padding: 20 },
                },
            },
        },
    });
}

function createBarChart(elementId, labels, datasets) {
    const ctx = document.getElementById(elementId)?.getContext('2d');
    if (!ctx) return null;
    
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets,
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    labels: { color: '#d1d5db' },
                },
            },
            scales: {
                y: {
                    ticks: { color: '#d1d5db' },
                    grid: { color: '#374151' },
                },
                x: {
                    ticks: { color: '#d1d5db' },
                    grid: { color: '#374151' },
                },
            },
        },
    });
}

function createLineChart(elementId, labels, datasets) {
    const ctx = document.getElementById(elementId)?.getContext('2d');
    if (!ctx) return null;
    
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets,
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    labels: { color: '#d1d5db' },
                },
            },
            scales: {
                y: {
                    ticks: { color: '#d1d5db' },
                    grid: { color: '#374151' },
                },
                x: {
                    ticks: { color: '#d1d5db' },
                    grid: { color: '#374151' },
                },
            },
        },
    });
}
