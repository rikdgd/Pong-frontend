'use client'

import HeaderItem from "./HeaderItem";



export default function Header() {    
    return (
        <div className="bg-indigo-950 flex justify-center justify-items-center border-b-2 border-x-2 border-emerald-200 rounded-b-lg fixed left-0 top-0 min-w-full
                        bg-gradient-to-b from-emerald-900 to-emerald-800">
            <ul className="flex justify-items-center flex-row space-x-20 my-4">
                <HeaderItem text="Home" redirectTo="/"/>
                <HeaderItem text="Pong" redirectTo="/pong"/>
                <HeaderItem text="style preview" redirectTo="/stylepreview"/>
            </ul>
        </div>
    );
}
