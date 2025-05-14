const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:1400';  // Fallback to default if env variable not set
import { logInfo, logError, logWarning } from '../../utils/logger';

export const authenticateUser = async (identifier: string, password: string) => {
    try {
        const url = `${API_URL}/api/auth/local`;
        logInfo('Authentication request', { 
            url,
            identifier,
            timestamp: new Date().toISOString()
        });
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
            body: JSON.stringify({
                identifier,
                password,
            }),
        });

        logInfo('Authentication response received', { 
            status: response.status,
            statusText: response.statusText
        });
        
        if (!response.ok) {
            // Handle errors if the response status is not OK (e.g., 4xx or 5xx)
            let errorData;
            try {
                errorData = await response.json();
            } catch (e) {
                logError('Failed to parse error response as JSON', {
                    parseError: e.message,
                    responseStatus: response.status
                });
                errorData = { error: 'Unknown error', status: response.status };
            }
            
            logError('Authentication error response', {
                status: response.status,
                statusText: response.statusText,
                errorData
            });
            
            throw new Error(`Authentication failed with status ${response.status}: ${JSON.stringify(errorData)}`);
        }

        let data;
        try {
            data = await response.json();
            logInfo('Authentication successful', {
                hasUser: !!data?.user,
                hasJwt: !!data?.jwt
            });
        } catch (e) {
            logError('Failed to parse success response as JSON', { parseError: e.message });
            throw new Error('Failed to parse authentication response');
        }
        
        return data;
    } catch (error) {
        logError('Authentication error', {
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString()
        });
        throw error;
    }
};

export const registerUser = async (userData: Record<string, any>) => {
    try {
        const url = `${API_URL}/api/auth/local/register`;
        logInfo('Registration request', {
            url,
            username: userData.username,
            email: userData.email
        });
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        logInfo('Registration response received', {
            status: response.status,
            statusText: response.statusText
        });

        if (!response.ok) {
            // Handle errors if the response status is not OK (e.g., 4xx or 5xx)
            let errorData;
            try {
                errorData = await response.json();
            } catch (e) {
                logError('Failed to parse error response as JSON', {
                    parseError: e.message,
                    responseStatus: response.status
                });
                errorData = { error: 'Unknown error', status: response.status };
            }
            
            logError('Registration error response', {
                status: response.status,
                statusText: response.statusText,
                errorData
            });
            
            throw new Error(`Registration failed with status ${response.status}: ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        logInfo('Registration successful', {
            hasUser: !!data?.user,
            hasJwt: !!data?.jwt
        });
        
        return data;
    } catch (error) {
        logError('Registration error', {
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString()
        });
        throw error;
    }
};
