<?php

use Illuminate\Testing\Fluent\AssertableJson;
use Illuminate\Foundation\Testing\RefreshDatabase;

use function Pest\Laravel\deleteJson;
use function Pest\Laravel\getJson;
use function Pest\Laravel\putJson;
use function Pest\Laravel\seed;

uses(RefreshDatabase::class);

/**********
 * CREATE *
 **********/

test('when create story with invalid data, returns error. (HTTP 422)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');

  $response = createStory('k@k', 'Honor', 'This is Story', null);
  $response->assertUnprocessable();
});

test('when create story on another user URI, returns error. (HTTP 403)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');

  $response = createStory('j@j', 'Honor', 'This is Story', null);
  $response->assertForbidden();
});

test('when create story (not logged in), returns error. (HTTP 401)', function () {
  seed();

  $response = createStory('k@k', 'Honor', 'This is Story', null);
  $response->assertUnauthorized();
});

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

/********
 * READ *
 ********/

test('when get all stories, should returns all stories. (HTTP 200)', function () {
  $response = getJson('api/stories');
  $response->assertOk();
  $response->assertJsonCount(0);
});

test('when get user story (already have stories), returns an array of its own stories. (HTTP 200)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');

  $response = getJson('api/users/k@k/stories');
  $response->assertOk();
  $response->assertJsonCount(1);

  $response = getJson('api/users/k@k/stories/this-is-story');
  $response->assertOk();
});

test('when get story, returns story with incremented total views. (HTTP 200)', function () {
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

/**********
 * UPDATE *
 **********/

test('when update story of another user, returns error. (HTTP 403)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');
  logout();
  registerUser('Jojo', 'j@j', '00000000');

  $response = updateStory('k@k', 'this-is-story', 'Education', 'Updated Title');
  $response->assertForbidden();
});

test('when update a non-existent story, returns error. (HTTP 404)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');

  $response = updateStory('k@k', 'this-is-story', null, 'Updated Title');
  $response->assertNotFound();
});

test('when successfully update story, returns the correct data. (HTTP 200)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');

  $response = updateStory('k@k', 'this-is-story', 'Education', 'Updated Title');
  $response->assertOk();
  $response->assertJson([
    'category' => 'Education',
    'title' => 'Updated Title',
    'body' => 'This is the body of story.'
  ]);
});

/**********
 * DELETE *
 **********/

test('when delete non-existent story, returns error. (HTTP 404)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');

  $response = deleteStory('k@k', 'this-is-story');
  $response->assertNotFound();
});

test('when delete story of another user, returns error. (HTTP 403)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');

  $response = deleteStory('j@j', 'this-is-story');
  $response->assertForbidden();
});

test('when delete story (not logged in), returns error. (HTTP 401)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');
  logout();

  $response = deleteStory('k@k', 'this-is-story');
  $response->assertUnauthorized();
});

test('when successfully delete story, returns no content. (HTTP 204)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');

  $response = deleteStory('k@k', 'this-is-story');
  $response->assertNoContent();
});
