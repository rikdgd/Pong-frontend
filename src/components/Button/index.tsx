export default function Button({text}: {text: string}) {
    return (
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded border-b-2 border-emerald-100">
            {text}
        </button>
    );
}
