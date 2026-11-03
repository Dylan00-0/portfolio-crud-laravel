export default function Footer() {
    return (
        <footer className="border-t border-slate-200 dark:border-slate-800">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-sm">
                <p>© {new Date().getFullYear()} Dylan Ray Y. Bragado. All rights reserved.</p>
                <ul className="flex flex-wrap gap-4">
                    <li><a className="underline" href="#about">About</a></li>
                    <li><a className="underline" href="#projects">Projects</a></li>
                    <li><a className="underline" href="#contact">Contact</a></li>
                    <li><a className="underline" href="https://github.com/Dylan00-0" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                </ul>
                <a href="#home" className="inline-flex w-fit items-center rounded-lg border border-slate-400 dark:border-slate-600 px-4 py-2 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800">Back to top</a>
            </div>
        </footer>
    );
}
