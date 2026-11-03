import ImageWithFallback from './ImageWithFallback';

// One project card on the public portfolio page
export default function ProjectCard({ project, onView }) {
    const tech = project.tech_stack.split(',').map((t) => t.trim()).filter(Boolean);

    return (
        <article className="edge flex flex-col rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0b1220] overflow-hidden">
            <div className="aspect-video w-full bg-slate-200 dark:bg-slate-800">
                <ImageWithFallback src={project.image_url} alt={`Screenshot of ${project.title}`} width="640" height="360" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col flex-1 p-5">
                <h3 className="font-semibold text-lg">{project.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-3">{project.description}</p>
                <p className="mt-3 text-xs text-slate-600 dark:text-slate-400">{tech.join(' · ')}</p>
                <div className="mt-auto pt-5 flex flex-wrap items-center gap-4 text-sm">
                    <button type="button" onClick={() => onView(project)} className="rounded-lg bg-blue-700 hover:bg-blue-800 dark:bg-cyan-400 dark:hover:bg-cyan-300 dark:text-slate-900 text-white px-4 py-2 font-semibold">View Details</button>
                    {project.repository_url && <a href={project.repository_url} target="_blank" rel="noopener noreferrer" className="underline">GitHub</a>}
                    {project.project_url && <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="underline">Live</a>}
                </div>
            </div>
        </article>
    );
}
