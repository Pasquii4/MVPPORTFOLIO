/**
 * API - Posiciones
 */

const PositionsAPI = {
    /**
     * Obtener todas las posiciones
     */
    getAll: () => APIClient.get('/positions/'),

    /**
     * Obtener posición por ID
     */
    getById: (id) => APIClient.get(`/positions/${id}`),

    /**
     * Crear posición
     */
    create: (data) => APIClient.post('/positions/', data),

    /**
     * Actualizar posición
     */
    update: (id, data) => APIClient.put(`/positions/${id}`, data),

    /**
     * Eliminar posición
     */
    delete: (id) => APIClient.delete(`/positions/${id}`),

    /**
     * Vender posición
     */
    sell: (id, sellPrice, sellDate) => 
        APIClient.post(`/positions/${id}/sell?sell_price=${sellPrice}&sell_date=${sellDate}`),

    /**
     * Obtener posiciones cerradas
     */
    getClosed: () => APIClient.get('/positions/closed/all'),
};
