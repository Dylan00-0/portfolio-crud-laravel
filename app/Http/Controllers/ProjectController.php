<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    /** Validation rules (shared by store and update). */
    private function rules(?Project $project = null): array
    {
        return [
            // required + length rule + unique (ignores the current record when editing)
            'title'          => ['required', 'string', 'min:3', 'max:100',
                                 Rule::unique('projects', 'title')->ignore($project?->id)],
            'description'    => ['required', 'string', 'min:20', 'max:1000'],
            'tech_stack'     => ['required', 'string', 'max:150'],
            // format rule: must be a valid URL
            'project_url'    => ['nullable', 'url', 'max:255'],
            'repository_url' => ['nullable', 'url', 'max:255'],
            // format rule: valid date, not in the future
            'date_completed' => ['required', 'date', 'before_or_equal:today'],
            // image upload rules
            'image'          => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ];
    }

    /** Custom error messages. */
    private function messages(): array
    {
        return [
            'title.required'                 => 'Please enter the project title.',
            'title.unique'                   => 'You already have a project with this title.',
            'description.min'                => 'The description is too short. Write at least 20 characters.',
            'tech_stack.required'            => 'List at least one technology, separated by commas.',
            'project_url.url'                => 'The project URL must be a valid link, like https://example.com.',
            'repository_url.url'             => 'The repository URL must be a valid link, like https://github.com/you/repo.',
            'date_completed.before_or_equal' => 'The completion date cannot be in the future.',
            'image.image'                    => 'The file must be an image.',
            'image.mimes'                    => 'Only JPG, PNG, or WEBP images are allowed.',
            'image.max'                      => 'The image must not be larger than 2 MB.',
        ];
    }

    public function index(): Response
    {
        return Inertia::render('Projects/Index', [
            'projects' => Project::orderByDesc('date_completed')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Projects/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate($this->rules(), $this->messages());

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('projects', 'public');
        }

        Project::create($data);

        return redirect()->route('projects.index')->with('success', 'Project created successfully.');
    }

    public function edit(Project $project): Response
    {
        return Inertia::render('Projects/Edit', [
            'project' => $project,
        ]);
    }

    public function update(Request $request, Project $project): RedirectResponse
    {
        $data = $request->validate($this->rules($project), $this->messages());

        if ($request->hasFile('image')) {
            $this->deleteStoredImage($project);
            $data['image'] = $request->file('image')->store('projects', 'public');
        } else {
            unset($data['image']); // keep the old image
        }

        $project->update($data);

        return redirect()->route('projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $this->deleteStoredImage($project);
        $project->delete();

        return redirect()->route('projects.index')->with('success', 'Project deleted successfully.');
    }

    /** Only delete uploaded files, never the original images in /public/images. */
    private function deleteStoredImage(Project $project): void
    {
        if ($project->image && ! str_starts_with($project->image, 'images/')) {
            Storage::disk('public')->delete($project->image);
        }
    }
}
