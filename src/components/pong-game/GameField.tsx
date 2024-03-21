'use client'

import { useEffect } from 'react';
import './GameField.css';
import { pongGameState, ballData, playerData } from './gameLogic';



interface size {
    width: number,
    height: number
}


export default function GameField({state, size}: {state: pongGameState, size: size}) {
    
    useEffect(() => {
        const drawGameState = (gameState: pongGameState) => {
            if (!gameState) return;
            
            const {ball, player1, player2} = gameState;
            
            clearCanvas();
            drawPongBall(ball);
            drawPlayer(player1);
            drawPlayer(player2);
        }
        
        drawGameState(state);
    }, [state]);
    
    
    const clearCanvas = () => {
        const canvas = document.getElementById('GameField') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
            alert('Could not find pong canvas!');
            return;
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    const drawPongBall = (pongBall: ballData) => {
        const canvas = document.getElementById('GameField') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
            alert('Could not find pong canvas!');
            return;
        }
        
        ctx.beginPath();
        ctx.arc(pongBall.x, pongBall.y, pongBall.radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
    }
    
    const drawPlayer = (player: playerData) => {
        const canvas = document.getElementById('GameField') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
            alert('Could not find pong canvas!');
            return;
        }
        
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.fillRect(player.x, player.y, player.width, player.height);
        ctx.fill();
    }
    
    
    
    return (
        <div>
            <canvas className='GameField' id='GameField' width={size.width} height={size.height}></canvas>
        </div>
    );
}
