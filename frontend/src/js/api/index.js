/**
 * Cliente API mejorado con reintentos y mejor manejo de errores
 */

const API_BASE_URL = 'http://localhost:8000/api';
const API_TIMEOUT = 10000; // 10 segundos
const MAX_RETRIES = 2;

class APIClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
    this.timeout = API_TIMEOUT;
  }

  /**
   * Realizar petición HTTP con reintentos y timeout
   */
  async request(method, endpoint, data = null, retries = MAX_RETRIES) {
    const url = `${this.baseURL}${endpoint}`;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Parsear respuesta
      let responseData;
      try {
        responseData = await response.json();
      } catch (e) {
        responseData = { message: response.statusText };
      }

      // Manejar errores HTTP
      if (!response.ok) {
        const errorMessage = responseData.detail || responseData.message || `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }

      return responseData;
    } catch (error) {
      // Si es timeout o error de red, reintentar
      if (retries > 0 && (error.name === 'AbortError' || !navigator.onLine)) {
        console.warn(`Reintentando... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.request(method, endpoint, data, retries - 1);
      }

      throw error;
    }
  }

  // POSICIONES
  positions = {
    getAll: () => this.request('GET', '/positions'),
    get: (id) => this.request('GET', `/positions/${id}`),
    create: (data) => this.request('POST', '/positions', data),
    update: (id, data) => this.request('PUT', `/positions/${id}`, data),
    delete: (id) => this.request('DELETE', `/positions/${id}`),
    sell: (id, data) => this.request('POST', `/positions/${id}/sell`, data),
  };

  // PORTFOLIO
  portfolio = {
    metrics: () => this.request('GET', '/portfolio/metrics'),
    history: () => this.request('GET', '/portfolio/history'),
    distribution: () => this.request('GET', '/portfolio/distribution'),
  };

  // POSICIONES CERRADAS
  closed = {
    getAll: () => this.request('GET', '/closed-positions'),
    stats: () => this.request('GET', '/closed-positions/stats'),
  };

  // EDUCACIÓN
  education = {
    ratios: () => this.request('GET', '/education/ratios'),
    glossary: () => this.request('GET', '/education/glossary'),
    tips: () => this.request('GET', '/education/tips'),
  };
}

const apiClient = new APIClient();
