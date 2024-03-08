'use client'

import { useRef, useEffect, useState } from 'react';
import { PongGameManager, playerInput } from './gameLogic';
import GameField from "./GameField";



export default function GameContainer() {
    
    const gameManager = useRef(new PongGameManager(600, 300, 1, 2));
    const [gameState, setGameState] = useState(gameManager.current.createNewGameState());
    const gameEvents = useRef(['game started']);
    
    // useEffect(() => {
    //     gameManager.current = new PongGameManager(10, 10, 1, 2);
    // }, []);
    
    const handleKeyDown = (event: any) => {
        switch(event.key) {
            case 'ArrowUp': 
                gameEvents.current.push('up');
                break;
            case 'ArrowDown':
                gameEvents.current.push('down');
                break;
            default:
                console.log('not arrown up or down...');
                break;
        }
    }
    
    const startNewGame = async (width: number, height: number) => {
        const newGameManager = new PongGameManager(width, height, 0, 1);
        gameManager.current = newGameManager; 
        
        let running = true;
        while (running) {
            const startTime = performance.now();
            
            gameManager.current.updateGameState(playerInput.none, playerInput.none);
            setGameState(gameManager.current.gameState);
            
            const endTime = performance.now();
            const elapsedTime = endTime - startTime;
            
            if (elapsedTime < 1000 / 60) {
                await sleep(1000 / 60 - elapsedTime);
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
                {gameManager.current ? <GameField state={gameManager.current.gameState}/> : null}
                
            </div>
            <button onClick={async () => {startNewGame(600, 300)}}>start</button>
        </div>
    );
}
