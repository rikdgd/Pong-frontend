interface point {
    x: number,
    y: number,
}

export interface playerData {
    id: number,
    x: number,
    y: number,
    width: number,
    height: number,
}

export interface ballData {
    x: number,
    y: number,
    xVel: number,
    yVel: number,
    radius: number,
}


export interface pongGameState {
    ball: ballData,
    player1: playerData,
    player2: playerData,
}

export enum playerInput {
    up,
    down,
    none,
}

export class PlayerBat {
    x: number;
    y: number;
    width: number;
    height: number;
    
    constructor(x: number, y: number, width: number, height: number) {
        this.width = width;
        this.height = height;
        
        const {drawX, drawY} = this.getDrawLocation(x, y);
        this.x = drawX;
        this.y = drawY;
    }
    
    private getDrawLocation(xCenter: number, yCenter: number) {
        const newX = xCenter - (this.width / 2);
        const newY = yCenter - (this.height / 2);
        
        return {
            drawX: newX,
            drawY: newY,
        }
    }
    
    /**
     * Get the location of the center of the players bat
     * 
     * Drawing rectangles uses the top left corner as the position, this gets the actual center of the bat. 
     * @returns x and y location of the bat's center
     */
    getCenterLocation(): Object {
        return {
            x: this.x + (this.width / 2),
            y: this.y + (this.height / 2),
        }
    }
}

export class PongBall {
    x: number;
    y: number;
    xVel: number;
    yVel: number;
    
    radius: number = 3;
    
    
    constructor(x: number, y: number, xVel: number, yVel: number) {
        this.x = x;
        this.y = y;
        this.xVel = xVel;
        this.yVel = yVel;
    }
    
    /**
     * Checks whether or not a specific point fits inside the pong ball. 
     * 
     * This method treats the ball as a square, since it will only be bouncing around in a rectangle shaped playing field.
     * @param point The point that should be checked to be within radius.
     * @return {boolean} Boolean indicating whether or not the point was withing reach of the ball.
     */
    withinRadius(point: point): boolean {
        const withinWidth = point.x > this.x - this.radius && point.x < this.x + this.radius;
        const withinHeight = point.y > this.y - this.radius && point.y < this.y + this.radius;
        
        return withinWidth && withinHeight;
    }
}


export class PongGameManager {
    
    maxRandomVelocity: number = 2;
    
    width: number;
    height: number;
    player1Id: number;
    player2Id: number;
    gameStarted: boolean = false;
    
    gameState: pongGameState;
    
    /**
     * Create a new PongGameManager
     * @param width The width of the playing field
     * @param height The height of the playing field
     * @param player1Id The Id of player 1, the current/local player
     * @param player2Id The Id of player 2
     */
    constructor(width: number, height: number, player1Id: number, player2Id: number) {
        this.width = width;
        this.height = height;
        this.player1Id = player1Id;
        this.player2Id = player2Id;
        
        this.gameState = this.createNewGameState();
    }
    
    /**
     * Creates a new game state with initial ball and player positions.
     *
     * @return {pongGameState} the newly created game state
     */
    createNewGameState(): pongGameState {
        const batWidth = 2;
        const batHeight = 12;
        const ballRadius = 3;
        
        const ball: ballData = {
            x: this.width / 2,
            y: this.height / 2,
            xVel: getRandomInt(this.maxRandomVelocity),
            yVel: getRandomInt(this.maxRandomVelocity),
            radius: ballRadius,
        }
        const player1: playerData = {
            id: this.player1Id,
            x: this.width / 6,
            y: this.height / 2,
            width: batWidth,
            height: batHeight,
        }
        const player2: playerData = {
            id: this.player2Id,
            x: this.width / 6 * 5,
            y: this.height / 2,
            width: batWidth,
            height: batHeight,
        }
        
        return {
            ball: ball,
            player1: player1,
            player2: player2
        };
    }
    
    updateGameState(player1Input: playerInput, player2Input: playerInput) {
        let updatedBall = this.gameState.ball;
        let updatedPlayer1 = this.gameState.player1;
        let updatedPlayer2 = this.gameState.player2;
        
        const player1Radius = this.gameState.player1.x + this.gameState.player1.width / 2;
        // minus because the ball should hit the left side of the bat for player 2
        const player2Radius = this.gameState.player1.x - this.gameState.player1.width / 2; 
        
        if (updatedBall.x === player1Radius || updatedBall.x === player2Radius) {
            updatedBall.xVel = updatedBall.xVel * -1;
        }
        
        if (updatedBall.y >= this.height + updatedBall.radius || updatedBall.y <= 0 + updatedBall.radius) {
            updatedBall.yVel = updatedBall.yVel * -1;
        }
        
        if (updatedBall.x >= this.width || updatedBall.x <= 0) {
            // reset the game
            updatedBall.x = this.width / 2;
            updatedBall.y = this.height / 2;
            updatedBall.xVel = getRandomInt(this.maxRandomVelocity);
            updatedBall.yVel = getRandomInt(this.maxRandomVelocity);
            
        }
        
        updatedBall.x += updatedBall.xVel;
        updatedBall.y += updatedBall.yVel;
        
        if (player1Input === playerInput.down) updatedPlayer1.y += 1;
        if (player1Input === playerInput.up) updatedPlayer1.y -= 1;
        
        if (player2Input === playerInput.down) updatedPlayer2.y += 1;
        if (player2Input === playerInput.up) updatedPlayer2.y -= 1;
        
        this.gameState = {
            ball: updatedBall,
            player1: this.gameState.player1,
            player2: this.gameState.player2
        };
    }
}

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}
