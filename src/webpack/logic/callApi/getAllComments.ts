import axios from 'axios';

interface Comment {
    gameNumber: string;
    pointer: number;
    comment: string;
    userName: string;
    date: string;
}

export async function getAllCommentsApi(): Promise<Comment[]> {
    try {
        const response = await axios.get('/api/all/comment');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch all comments:', error);
        throw new Error('Failed to fetch comments');
    }
}