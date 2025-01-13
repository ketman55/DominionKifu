import { CommentInterface } from "../../interface/CommentInterface";

export async function getComment(gameNumber:string): Promise<CommentInterface[]> {
    const comment: CommentInterface[] = [];

    try {
      const response = await fetch('http://localhost:3000/api/comment/' + gameNumber, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      if (response.ok) {
        // レスポンスをGameLogInterfaceに変換して返す
        return await response.json();
      } else {
        console.error('Error:', response.statusText);
        return comment;
      }
      
    } catch (error) {
      console.error('Error:', error);
      return comment;
    }
  }