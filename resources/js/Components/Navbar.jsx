import { useEffect, useState } from 'react';

const LINKS = [
    ['home', 'Home'],
    ['about', 'About'],
    ['skills', 'Skills'],
    ['projects', 'Projects'],
    ['education', 'Education'],
    ['contact', 'Contact'],
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
    const [active, setActive] = useState('home');

    // Dark / Bright mode
    const toggleTheme = () => {
        const isDark = document.documentElement.classList.toggle('dark');
        setDark(isDark);
        try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch (e) { /* ignore */ }
    };

    // Active nav link
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
            { rootMargin: '-40% 0px -55% 0px' }
        );
        document.querySelectorAll('main section[id]').forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    // Close the mobile menu with Escape
    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && setOpen(false);
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, []);

    const current = (id) => (active === id ? 'true' : undefined);

    return (
        <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0b1220]/90 backdrop-blur">
            <nav className="mx-auto max-w-6xl flex items-center justify-between px-4 sm:px-6 h-16" aria-label="Main">
                <a href="#home" aria-label="dylan.dev, back to home" className="flex items-center font-black text-xl tracking-tighter">
                    dylan<span className="ml-0.5 -skew-x-12 rounded-xs bg-blue-700 dark:bg-cyan-400 px-1.5 text-white dark:text-slate-900">.dev</span>
                    <span className="cursor ml-1 h-5 w-1.5 bg-blue-700 dark:bg-cyan-400" aria-hidden="true"></span>
                </a>

                <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
                    {LINKS.map(([id, label]) => (
                        <li key={id}><a className="nav-link py-2" href={`#${id}`} aria-current={current(id)}>{label}</a></li>
                    ))}
                </ul>

                <div className="flex items-center gap-2">
                    <a href="#contact" className="hidden sm:inline-flex rounded-lg bg-blue-700 hover:bg-blue-800 dark:bg-cyan-400 dark:hover:bg-cyan-300 dark:text-slate-900 text-white px-4 py-2 text-sm font-semibold">Let's Talk</a>

                    <button type="button" onClick={toggleTheme} aria-pressed={dark} aria-label={dark ? 'Switch to Bright Mode' : 'Switch to Dark Mode'}
                        className="h-11 w-11 grid place-items-center rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800">
                        <svg className="h-5 w-5 dark:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
                        <svg className="h-5 w-5 hidden dark:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
                    </button>

                    <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}
                        className="md:hidden h-11 w-11 grid place-items-center rounded-lg border border-slate-300 dark:border-slate-700">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
                    </button>
                </div>
            </nav>

            <ul id="mobile-menu" className={`${open ? '' : 'hidden'} md:hidden border-t border-slate-200 dark:border-slate-800 px-4 py-2 text-base font-medium`}>
                {LINKS.map(([id, label]) => (
                    <li key={id}><a className="nav-link block py-3" href={`#${id}`} aria-current={current(id)} onClick={() => setOpen(false)}>{label}</a></li>
                ))}
            </ul>
        </header>
    );
}
