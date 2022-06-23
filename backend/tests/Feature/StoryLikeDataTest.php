<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

use function Pest\Laravel\deleteJson;
use function Pest\Laravel\getJson;
use function Pest\Laravel\seed;

uses(RefreshDatabase::class);

/**********
 * CREATE *
 **********/

 test('when like story (not logged in), returns error (HTTP 401)', function() {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');
  logout();

  $response = likeDislikeStory('k@k', 'this-is-story', 'k@k', 1);
  $response->assertUnauthorized();
 });

test('when like story, returns likeDislike data (HTTP 201).', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');

  $response = likeDislikeStory('k@k', 'this-is-story', 'k@k', 1);
  $response->assertCreated();
});

test('when like story, returns story data with incremented total likes (HTTP 200).', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');
  likeDislikeStory('k@k', 'this-is-story', 'k@k', 1);

  $response = getJson('api/users/k@k/stories/this-is-story');
  $response->assertOk();
  $response->assertJson([
    'likes' => 1,
    'dislikes' => 0,
  ]);
});

test('when dislike story, returns story data with incremented total dislikes (HTTP 200).', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');
  likeDislikeStory('k@k', 'this-is-story', 'k@k', -1);

  $response = getJson('api/users/k@k/stories/this-is-story');
  $response->assertOk();
  $response->assertJson([
    'likes' => 0,
    'dislikes' => 1
  ]);
});

test('when like an already disliked story, returns story data with changed total likes and dislikes (HTTP 200).', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');
  likeDislikeStory('k@k', 'this-is-story', 'k@k', -1);

  $responseOne = getJson('api/users/k@k/stories/this-is-story');
  $responseOne->assertOk();
  $responseOne->assertJson([
    'likes' => 0,
    'dislikes' => 1
  ]);

  likeDislikeStory('k@k', 'this-is-story', 'k@k', 1);
  $responseTwo = getJson('api/users/k@k/stories/this-is-story');
  $responseTwo->assertOk();
  $responseTwo->assertJson([
    'likes' => 1,
    'dislikes' => 0
  ]);
});

/********
 * READ *
 ********/

test('when get likeDislike data, returns likeDislike data (HTTP 200).', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');
  $likeData = likeDislikeStory('k@k', 'this-is-story', 'k@k', 1);

  $response = getJson('api/users/k@k/stories/this-is-story/like-dislikes?email=k@k');
  $response->assertOk();
  $response->assertJson(['id' => $likeData->json('id')]);
});

/**********
 * DELETE *
 **********/

test('when remove non-existent like dislike data, returns error. (HTTP 404)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');

  $response = deleteJson('api/users/k@k/stories/this-is-story/like-dislikes/0');
  $response->assertNotFound();
});

test('when successfully remove like dislike, returns no content. (HTTP 204)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');
  likeDislikeStory('k@k', 'this-is-story', 'k@k', -1);

  $response = deleteJson('api/users/k@k/stories/this-is-story/like-dislikes/?email=k@k');
  $response->assertNoContent();
});
