export default function HeaderItem({text, redirectTo}: {text: string, redirectTo: string}) {
    return (
        <li className="hover:bg-emerald-600 p-2 rounded-lg">
            <a href={redirectTo}>
                {text}
            </a>
        </li>
    );
}