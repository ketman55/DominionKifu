import axios from 'axios';

export async function deleteCommentApi(gameNumber: string, pointer: number, adminToken: string): Promise<void> {
    try {
        const response = await axios.delete(`/api/comment/${gameNumber}/${pointer}`, {
            headers: {
                'Authorization': `Bearer ${adminToken}`
            }
        });
        
        if (response.status !== 200) {
            throw new Error(`Failed to delete comment: ${response.statusText}`);
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
                throw new Error('Unauthorized: Invalid admin token');
            } else if (error.response?.status === 404) {
                throw new Error('Comment not found');
            } else {
                throw new Error(`Failed to delete comment: ${error.response?.data || error.message}`);
            }
        }
        throw error;
    }
}