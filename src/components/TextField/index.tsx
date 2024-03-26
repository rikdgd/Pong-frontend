export default function Textfield({placeholder}: {placeholder: string}) {
    return (
        <div className="rounded-lg bg-emerald-500 min-w-60 min-h-10 flex justify-center border-b-2 border-white m-4">
            <input className="text-white bg-emerald-500 outline-none placeholder-slate-50" type='text' placeholder={placeholder}/>
        </div>
    );
}
