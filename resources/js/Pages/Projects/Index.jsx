import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import ManageLayout from '@/Components/ManageLayout';

export default function Index({ projects }) {
    const [toDelete, setToDelete] = useState(null); // the project waiting for delete confirmation

    const confirmDelete = () => {
        router.delete(`/projects/${toDelete.id}`, {
            preserveScroll: true,
            onFinish: () => setToDelete(null),
        });
    };

    return (
        <ManageLayout title="Projects" action={
            <Link href="/projects/create" className="rounded-lg bg-blue-700 hover:bg-blue-800 dark:bg-cyan-400 dark:hover:bg-cyan-300 dark:text-slate-900 text-white px-5 py-2.5 font-semibold">Add project</Link>
        }>
            <Head title="Manage Projects" />

            <div className="overflow-x-auto rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0b1220]">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                        <tr>
                            <th className="p-3">Image</th>
                            <th className="p-3">Title</th>
                            <th className="p-3">Tech stack</th>
                            <th className="p-3">Completed</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.length === 0 && (
                            <tr><td colSpan="5" className="p-6 text-center text-slate-600 dark:text-slate-400">No projects yet. Select "Add project" to create your first one.</td></tr>
                        )}
                        {projects.map((p) => (
                            <tr key={p.id} className="border-b border-slate-200 dark:border-slate-800 last:border-0">
                                <td className="p-3">
                                    <div className="h-12 w-20 overflow-hidden rounded bg-slate-200 dark:bg-slate-800">
                                        {p.image_url && <img src={p.image_url} alt="" className="h-full w-full object-cover" />}
                                    </div>
                                </td>
                                <td className="p-3 font-medium">{p.title}</td>
                                <td className="p-3">{p.tech_stack}</td>
                                <td className="p-3 whitespace-nowrap">{p.date_completed}</td>
                                <td className="p-3 whitespace-nowrap">
                                    <Link href={`/projects/${p.id}/edit`} className="underline mr-4">Edit</Link>
                                    <button type="button" onClick={() => setToDelete(p)} className="underline text-red-700 dark:text-red-400">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Delete confirmation */}
            {toDelete && (
                <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 p-4" role="dialog" aria-modal="true" aria-labelledby="delete-title">
                    <div className="w-full max-w-md rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-6">
                        <h2 id="delete-title" className="text-xl font-bold">Delete this project?</h2>
                        <p className="mt-3">You are about to delete <strong>{toDelete.title}</strong>. This also removes it from your public portfolio and cannot be undone.</p>
                        <div className="mt-6 flex gap-3">
                            <button type="button" onClick={confirmDelete} className="rounded-lg bg-red-700 hover:bg-red-800 text-white px-5 py-2.5 font-semibold">Delete project</button>
                            <button type="button" onClick={() => setToDelete(null)} className="rounded-lg border border-slate-400 dark:border-slate-600 px-5 py-2.5 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </ManageLayout>
    );
}
