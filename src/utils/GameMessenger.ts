import { pongGameState } from "../components/pong-game/gameLogic";



class GameMessenger {
    
    private ws: WebSocket;
    
    constructor(address: string) {
        console.log("creating websocket connection to " + address);
        this.ws = new WebSocket("ws://" + address);
        this.ws.onopen = this.onWebSocketOpen;
        this.ws.onclose = this.onWebSocketClose;
    }
    
    private waitForSocketConnection(socket: WebSocket): Promise<WebSocket> {
        return new Promise((resolve) => {
            if (socket.readyState === WebSocket.OPEN) {
                resolve(socket);
            } else {
                socket.onopen = () => resolve(socket);
            }
        });
    }
    
    private onWebSocketOpen(event: Event) {
        console.log("connection opened");
    }
    
    private onWebSocketClose(event: Event) {
        console.log("connection closed");
    }
    
    SendGameState(gameState: pongGameState) {
        const parsedState = JSON.stringify(gameState);
        this.ws.send(parsedState);
    }
    
    async SendTestMessage() {
        await this.waitForSocketConnection(this.ws);
        this.ws.send("Hello world!");
        console.log("test message was send");
    }
}



export default GameMessenger;
