<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

use function Pest\Laravel\deleteJson;
use function Pest\Laravel\getJson;
use function Pest\Laravel\patchJson;
use function Pest\Laravel\postJson;
use function Pest\Laravel\seed;

uses(RefreshDatabase::class);

test('when get comments (unauthenticated), should returns error. (HTTP 401)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  $story = createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');
  logout();

  $response = getJson('/api/stories/' . $story['id'] . '/comments');
  $response->assertUnauthorized();
});

test('when get comments, should returns correct comments data. (HTTP 200)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  $story = createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');

  $response = getJson('/api/stories/' . $story['id'] . '/comments');
  $response->assertOk();
});

test('when post comment with invalid payload, should return error. (HTTP 422)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  $story = createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');

  $response = postJson('api/stories/' . $story['id'] . '/comments', ['comment' => null]);
  $response->assertUnprocessable();
});

test('when post comment(unauthenticated), should returns error. (HTTP 401)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  $story = createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');
  logout();

  $response = postJson('api/stories/' . $story['id'] . '/comments', ['comment' => null]);
  $response->assertUnauthorized();
});

test('when post comment, should return submitted comment. (HTTP 201)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  $story = createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');

  $response = postJson('api/stories/' . $story['id'] . '/comments', ['comment' => 'This is my comment.']);
  $response->assertCreated();
});

test('when update comment with invalid payload, , should return error. (HTTP 422)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  $story = createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');
  $responseOne = postJson('/api/stories/' . $story['id'] . '/comments', ['comment' => 'This is my comment.']);
  $responseOne->assertCreated();

  $responseTwo = patchJson('/api/comments/' . $responseOne['id'], ['comment' => null]);
  $responseTwo->assertUnprocessable();
});


test('when update comment (unauthenticated), should return error. (HTTP 401)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  $story = createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');
  $responseOne = postJson('/api/stories/' . $story['id'] . '/comments', ['comment' => 'This is my comment.']);
  $responseOne->assertCreated();
  logout();

  $responseTwo = patchJson('/api/comments/' . $responseOne['id'], ['comment' => 'This is my updated comment.']);
  $responseTwo->assertUnauthorized();
});

test('when update comment, should return updated comment. (HTTP 200)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  $story = createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');
  $responseOne = postJson('/api/stories/' . $story['id'] . '/comments', ['comment' => 'This is my comment.']);
  $responseOne->assertCreated();

  $responseTwo = patchJson('api/comments/' . $responseOne['id'], ['comment' => 'This is my updated comment.']);
  $responseTwo->assertOk();
});

test('when update comment on non-existent comment, should return error. (HTTP 404)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  $story = createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');

  $responseTwo = patchJson('api/comments/0', ['comment' => 'This is my updated comment.']);
  $responseTwo->assertNotFound();
});

test('when delete non-existent comment, should returns error. (HTTP 404)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');

  $response = deleteJson('/api/comments/0');
  $response->assertNotFound();
});


test('when delete comment, should returns no content. (HTTP 204)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  $story = createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');
  $comment = postJson('/api/stories/' . $story['id'] . '/comments', ['comment' => 'This is my comment.']);
  $comment->assertCreated();

  $response = deleteJson('/api/comments/' . $comment['id']);
  $response->assertNoContent();
});
