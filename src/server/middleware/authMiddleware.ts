import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
    isAdmin?: boolean;
}

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'dominion-admin-2024';

export function adminAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    
    const token = authHeader.substring(7);
    
    if (token !== ADMIN_PASSWORD) {
        return res.status(403).json({ error: 'Forbidden: Invalid admin token' });
    }
    
    req.isAdmin = true;
    next();
}

export function checkAdminCredentials(password: string): boolean {
    return password === ADMIN_PASSWORD;
}