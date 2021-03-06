<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

use function Pest\Laravel\deleteJson;
use function Pest\Laravel\getJson;
use function Pest\Laravel\seed;

uses(RefreshDatabase::class);

/**********
 * CREATE *
 **********/

test('when creating like data for story (already like the same object), should return error. (HTTP 422)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  $user = getUser();

  $categories = getJson('api/categories');
  $firstCategoryId = $categories[0]['id'];

  $story = createStory($firstCategoryId, 'This is Story', 'This is the body of story.');
  $comment = commentStory($story['id'], 'This is a comment.');

  likeDislikeComment($comment['id'], 1);
  $response = likeDislikeComment($comment['id'], 1);
  $response->assertUnprocessable();
});

test('when creating like data for comment (already like the same object), should return error. (HTTP 422)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  $user = getUser();

  $categories = getJson('api/categories');
  $firstCategoryId = $categories[0]['id'];
  $story = createStory($firstCategoryId, 'This is Story', 'This is the body of story.');

  likeDislikeStory($story['id'], 1);
  $response = likeDislikeStory($story['id'], 1);
  $response->assertUnprocessable();
});


test('when successfuly like data on comment, should returns correct data. (HTTP 201)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  $user = getUser();

  $categories = getJson('api/categories');
  $firstCategoryId = $categories[0]['id'];
  $story = createStory($firstCategoryId, 'This is Story', 'This is the body of story.');
  $comment = commentStory($story['id'], 'This is a comment.');

  $response = likeDislikeComment($comment['id'], 1);
  $response->assertCreated();
});

/********
 * READ *
 ********/

test('when get comment like data, should returns correct like data. (HTTP 200)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');

  $categories = getJson('api/categories');
  $firstCategoryId = $categories[0]['id'];
  $story = createStory($firstCategoryId, 'This is Story', 'This is the body of story.');
  $comment = commentStory($story['id'], 'This is a comment.');

  $response = likeDislikeComment($comment['id'], 1);
  $response->assertCreated();
});

/**********
 * DELETE *
 **********/

test('when successfully delete like data, should returns no content. (HTTP 204)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');

  $categories = getJson('api/categories');
  $firstCategoryId = $categories[0]['id'];
  $story = createStory($firstCategoryId, 'This is Story', 'This is the body of story.');
  $comment = commentStory($story['id'], 'This is a comment.');
  $likeData = likeDislikeComment($comment['id'], 1);

  $response = deleteJson('/api/likedata/' . $likeData['id']);
  $response->assertNoContent();
});
