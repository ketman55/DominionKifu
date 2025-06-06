import express, { Request, Response } from 'express';
import { checkAdminCredentials } from '../middleware/authMiddleware';

export function authController(app: express.Application) {
    
    // 管理者認証エンドポイント
    app.post('/api/admin/login', (req: Request, res: Response) => {
        const { password } = req.body;
        
        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }
        
        if (checkAdminCredentials(password)) {
            // 簡単なトークンとして、パスワードをそのまま返す
            res.json({ 
                success: true, 
                token: password,
                message: 'Admin authentication successful' 
            });
        } else {
            res.status(401).json({ 
                success: false, 
                error: 'Invalid admin password' 
            });
        }
    });
}