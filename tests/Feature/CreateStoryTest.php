<?php

use function Pest\Laravel\postJson;
use function Pest\Laravel\seed;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\Fluent\AssertableJson;

uses(RefreshDatabase::class);

test('when create story, should return created story and 201 status code.', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');

  $response = postJson('api/users/k@k/stories', [
    'category_name' => 'Honor',
    'views' => 0,
    'likes' => 0,
    'dislikes' => 0,
    'title' => 'This is Story',
    'body' => 'This is body of story.',
  ]);

  $response->assertCreated();
  $response->assertJson(
    fn (AssertableJson $json) =>
    $json->where('title', 'This is Story')
      ->where('body', 'This is body of story.')
      ->where('author_id', findUserId('k@k'))
      ->where('category_id', findCategoryId('Honor'))
      ->etc()
  );
});