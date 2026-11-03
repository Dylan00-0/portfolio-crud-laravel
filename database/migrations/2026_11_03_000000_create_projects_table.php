<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title', 100)->unique();
            $table->text('description');
            $table->string('tech_stack', 150);          // comma-separated: "PHP, MySQL, Tailwind CSS"
            $table->string('project_url')->nullable();
            $table->string('repository_url')->nullable();
            $table->string('image')->nullable();        // path of the uploaded image
            $table->date('date_completed');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
