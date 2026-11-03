<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        Project::create([
            'title' => 'Pet Adoption Management System',
            'description' => 'A web-based system for managing pet records and adoption records, built with PHP and MySQL and styled with Tailwind CSS.',
            'tech_stack' => 'PHP, MySQL, Tailwind CSS',
            'repository_url' => 'https://github.com/Dylan00-0',
            'image' => 'images/pet.png',
            'date_completed' => '2025-06-15',
        ]);

        Project::create([
            'title' => 'Watch Store App',
            'description' => 'A mobile store interface for browsing watches, built with Flutter and Dart while I learn mobile app development.',
            'tech_stack' => 'Flutter, Dart',
            'repository_url' => 'https://github.com/Dylan00-0',
            'image' => 'images/figma.png',
            'date_completed' => '2025-10-20',
        ]);

        Project::create([
            'title' => 'Responsive Interface Design',
            'description' => 'Interface layouts that adapt to mobile, tablet, and desktop screens using HTML, CSS, and Tailwind CSS.',
            'tech_stack' => 'HTML, CSS, Tailwind CSS',
            'repository_url' => 'https://github.com/Dylan00-0',
            'image' => 'images/responsive.png',
            'date_completed' => '2026-02-10',
        ]);
    }
}
