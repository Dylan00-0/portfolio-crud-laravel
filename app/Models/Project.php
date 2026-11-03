<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    // Only these columns can be mass-assigned (Project::create($data) / $project->update($data))
    protected $fillable = [
        'title',
        'description',
        'tech_stack',
        'project_url',
        'repository_url',
        'image',
        'date_completed',
    ];

    protected $casts = [
        'date_completed' => 'date:Y-m-d',
    ];

    // Adds "image_url" to the JSON that is sent to React
    protected $appends = ['image_url'];

    public function getImageUrlAttribute(): ?string
    {
        if (! $this->image) {
            return null;
        }

        // Images that already live in /public/images (the original portfolio images)
        if (str_starts_with($this->image, 'images/')) {
            return asset($this->image);
        }

        // Uploaded images (storage/app/public/projects/...)
        return asset('storage/' . $this->image);
    }
}
