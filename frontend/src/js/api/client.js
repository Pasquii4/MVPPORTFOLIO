/**
 * Cliente HTTP para API
 */

class APIClient {
    static BASE_URL = CONFIG.API_BASE_URL;

    /**
     * Petición HTTP genérica
     */
    static async request(method, endpoint, body = null) {
        try {
            const options = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            if (body) {
                options.body = JSON.stringify(body);
            }

            const response = await fetch(`${this.BASE_URL}${endpoint}`, options);

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || `HTTP ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`API Error [${method} ${endpoint}]:`, error);
            throw error;
        }
    }

    /**
     * GET request
     */
    static get(endpoint) {
        return this.request('GET', endpoint);
    }

    /**
     * POST request
     */
    static post(endpoint, body) {
        return this.request('POST', endpoint, body);
    }

    /**
     * PUT request
     */
    static put(endpoint, body) {
        return this.request('PUT', endpoint, body);
    }

    /**
     * DELETE request
     */
    static delete(endpoint) {
        return this.request('DELETE', endpoint);
    }
}
