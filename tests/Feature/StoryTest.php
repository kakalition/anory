<?php

use Illuminate\Testing\Fluent\AssertableJson;
use Illuminate\Foundation\Testing\RefreshDatabase;

use function Pest\Laravel\deleteJson;
use function Pest\Laravel\getJson;
use function Pest\Laravel\putJson;
use function Pest\Laravel\seed;

uses(RefreshDatabase::class);

/********
 * READ *
 ********/

test('when get all stories, should returns all stories (HTTP 200).', function () {
  $response = getJson('api/stories');
  $response->assertOk();
  $response->assertJsonCount(0);
});

test('when get user story (already have stories), returns an array of its own stories (HTTP 200).', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');

  $response = getJson('api/users/k@k/stories');
  $response->assertOk();
  $response->assertJsonCount(1);

  $response = getJson('api/users/k@k/stories/this-is-story');
  $response->assertOk();
});

test('when get likeDislike data, returns likeDislike data (HTTP 200).', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');
  $likeData = likeDislikeStory('k@k', 'this-is-story', 'k@k', 1);

  $response = getJson('api/users/k@k/stories/this-is-story/like-dislikes/' . $likeData->json('id'));
  $response->assertOk();
  $response->assertJson(['id' => $likeData->json('id')]);
});


/**********
 * CREATE *
 **********/

test('when create story, should return created story (HTTP 201).', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');

  $response = createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');
  $response->assertCreated();
  $response->assertJson(
    fn (AssertableJson $json) =>
    $json->where('title', 'This is Story')
      ->where('body', 'This is the body of story.')
      ->where('author_id', findUserId('k@k'))
      ->where('category', 'Honor')
      ->etc()
  );
});

test('when like story, returns likeDislike data (HTTP 200).', function () {
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


/**********
 * UPDATE *
 **********/

/**********
 * DELETE *
 **********/

test('when successfully remove like dislike, returns 204.', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');
  $like = likeDislikeStory('k@k', 'this-is-story', 'k@k', -1);

  $response = deleteJson('api/users/k@k/stories/this-is-story/like-dislikes/' . $like->json('id'));
  $response->assertNoContent();
});

test('when remove non-existent like dislike data, returns 404.', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');

  $response = deleteJson('api/users/k@k/stories/this-is-story/like-dislikes/0');
  $response->assertNotFound();
});

test('when get story, increment total views.', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');

  $responseOne = getJson('api/users/k@k/stories/this-is-story');
  $responseOne->assertOk();
  $responseOne->assertJson([
    'views' => 1
  ]);

  getJson('api/users/k@k/stories/this-is-story');
  getJson('api/users/k@k/stories/this-is-story');
  $responseTwo = getJson('api/users/k@k/stories/this-is-story');
  $responseTwo->assertOk();
  $responseTwo->assertJson([
    'views' => 4
  ]);
});

test('when update non-existent story, returns 404.', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');

  $response = putJson('api/users/k@k/stories/this-is-story', [
    'title' => 'Updated Title'
  ]);

  $response->assertNotFound();
});

test('when successfully update story, returns 200 and correct data.', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');

  $response = putJson('api/users/k@k/stories/this-is-story', [
    'category_name' => 'Education',
    'title' => 'Updated Title'
  ]);
  $response->assertOk();
  $response->assertJson([
    'category' => 'Education',
    'title' => 'Updated Title',
    'body' => 'This is the body of story.'
  ]);
});

test('when successfully delete story, returns 204.', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');

  $response = deleteJson('api/users/k@k/stories/this-is-story');
  $response->assertNoContent();
});

test('when delete non-existent story, returns 404.', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');

  $response = deleteJson('api/users/k@k/stories/this-is-story');
  $response->assertNotFound();
});
