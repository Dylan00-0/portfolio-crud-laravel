import { useState } from 'react';
import ContactForm from '@/Components/ContactForm';
import Footer from '@/Components/Footer';
import ImageWithFallback from '@/Components/ImageWithFallback';
import Navbar from '@/Components/Navbar';
import ProjectCard from '@/Components/ProjectCard';
import ProjectModal from '@/Components/ProjectModal';
import SectionTitle from '@/Components/SectionTitle';
import SkillGroup from '@/Components/SkillGroup';

const SKILLS = [
    { title: 'Web', items: ['HTML5', 'CSS3', 'Tailwind CSS', 'JavaScript', 'PHP'] },
    { title: 'Tools and other languages', items: ['Java', 'Flutter / Dart (learning)', 'MySQL', 'Git and GitHub', 'Figma', 'VS Code', 'Photoshop', 'Illustrator'] },
    { title: 'Soft skills', items: ['Problem-solving', 'Teamwork', 'Communication', 'Adaptability', 'Time management', 'Continuous learning'] },
];

const EDUCATION = [
    { years: '2011 – 2018', level: 'Elementary', school: 'San Jose Leet Integrated School', place: 'San Jose Leet, Urdaneta City, Pangasinan' },
    { years: '2018 – 2022', level: 'Junior High School', school: 'Urdaneta City National High School', place: 'San Vicente West, Urdaneta City, Pangasinan' },
    { years: '2022 – 2024', level: 'Senior High School (STEM)', school: 'Urdaneta City National High School', place: 'San Vicente West, Urdaneta City, Pangasinan' },
    { years: '2024 – Present', level: 'Bachelor of Science in Information Technology', school: 'Urdaneta City University', place: 'San Vicente West, Urdaneta City, Pangasinan' },
];

const JOURNEY = [
    ['2024: Wrote my first HTML page', 'Started with the basics of web pages: headings, links, images, and page structure.'],
    ['2025: Built a database project with PHP and MySQL', 'Learned how a website talks to a database to store and show records.'],
    ['2026: Building this portfolio with Tailwind and JavaScript', 'Practicing responsive design, dark mode, and interactive features, and I keep improving it.'],
];

