interface point {
    x: number,
    y: number,
}

interface playerData {
    id: number,
    x: number,
    y: number,
    width: number,
    height: number,
}

interface ballData {
    x: number,
    y: number,
    xVel: number,
    yVel: number,
}


interface pongGameState {
    ball: ballData,
    player1: playerData,
    player2: playerData,
}

enum playerInput {
    up,
    down,
}

class PlayerBat {
    x: number;
    y: number;
    width: number;
    height: number;
    
    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
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

class PongBall {
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
     * @returns Boolean indicating whether or not the point was withing reach of the ball.
     */
    withinRadius(point: point): boolean {
        const withinWidth = point.x > this.x - this.radius && point.x < this.x + this.radius;
        const withinHeight = point.y > this.y - this.radius && point.y < this.y + this.radius;
        
        return withinWidth && withinHeight;
    }
}


class PongGameManager {
    
    width: number;
    height: number;
    player1Id: number;
    player2Id: number;
    
    gameState: pongGameState;
    
    constructor(width: number, height: number, player1Id: number, player2Id: number) {
        this.width = width;
        this.height = height;
        this.player1Id = player1Id;
        this.player2Id = player2Id;
        
        this.gameState = this.createNewGameState();
    }
    
    createNewGameState(): pongGameState {
        const batWidth = 2;
        const batHeight = 12;
        
        const ball: ballData = {
            x: this.width / 2,
            y: this.height / 2,
            xVel: getRandomInt(10),
            yVel: getRandomInt(10),
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
    
    updateGameState() {
        let currentBall = this.gameState.ball;
        
        const player1Radius = this.gameState.player1.x + this.gameState.player1.width / 2;
        // minus because the ball should hit the left side of the bat for player 2
        const player2Radius = this.gameState.player1.x - this.gameState.player1.width / 2; 
        
        if (currentBall.x === player1Radius || currentBall.x === player2Radius) {
            currentBall.xVel = currentBall.xVel * -1;
        }
        
    }
}

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}
