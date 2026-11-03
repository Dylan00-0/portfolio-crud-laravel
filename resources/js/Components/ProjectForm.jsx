import { Link, useForm } from '@inertiajs/react';
import FormField from './FormField';

// ONE form used by both Create and Edit.
// If a "project" prop is given, it is in edit mode.
export default function ProjectForm({ project = null }) {
    const isEdit = project !== null;

    const { data, setData, post, processing, errors, progress } = useForm({
        _method: isEdit ? 'put' : 'post', // files cannot be sent with a real PUT, so we spoof it
        title: project?.title ?? '',
        description: project?.description ?? '',
        tech_stack: project?.tech_stack ?? '',
        project_url: project?.project_url ?? '',
        repository_url: project?.repository_url ?? '',
        date_completed: project?.date_completed ?? '',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        // On validation failure Inertia keeps "data", so the typed values are NOT lost
        post(isEdit ? `/projects/${project.id}` : '/projects', { forceFormData: true });
    };

    const bind = (name) => ({
        id: name,
        name,
        value: data[name],
        onChange: (e) => setData(name, e.target.value),
        'aria-invalid': errors[name] ? 'true' : 'false',
        'aria-describedby': errors[name] ? `${name}-error` : undefined,
        className: 'field',
    });

    return (
        <form onSubmit={submit} noValidate className="max-w-2xl space-y-5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0b1220] p-6">
            <FormField label="Title" name="title" error={errors.title}>
                <input type="text" {...bind('title')} />
            </FormField>

            <FormField label="Description" name="description" error={errors.description} hint="20 to 1000 characters.">
                <textarea rows={4} {...bind('description')} />
            </FormField>

            <FormField label="Tech stack" name="tech_stack" error={errors.tech_stack} hint="Separate with commas, e.g. PHP, MySQL, Tailwind CSS">
                <input type="text" {...bind('tech_stack')} />
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="Project URL (optional)" name="project_url" error={errors.project_url}>
                    <input type="text" placeholder="https://" {...bind('project_url')} />
                </FormField>
                <FormField label="Repository URL (optional)" name="repository_url" error={errors.repository_url}>
                    <input type="text" placeholder="https://github.com/..." {...bind('repository_url')} />
                </FormField>
            </div>

            <FormField label="Date completed" name="date_completed" error={errors.date_completed}>
                <input type="date" {...bind('date_completed')} />
            </FormField>

            <FormField label="Image (optional)" name="image" error={errors.image} hint="JPG, PNG, or WEBP. Max 2 MB.">
                <input id="image" name="image" type="file" accept="image/*" aria-invalid={errors.image ? 'true' : 'false'}
                    onChange={(e) => setData('image', e.target.files[0] ?? null)} className="field" />
                {isEdit && project.image_url && !data.image && (
                    <img src={project.image_url} alt="Current project image" className="mt-3 h-24 rounded-lg border border-slate-300 dark:border-slate-700 object-cover" />
                )}
                {progress && <progress value={progress.percentage} max="100" className="mt-2 w-full" />}
            </FormField>

            <div className="flex gap-3 pt-2">
                <button type="submit" disabled={processing} className="rounded-lg bg-blue-700 hover:bg-blue-800 dark:bg-cyan-400 dark:hover:bg-cyan-300 dark:text-slate-900 text-white px-6 py-3 font-semibold disabled:opacity-60">
                    {processing ? 'Saving…' : isEdit ? 'Save changes' : 'Create project'}
                </button>
                <Link href="/projects" className="rounded-lg border border-slate-400 dark:border-slate-600 px-6 py-3 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800">Cancel</Link>
            </div>
        </form>
    );
}
