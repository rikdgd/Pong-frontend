'use client'

import { useRef, useState } from 'react';
import { PongGameManager, playerInput } from './gameLogic';
import GameField from "./GameField";



interface size {
    width: number,
    height: number
}

export default function GameContainer({size} : {size: size}) {
    
    const gameManager = useRef(new PongGameManager(size.width, size.height, 1, 2));
    const [gameState, setGameState] = useState(gameManager.current.createNewGameState());
    const gameEvents = useRef(['game started']);
    const frameTimeMillis = Math.round(1000 / 60);
    
    
    const handleKeyDown = (event: any) => {
        switch(event.key) {
            case 'ArrowUp': 
                gameEvents.current.push('up');
                break;
            case 'ArrowDown':
                gameEvents.current.push('down');
                break;
            default:
                gameEvents.current.push('none');
                break;
        }
    }
    
    const startNewGame = async (width: number, height: number) => {
        const newGameManager = new PongGameManager(width, height, 0, 1);
        gameManager.current = newGameManager; 
        
        let running = true;
        while (running) {
            const startTime = performance.now();
            
            let nextPlayerInput: playerInput = playerInput.none;
            gameEvents.current.forEach((event) => {
                
                switch (event) {
                    case 'up':
                        nextPlayerInput = playerInput.up;
                        break;
                    case 'down':
                        nextPlayerInput = playerInput.down;
                        break;
                    case 'none':
                        nextPlayerInput = playerInput.none;
                        break;
                    default:
                        nextPlayerInput = playerInput.none;
                        break;
                }
            });
            gameEvents.current = [];
            
            gameManager.current.updateGameState(nextPlayerInput, playerInput.none);
            setGameState(gameManager.current.gameState);
            
            const endTime = performance.now();
            const elapsedTime = endTime - startTime;
            
            if (elapsedTime < frameTimeMillis) {
                await sleep(frameTimeMillis - elapsedTime);
            }
        }
    }
    
    const sleep = async (ms: number): Promise<void> => {
        await new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
    
    
    return (
        <div>
            <div onKeyDown={handleKeyDown} tabIndex={0}>
                {gameManager.current ? <GameField state={gameState} size={{width: size.width, height: size.height}}/> : null}
                
            </div>
            <button onClick={async () => {startNewGame(size.width, size.height)}}>start</button>
        </div>
    );
}
