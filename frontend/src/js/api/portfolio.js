/**
 * API - Portfolio
 */

const PortfolioAPI = {
    /**
     * Obtener dashboard completo
     */
    getDashboard: () => APIClient.get('/portfolio/dashboard'),

    /**
     * Obtener resumen rápido
     */
    getSummary: () => APIClient.get('/portfolio/summary'),

    /**
     * Obtener asignación
     */
    getAllocation: () => APIClient.get('/portfolio/allocation'),
};

/**
 * API - Educación
 */

const EducationAPI = {
    /**
     * Obtener todos los ratios
     */
    getRatios: () => APIClient.get('/education/ratios'),

    /**
     * Obtener ratio específico
     */
    getRatio: (ratio) => APIClient.get(`/education/ratios/${ratio}`),

    /**
     * Obtener glosario
     */
    getGlossary: () => APIClient.get('/education/glossary'),

    /**
     * Obtener término
     */
    getTerm: (term) => APIClient.get(`/education/glossary/${term}`),

    /**
     * Obtener tips
     */
    getTips: () => APIClient.get('/education/tips'),
};
