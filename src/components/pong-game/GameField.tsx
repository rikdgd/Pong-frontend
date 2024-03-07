'use client'

import { useRef } from 'react';
import './GameField.css';
import { pongGameState } from './gameLogic';





export default function GameField({state}: {state: pongGameState}) {
    const {ball, player1, player2} = state;
    
    const drawPongBall = () => {
        const canvas = document.getElementById('GameField') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
            alert('Could not find pong canvas!');
            return;
        }
        
        ctx.beginPath();
        ctx.arc(canvas.width/2, canvas.height/2, 3, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
    }
    
    const drawPlayer = (isPlayer1: boolean, position: number) => {
        const canvas = document.getElementById('GameField') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        
        const playerXPosition = isPlayer1 ? canvas.width / 8 : canvas.width * 7 / 8;
        
        if (!ctx) {
            alert('Could not find pong canvas!');
            return;
        }
        
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.fillRect(playerXPosition, position, 10, 50);
        ctx.fill();
    }
    
    
    
    return (
        <div>
            <canvas className='GameField' id='GameField' width='1000' height='600'></canvas>
        </div>
    );
}
