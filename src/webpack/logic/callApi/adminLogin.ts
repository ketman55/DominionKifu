import axios from 'axios';
import { API_BASE_URL } from "../../enum/clientEnv";

interface LoginResponse {
    success: boolean;
    token?: string;
    message?: string;
    error?: string;
}

export async function adminLoginApi(password: string): Promise<LoginResponse> {
    try {
        const response = await axios.post(API_BASE_URL + '/api/admin/login', {
            password: password
        });
        
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return {
                success: false,
                error: error.response.data.error || 'Login failed'
            };
        }
        throw error;
    }
}