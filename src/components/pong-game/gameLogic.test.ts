import { PongGameManager, ballData, playerData } from './gameLogic';


test('createNewGame', () => {
    const gameDimentions = {
        width: 40,
        height: 20
    }
    const playerDimensions = {
        width: 1,
        height: 5
    }
    const expectPlayers = {
        player1: {
            id: 1,
            x: gameDimentions.width / 6,
            y: gameDimentions.height / 2 - (playerDimensions.height / 2),
            width: playerDimensions.width,
            height: playerDimensions.height
        },
        player2: {
            id: 2,
            x: gameDimentions.width / 6 * 5,
            y: gameDimentions.height / 2 - (playerDimensions.height / 2),
            width: playerDimensions.width,
            height: playerDimensions.height
        }
    }
    
    const expectedBall = {
        x: gameDimentions.width / 2,
        y: gameDimentions.height / 2,
    }
    
    const manager = new PongGameManager(gameDimentions.width, gameDimentions.height, 1, 2);
    const newGameData = manager.createNewGameState(3, playerDimensions);
    
    
    expect(newGameData.player1.x).toBe(expectPlayers.player1.x);
    expect(newGameData.player1.y).toBe(expectPlayers.player1.y);
    expect(newGameData.player2.x).toBe(expectPlayers.player2.x);
    expect(newGameData.player2.y).toBe(expectPlayers.player2.y);
    
    
    expect(newGameData.ball.x).toBe(expectedBall.x);
    expect(newGameData.ball.y).toBe(expectedBall.y);
});

test('check collision test', () => {
    const ball: ballData = {
        x: 10,
        y: 10,
        xVel: 3,
        yVel: 1,
        radius: 2,
    }
    
    const noCollisionPlayer: playerData = {
        id: 1,
        x: 100,
        y: 100,
        width: 2,
        height: 12,
    }
    const rightSideCollisionPlayer: playerData = {
        id: 2,
        x: 8,
        y: 6,
        width: 2,
        height: 12,
    }
    const manager = new PongGameManager(40, 20, 1, 2);
    
    
    const resultNocollision = manager.checkCollision(ball, noCollisionPlayer);
    const resultRightSideCollision = manager.checkCollision(ball, rightSideCollisionPlayer);
    
    
    expect(resultNocollision).toBe(false);
    expect(resultRightSideCollision).toBe(true);
});
