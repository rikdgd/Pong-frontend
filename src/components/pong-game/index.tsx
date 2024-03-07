import { useRef, useEffect } from 'react';
import { PongGameManager } from './gameLogic';
import GameField from "./GameField";



export default function GameContainer() {
    
    const gameManager = useRef(new PongGameManager(10, 10, 1, 2));
    const gameEvents = useRef(['game started']);
    
    useEffect(() => {
        gameManager.current = new PongGameManager(10, 10, 1, 2);
    }, []);
    
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
    
    const startNewGame = (width: number, height: number) => {
        const newGameManager = new PongGameManager(width, height, 0, 1);
        gameManager.current = newGameManager; 
        
        let running = true;
        while (running) {
            //
        }
    }
    
    
    return (
        <div onKeyDown={handleKeyDown} tabIndex={0}>
            {gameManager.current ? <GameField state={gameManager.current.gameState}/> : null}
        </div>
    );
}