const iconProps = { className: 'h-5 w-5', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true' };

const CONTACTS = [
    { label: 'Email', text: 'dylanrayybragado@gmail.com', href: 'mailto:dylanrayybragado@gmail.com', external: false,
      icon: <svg {...iconProps}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg> },
    { label: 'Phone', text: '09924252326', href: 'tel:09924252326', external: false,
      icon: <svg {...iconProps}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg> },
    { label: 'Facebook', text: 'Dylan Bragado', href: 'https://www.facebook.com/search/top?q=Dylan%20Bragado', external: true,
      icon: <svg {...iconProps}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg> },
    { label: 'GitHub', text: 'Dylan00-0', href: 'https://github.com/Dylan00-0', external: true,
      icon: <svg {...iconProps}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /></svg> },
    { label: 'Instagram', text: 'dy_031006', href: 'https://www.instagram.com/dy_031006/', external: true,
      icon: <svg {...iconProps}><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><path d="M17.5 6.5h.01" /></svg> },
];

const heroCode = `const me = {
  name: "Dylan Ray Y. Bragado",
  school: "Urdaneta City University",
  course: "BSIT",
  learning: ["HTML", "Tailwind", "JavaScript"],
  openTo: "internships & projects",
};`;

const primaryBtn = 'edge rounded-lg bg-blue-700 hover:bg-blue-800 dark:bg-cyan-400 dark:hover:bg-cyan-300 dark:text-slate-900 text-white px-6 py-3 font-semibold';
const section = 'scroll-mt-20 hero-grid border-t border-slate-200 dark:border-slate-800';
const tinted = 'bg-slate-50 dark:bg-slate-900/40';
const wrap = 'mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-20';

// "projects" comes from ProjectController / routes/web.php through Inertia (database records)
export default function Portfolio({ projects }) {
    const [selected, setSelected] = useState(null);

    return (
        <>
            <Navbar />
            <main>
                {/* HERO */}
                <section id="home" className="scroll-mt-20 hero-grid">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <p className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-700 px-3 py-1 text-sm">
                                <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true"></span> Currently learning and building
                            </p>
                            <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight">Hi, I'm <span id="my-name">Dylan Ray Y. Bragado</span></h1>
                            <p className="mt-3 text-xl font-semibold text-blue-700 dark:text-cyan-400">BSIT Student | Aspiring Web Developer</p>
                            <p className="mt-5 max-w-prose text-slate-600 dark:text-slate-300 leading-relaxed">
                                I enjoy turning ideas into working websites and apps. I'm learning programming and web development, and I like finding simple digital solutions to everyday problems.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <a href="#projects" className={primaryBtn}>View My Projects</a>
                                <a href="#contact" className="edge rounded-lg border border-slate-400 dark:border-slate-600 bg-white dark:bg-[#0b1220] hover:bg-slate-100 dark:hover:bg-slate-800 px-6 py-3 font-semibold">Contact Me</a>
                            </div>
                        </div>

                        <div>
                            <div className="float relative mx-auto w-60 sm:w-72 aspect-square rounded-3xl overflow-hidden p-1.5">
                                <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
                                    <div className="spin-ring h-[150%] w-[150%] shrink-0" style={{ background: 'conic-gradient(#06b6d4, #1d4ed8, transparent 55%, #06b6d4)' }}></div>
                                </div>
                                <div className="relative h-full w-full rounded-[1.25rem] overflow-hidden bg-slate-200 dark:bg-slate-800 grid place-items-center">
                                    <span className="text-6xl font-black text-slate-500 dark:text-slate-400" aria-hidden="true">DB</span>
                                    <ImageWithFallback src="/images/profile-placeholder.jpg" alt="Photo of Dylan Ray Y. Bragado" width="288" height="288" className="absolute inset-0 h-full w-full object-cover" />
                                </div>
                            </div>
                            <div className="mt-8 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/90 dark:bg-slate-900/90 overflow-hidden">
                                <p className="px-4 py-2 border-b border-slate-300 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400 font-mono">developer.js</p>
                                <pre className="p-4 text-sm leading-7 overflow-x-auto font-mono"><code>{heroCode}</code></pre>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ABOUT */}
                <section id="about" className={`${section} ${tinted}`}>
                    <div className={wrap}>
                        <SectionTitle>About me</SectionTitle>
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
                            <div>
                                <div className="relative max-w-xs">
                                    <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-blue-700 dark:bg-cyan-400" aria-hidden="true"></div>
                                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-200 dark:bg-slate-800 grid place-items-center">
                                        <span className="text-6xl font-black text-slate-500 dark:text-slate-400" aria-hidden="true">DB</span>
                                        <ImageWithFallback src="/images/about-photo.jpg" alt="Dylan Ray Y. Bragado" width="320" height="400" className="absolute inset-0 h-full w-full object-cover" />
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-2 max-w-prose space-y-4 leading-relaxed text-slate-700 dark:text-slate-300">
                                <p>I'm a Bachelor of Science in Information Technology student at Urdaneta City University. I got into IT because I like seeing code turn into something people can use.</p>
                                <p>My main interests are programming, web development, UI/UX design, and software development. When I get stuck, I break the problem into smaller steps, read the documentation, and test my fixes one at a time.</p>
                                <p>After graduation, I want to work as a web developer and keep growing through real projects and teamwork.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SKILLS */}
                <section id="skills" className={section}>
                    <div className={wrap}>
                        <SectionTitle subtitle="Technologies and tools I work with, and the soft skills I bring to a team.">Skills</SectionTitle>
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                            {SKILLS.map((g) => <SkillGroup key={g.title} {...g} />)}
                        </div>
                    </div>
                </section>

                {/* PROJECTS (dynamic: from the database) */}
                <section id="projects" className={`${section} ${tinted}`}>
                    <div className={wrap}>
                        <SectionTitle subtitle="Some of the things I've built while learning.">Projects</SectionTitle>
                        {projects.length === 0 ? (
                            <p className="mt-8 text-slate-600 dark:text-slate-400">No projects to show yet.</p>
                        ) : (
                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {projects.map((p) => <ProjectCard key={p.id} project={p} onView={setSelected} />)}
                            </div>
                        )}
                    </div>
                </section>

                <ProjectModal project={selected} onClose={() => setSelected(null)} />

                {/* EDUCATION + JOURNEY */}
                <section id="education" className={section}>
                    <div className={wrap}>
                        <SectionTitle>Education</SectionTitle>
                        <ol className="mt-8 max-w-2xl border-l-2 border-slate-300 dark:border-slate-700 pl-6 space-y-4">
                            {EDUCATION.map((e) => (
                                <li key={e.level} className="edge rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0b1220] p-5">
                                    <p className="text-sm font-semibold text-blue-700 dark:text-cyan-400">{e.years}</p>
                                    <h3 className="mt-1 font-semibold text-lg">{e.level}</h3>
                                    <p>{e.school}</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">{e.place}</p>
                                </li>
                            ))}
                        </ol>

                        <h3 className="mt-12 text-2xl font-bold">My Developer Journey</h3>
                        <p className="mt-2 text-slate-600 dark:text-slate-400">Select a milestone to open it.</p>
                        <ol className="mt-6 max-w-2xl border-l-2 border-blue-700 dark:border-cyan-400 pl-6 space-y-4">
                            {JOURNEY.map(([title, text]) => (
                                <li key={title}>
                                    <details className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0b1220] p-4">
                                        <summary className="cursor-pointer font-semibold">{title}</summary>
                                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{text}</p>
                                    </details>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* CONTACT */}
                <section id="contact" className={`${section} ${tinted}`}>
                    <div className={`${wrap} grid grid-cols-1 md:grid-cols-2 gap-12`}>
                        <div>
                            <SectionTitle>Contact</SectionTitle>
                            <p className="mt-3 max-w-prose text-slate-600 dark:text-slate-300">Have a project or opportunity in mind? Send me a message.</p>
                            <ul className="mt-6 space-y-3 max-w-md">
                                {CONTACTS.map((c) => (
                                    <li key={c.label}>
                                        <a href={c.href} {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                            className="edge flex items-center gap-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0b1220] p-3">
                                            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-blue-700 text-white dark:bg-cyan-400 dark:text-slate-900">{c.icon}</span>
                                            <span className="min-w-0">
                                                <span className="block text-xs text-slate-600 dark:text-slate-400">{c.label}</span>
                                                <span className="block break-all">{c.text}</span>
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <ContactForm />
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
