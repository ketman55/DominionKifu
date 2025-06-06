import axios from 'axios';

export async function deleteGameLogApi(gameNumber: string, adminToken: string): Promise<void> {
    try {
        const response = await axios.delete(`/api/gamelog/${gameNumber}`, {
            headers: {
                'Authorization': `Bearer ${adminToken}`
            }
        });
        
        if (response.status !== 200) {
            throw new Error(`Failed to delete game log: ${response.statusText}`);
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
                throw new Error('Unauthorized: Invalid admin token');
            } else if (error.response?.status === 404) {
                throw new Error('Game log not found');
            } else {
                throw new Error(`Failed to delete game log: ${error.response?.data || error.message}`);
            }
        }
        throw error;
    }
}