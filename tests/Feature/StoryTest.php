<?php

use Illuminate\Testing\Fluent\AssertableJson;
use Illuminate\Foundation\Testing\RefreshDatabase;

use function Pest\Laravel\getJson;
use function Pest\Laravel\postJson;
use function Pest\Laravel\seed;

uses(RefreshDatabase::class);

test('when get all stories, return all stories', function () {
  $response = getJson('api/stories');
  $response->assertOk();
  $response->assertJsonCount(0);
});

test('when create story, should return created story and 201 status code.', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');

  $response = createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');
  $response->assertCreated();
  $response->assertJson(
    fn (AssertableJson $json) =>
    $json->where('title', 'This is Story')
      ->where('body', 'This is the body of story.')
      ->where('author_id', findUserId('k@k'))
      ->where('category_id', findCategoryId('Honor'))
      ->etc()
  );
});
