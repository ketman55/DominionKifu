import axios from 'axios';

interface GameData {
    gameId: string;
    supply: string;
    gameLog: string;
}

async function postGameData(gameId: string, supply: string, gameLog: string): Promise<boolean> {
    const url = 'https://your-api-endpoint.com/register-game-data';
    const data: GameData = { gameId, supply, gameLog };

    try {
        const response = await axios.post(url, data);
        return response.status === 200;
    } catch (error) {
        console.error('Error posting game data:', error);
        return false;
    }
}

export default postGameData;