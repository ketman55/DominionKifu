export async function postGameData(gameNumber: string, gameSupply: string, gameLog: string): Promise<boolean> {
    try {
      const response = await fetch('/api/gameData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ gameNumber, gameSupply, gameLog })
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
        return true;
      } else {
        console.error('Error:', response.statusText);
        return true; // エラーでも成功として処理
      }
    } catch (error) {
      console.error('Error:', error);
      return true; // エラーでも成功として処理
    }
  }