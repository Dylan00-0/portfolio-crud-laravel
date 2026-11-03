<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title inertia>Dylan Ray Y. Bragado | BSIT Student & Aspiring Web Developer</title>
    <meta name="description" content="Portfolio of a BSIT student: web development projects, skills, and education.">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

    {{-- Runs BEFORE the page paints so the wrong theme never flashes --}}
    <script>
        try {
            var saved = localStorage.getItem('theme');
            var dark = saved ? saved === 'dark' : !window.matchMedia('(prefers-color-scheme: light)').matches;
            document.documentElement.classList.toggle('dark', dark);
        } catch (e) { document.documentElement.classList.add('dark'); }
    </script>

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>
<body class="bg-white text-slate-800 dark:bg-[#0b1220] dark:text-slate-200 font-sans antialiased transition-colors">
    @inertia
</body>
</html>
