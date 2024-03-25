'use client'

export default function Header() {    
    return (
        <div className="bg-indigo-950 min-w-screen flex justify-center justify-items-center border-b-2 border-x-2 border-emerald-200 rounded-b-lg
                        bg-gradient-to-b from-emerald-900 to-emerald-800">
            <ul className="flex justify-items-center flex-row space-x-20 my-4">
                <li>Home</li>
                <li>Pong</li>
                <li>Live Games</li>
                <li>Profile</li>
            </ul>
        </div>
    );
}
