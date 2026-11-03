<?php

use App\Http\Controllers\ProjectController;
use App\Models\Project;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public portfolio page: projects now come from the database
Route::get('/', function () {
    return Inertia::render('Portfolio', [
        'projects' => Project::orderByDesc('date_completed')->get(),
    ]);
})->name('home');

// CRUD for projects. "show" is not used because the public page already displays the data.
// Routes used: index, create, store, edit, update, destroy
Route::resource('projects', ProjectController::class)->except(['show']);

// Keep this line if you installed Breeze (login/register routes)
// require __DIR__.'/auth.php';
