// src/api/business/login.ts
import { authenticateUser } from '../strapi/authApi';
import { logInfo, logError } from '../../utils/logger';

export const loginWithLineId = async (lineId: string) => {
    const identifier = `cook${lineId}@cook.com`;
    const password = 'cookcook';
    logInfo('LINE LOGIN ATTEMPT', { 
        identifier, 
        lineId,
        timestamp: new Date().toISOString()
    });

    try {
        logInfo('Calling authenticateUser API', { identifier });
        const result = await authenticateUser(identifier, password);
        logInfo('Authentication API response received', {
            success: !!result,
            hasUser: !!result?.user,
            hasJwt: !!result?.jwt
        });
        
        if (!result) {
            logError('Authentication returned null or undefined');
            return false;
        }
        
        if (!result.user || !result.jwt) {
            logError('Authentication response missing user or jwt', { 
                hasUser: !!result.user,
                hasJwt: !!result.jwt
            });
            return false;
        }
        
        logInfo('Authentication successful', { 
            userId: result.user.id,
            username: result.user.username 
        });
        
        return {
            jwt: result.jwt,
            user: {
                id: result.user.id,
                username: result.user.username,
                email: result.user.email,
                provider: result.user.provider,
                confirmed: result.user.confirmed,
                blocked: result.user.blocked,
                createdAt: result.user.createdAt,
                updatedAt: result.user.updatedAt,
                lineId: result.user.lineId,
                backgroundImage: result.user.backgroundImage,
                fullName: result.user.fullName,
                gender: result.user.gender,
                address: result.user.address,
                cardID: result.user.cardID,
                telNumber: result.user.telNumber,
                userType: result.user.userType,
                point: result.user.point,
            },
        };
    } catch (error) {
        logError('Authentication failed with error', {
            message: error.message,
            stack: error.stack,
            lineId: lineId
        });
        return false;
    }
};
