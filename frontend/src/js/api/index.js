/**
 * API Client
 * Funciones para comunicarse con el backend
 */
const ApiClient = {
  baseURL: 'http://localhost:8000/api',

  /**
   * Realizar petición HTTP
   */
  async request(endpoint, options = {}) {
    const {
      method = 'GET',
      body = null,
      headers = {}
    } = options;

    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('API Error:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * GET
   */
  get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  },

  /**
   * POST
   */
  post(endpoint, body) {
    return this.request(endpoint, { method: 'POST', body });
  },

  /**
   * PUT
   */
  put(endpoint, body) {
    return this.request(endpoint, { method: 'PUT', body });
  },

  /**
   * DELETE
   */
  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  },

  // Endpoints específicos

  /**
   * Obtener posiciones
   */
  async getPositions() {
    return this.get('/positions');
  },

  /**
   * Obtener portfolio
   */
  async getPortfolio() {
    return this.get('/portfolio');
  },

  /**
   * Crear posición
   */
  async createPosition(data) {
    return this.post('/positions', data);
  },

  /**
   * Actualizar posición
   */
  async updatePosition(id, data) {
    return this.put(`/positions/${id}`, data);
  },

  /**
   * Eliminar posición
   */
  async deletePosition(id) {
    return this.delete(`/positions/${id}`);
  }
};