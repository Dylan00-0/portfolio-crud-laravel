import { Link } from '@inertiajs/react';
import FlashMessage from './FlashMessage';

export default function ManageLayout({ title, action, children }) {
    return (
        <div className="min-h-screen hero-grid">
            <header className="border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0b1220]/90">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
                    <span className="font-black text-xl tracking-tighter">dylan<span className="ml-0.5 -skew-x-12 inline-block rounded-xs bg-blue-700 dark:bg-cyan-400 px-1.5 text-white dark:text-slate-900">.dev</span> <span className="font-semibold text-base text-slate-600 dark:text-slate-400">Manage</span></span>
                    <Link href="/" className="underline text-sm">View public portfolio</Link>
                </div>
            </header>
            <main className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <h1 className="text-3xl font-bold border-l-4 border-blue-700 dark:border-cyan-400 pl-3">{title}</h1>
                    {action}
                </div>
                <FlashMessage />
                {children}
            </main>
        </div>
    );
}
