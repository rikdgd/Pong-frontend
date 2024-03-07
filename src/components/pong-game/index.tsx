import { useRef } from 'react';
import { PongGameManager } from './gameLogic';
import GameField from "./GameField";



interface gameContext {
    width: number,
    height: number,
    player1Id: number,
    player2Id: number,
}


export default function GameContainer() {
    
    const gameManager = useRef(new PongGameManager(10, 10, 1, 2));
    
    
    const handleKeyDown = (event: any) => {
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
    
    const startNewGame = (context: gameContext) => {
        const {width, height, player1Id, player2Id} = context;
        const newGameManager = new PongGameManager(width, height, player1Id, player2Id);
        gameManager.current = newGameManager; 
        
        let running = true;
        while (running) {
            //
        }
    }
    
    
    return (
        <div onKeyDown={handleKeyDown} tabIndex={0}>
            <GameField state={gameManager.current.gameState}/>
        </div>
    );
}
