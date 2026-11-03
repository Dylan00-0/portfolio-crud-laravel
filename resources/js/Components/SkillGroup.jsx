export default function SkillGroup({ title, items }) {
    return (
        <div className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0b1220] p-6">
            <h3 className="font-semibold">{title}</h3>
            <ul className="mt-4 flex flex-wrap gap-2 text-sm">
                {items.map((item) => (
                    <li key={item} className="rounded-md bg-slate-100 dark:bg-slate-800 px-3 py-1">{item}</li>
                ))}
            </ul>
        </div>
    );
}
