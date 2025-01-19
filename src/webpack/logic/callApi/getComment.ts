import { CommentInterface } from "../../interface/CommentInterface";
import { API_BASE_URL } from "../../enum/clientEnv";

export async function getComment(gameNumber:string): Promise<CommentInterface[]> {
    const comment: CommentInterface[] = [];

    try {
      const response = await fetch(API_BASE_URL + '/api/comment/' + gameNumber, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      if (response.ok) {
        // レスポンスをGameLogInterfaceに変換して返す
        return await response.json();
      } else {
        console.log('Error:', response.statusText);
        return comment;
      }
      
    } catch (error) {
      console.log('Error:', error);
      return comment;
    }
  }