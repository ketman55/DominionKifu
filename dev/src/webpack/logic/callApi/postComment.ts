import { CommentInterface } from "../interface/CommentInterface";

export async function postComment(comment: CommentInterface) {
    try {
        const response = await fetch('http://localhost:3000/api/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        });

        if (response.ok) {
            return true;
        } else {
            console.error('Error:', response.statusText);
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}