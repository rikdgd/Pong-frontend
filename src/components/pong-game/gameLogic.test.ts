import { PongGameManager } from './gameLogic';


test('createNewGame', () => {
    const width = 40;
    const height = 20;
    const playerIds = {
        player1: 1,
        player2: 2,
    }
    const expectPlayers = {
        player1: {
            id: 1,
            x: width / 6,
            y: height / 2,
        },
        player2: {
            id: 2,
            x: width / 6 * 5,
            y: height / 2,
        }
    }
    
    const expectedBall = {
        x: width / 2,
        y: height / 2,
    }
    
    const manager = new PongGameManager(width, height, 1, 2);
    const newGameData = manager.createNewGameState();
    
    
    expect(newGameData.player1.x).toBe(expectPlayers.player1.x);
    expect(newGameData.player1.y).toBe(expectPlayers.player1.y);
    expect(newGameData.player2.x).toBe(expectPlayers.player2.x);
    expect(newGameData.player2.y).toBe(expectPlayers.player2.y);
    
    
    expect(newGameData.ball.x).toBe(expectedBall.x);
    expect(newGameData.ball.y).toBe(expectedBall.y);
});
