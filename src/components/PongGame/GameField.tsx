'use client'

import './GameField.css';



export default function GameField() {
    
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
    
    const handleKeyDown = (event: KeyboardEvent) => {
        switch(event.key) {
            case 'ArrowUp': 
                console.log('arrow up');
                break;
            case 'ArrowDown':
                console.log('arrow down');
                break;
            default:
                console.log('not arrown up or down...');
                break;
        }
    }
    
    
    return (
        <div>
            <canvas className='GameField' id='GameField' width='1000' height='600'>
            
            </canvas>
            <button onClick={() => drawPlayer(true, 30)}>spawn 1</button>
            <button onClick={() => drawPlayer(false, 60)}>spawn 2</button>
            <button onClick={() => drawPongBall()}>draw ball</button>
            
        </div>
    );
}
