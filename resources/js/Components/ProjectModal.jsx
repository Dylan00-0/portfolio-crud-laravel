import { useEffect, useRef } from 'react';

// Native <dialog>: gives Esc-to-close, focus trapping, and blocks the background
export default function ProjectModal({ project, onClose }) {
    const ref = useRef(null);

    useEffect(() => {
        const dialog = ref.current;
        if (project && !dialog.open) dialog.showModal();
        if (!project && dialog.open) dialog.close();
    }, [project]);

    const tech = project ? project.tech_stack.split(',').map((t) => t.trim()).filter(Boolean) : [];

    return (
        <dialog ref={ref} onClose={onClose} onClick={(e) => e.target === ref.current && onClose()} aria-labelledby="modal-title"
            className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-xl bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-200 border border-slate-300 dark:border-slate-700 p-0">
            <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                    <h3 id="modal-title" className="text-xl font-bold">{project?.title}</h3>
                    <button type="button" onClick={onClose} aria-label="Close project details" className="h-10 w-10 shrink-0 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800">✕</button>
                </div>
                <p className="mt-4 leading-relaxed">{project?.description}</p>
                <p className="mt-4 text-sm font-semibold">Technologies</p>
                <ul className="mt-2 flex flex-wrap gap-2 text-sm">
                    {tech.map((t) => <li key={t} className="rounded-md bg-slate-100 dark:bg-slate-800 px-3 py-1">{t}</li>)}
                </ul>
                {project?.date_completed && <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">Completed: {project.date_completed}</p>}
                <button type="button" onClick={onClose} className="mt-6 rounded-lg border border-slate-400 dark:border-slate-600 px-4 py-2 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800">Cancel</button>
            </div>
        </dialog>
    );
}
