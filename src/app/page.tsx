'use client'

import GameMessenger from "@/utils/GameMessenger";



export default function Home() {
    
    async function SendMessage() {
        const messenger = new GameMessenger("localhost:8080");
        await messenger.SendTestMessage();
    }
    
    
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Welcome to Pong!</h1>
        
        <button onClick={async () => SendMessage()}>Send test message</button>
        
        <a href="/pong">to game</a>
        </main>
    );
}
