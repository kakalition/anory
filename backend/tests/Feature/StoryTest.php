<?php

use App\Models\Category;
use Illuminate\Testing\Fluent\AssertableJson;
use Illuminate\Foundation\Testing\RefreshDatabase;

use function Pest\Laravel\getJson;
use function Pest\Laravel\seed;

uses(RefreshDatabase::class);

/**********
 * CREATE *
 **********/

test('when create story with invalid data, returns error. (HTTP 422)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');

  $categories = getJson('api/categories');
  $firstCategoryId = $categories[0]['id'];

  $response = createStory($firstCategoryId, 'This is Story', null);
  $response->assertUnprocessable();
});

test('when create story (not logged in), returns error. (HTTP 401)', function () {
  seed();

  $categories = getJson('api/categories');
  $firstCategoryId = $categories[0]['id'];

  $response = createStory($firstCategoryId, 'This is Story', null);
  $response->assertUnauthorized();
});

test('when create story, should return created story (HTTP 201).', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  $categories = getJson('api/categories');
  $firstCategoryId = $categories[0]['id'];

  $response = createStory($firstCategoryId, 'This is Story', 'This is the body of story.');
  $response->assertCreated();
  $response->assertJson(
    fn (AssertableJson $json) =>
    $json->where('title', 'This is Story')
      ->where('body', 'This is the body of story.')
      ->where('author_id', findUserId('k@k'))
      ->where('category', $categories[0]['name'])
      ->etc()
  );
});

/********
 * READ *
 ********/

test('when get all stories, should returns all stories. (HTTP 200)', function () {
  registerUser('Kaka', 'k@k', '00000000');

  $response = getJson('api/stories');
  $response->assertOk();
  $response->assertJsonCount(0);
});

test('when get user story (already have stories), returns an array of its own stories. (HTTP 200)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  $categories = getJson('api/categories');
  $firstCategoryId = $categories[0]['id'];
  $user = getJson('api/user');
  createStory($firstCategoryId, 'This is Story', 'This is the body of story.');

  $response = getJson('api/users/' . $user['id'] . '/stories');
  $response->assertOk();
  $response->assertJsonCount(1);
});

test('when get story, returns story with incremented total views. (HTTP 200)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  $categories = getJson('api/categories');
  $firstCategoryId = $categories[0]['id'];
  $story = createStory($firstCategoryId, 'This is Story', 'This is the body of story.');

  $responseOne = getJson('api/stories/' . $story['id']);
  $responseOne->assertOk();
  $responseOne->assertJson([
    'views' => 1
  ]);

  getJson('api/stories/' . $story['id']);
  getJson('api/stories/' . $story['id']);
  $responseTwo = getJson('api/stories/' . $story['id']);
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

  $categories = getJson('api/categories');
  $firstCategoryId = $categories[0]['id'];
  $secondCategoryId = $categories[1]['id'];
  $story = createStory($firstCategoryId, 'This is Story', 'This is the body of story.');

  logout();
  registerUser('Jojo', 'j@j', '00000000');

  $response = updateStory($story['id'], $secondCategoryId, 'Updated Title', null);
  $response->assertForbidden();
});

test('when update a non-existent story, returns error. (HTTP 404)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');

  $categories = getJson('api/categories');
  $firstCategoryId = $categories[0]['id'];
  $secondCategoryId = $categories[1]['id'];
  createStory($firstCategoryId, 'This is Story', 'This is the body of story.');

  $response = updateStory(0, $secondCategoryId, 'Updated Title', null);
  $response->assertNotFound();
});

test('when successfully update story, returns the correct data. (HTTP 200)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  $categories = getJson('api/categories');
  $firstCategoryId = $categories[0]['id'];
  $secondCategoryId = $categories[1]['id'];
  $story = createStory($firstCategoryId, 'This is Story', 'This is the body of story.');

  $response = updateStory($story['id'], $secondCategoryId, 'Updated Title', null);
  $response->assertOk();
  $response->assertJson([
    'category' => Category::find($secondCategoryId)->name,
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

  $response = deleteStory(0);
  $response->assertNotFound();
});

test('when delete story of another user, returns error. (HTTP 403)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');

  $categories = getJson('api/categories');
  $firstCategoryId = $categories[0]['id'];
  $story = createStory($firstCategoryId, 'This is Story', 'This is the body of story.');

  logout();
  registerUser('Jojo', 'j@j', '00000000');

  $response = deleteStory($story['id']);
  $response->assertForbidden();
});

test('when delete story (not logged in), returns error. (HTTP 401)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  $categories = getJson('api/categories');
  $firstCategoryId = $categories[0]['id'];
  $story = createStory($firstCategoryId, 'This is Story', 'This is the body of story.');
  logout();

  $response = deleteStory($story['id']);
  $response->assertUnauthorized();
});

test('when successfully delete story, returns no content. (HTTP 204)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  $categories = getJson('api/categories');
  $firstCategoryId = $categories[0]['id'];
  $story = createStory($firstCategoryId, 'This is Story', 'This is the body of story.');

  $response = deleteStory($story['id']);
  $response->assertNoContent();
});
