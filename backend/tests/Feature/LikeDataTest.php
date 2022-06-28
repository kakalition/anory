<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

use function Pest\Laravel\deleteJson;
use function Pest\Laravel\seed;

uses(RefreshDatabase::class);

/**********
 * CREATE *
 **********/

test('when creating like data (already like the same object), should return error. (HTTP 422)', function() {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  $user = getUser();
  $story = createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');
  $comment = commentStory($story['id'], 'This is a comment.');

  likeDislikeComment($comment['id'], 1);
  $response = likeDislikeComment($comment['id'], 1);
  $response->assertUnprocessable();
});

test('when successfuly like data on comment, should returns correct data. (HTTP 201)', function() {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  $user = getUser();
  $story = createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');
  $comment = commentStory($story['id'], 'This is a comment.');

  $response = likeDislikeComment($comment['id'], 1);
  $response->assertCreated();
  $response->assertJson([
    'likee_id' => $user['id'],
    'likeable_id' => $story['id']
  ]);
});

/********
 * READ *
 ********/

test('when get comment like data, should returns correct like data. (HTTP 200)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  $story = createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');
  $comment = commentStory($story['id'], 'This is a comment.');
  $response = likeDislikeComment($comment['id'], 1);
  $response->assertCreated();
});

/**********
 * DELETE *
 **********/

 test('when successfully delete like data, should returns no content. (HTTP 204)', function() {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  $story = createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');
  $comment = commentStory($story['id'], 'This is a comment.');
  $likeData = likeDislikeComment($comment['id'], 1);

  $response = deleteJson('/api/likedata/' . $likeData['id']);
  $response->dump();
  $response->assertNoContent();
 });