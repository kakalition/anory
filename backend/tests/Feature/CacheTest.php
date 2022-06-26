<?php

use function Pest\Laravel\getJson;
use function Pest\Laravel\postJson;

use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Story;
use App\Models\User;

uses(RefreshDatabase::class);

test('test', function () {
  $categories = Category::factory()->count(3)
    ->create();

  User::factory()->count(4)
    ->has(Story::factory()->count(2), 'stories')
    ->create();

  $firstCategory = $categories[0]->name;

  $response = getJson("/api/stories/$firstCategory");
  $response->dump();
});
