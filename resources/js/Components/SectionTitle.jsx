export default function SectionTitle({ children, subtitle }) {
    return (
        <>
            <h2 className="text-3xl font-bold border-l-4 border-blue-700 dark:border-cyan-400 pl-3">{children}</h2>
            {subtitle && <p className="mt-2 text-slate-600 dark:text-slate-400">{subtitle}</p>}
        </>
    );
}
