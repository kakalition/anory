<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

use function Pest\Laravel\getJson;
use function Pest\Laravel\patchJson;
use function Pest\Laravel\postJson;
use function Pest\Laravel\seed;

uses(RefreshDatabase::class);

test('when get comments, should returns correct comments data. (HTTP 200)', function() {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');

  $response = getJson('/api/users/k@k/stories/this-is-story/comments');
  $response->assertOk();
});

test('when post comment, should return submitted comment. (HTTP 201)', function() {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');

  $response = postJson('api/users/k@k/stories/this-is-story/comments', ['comment' => 'This is my comment.']);
  $response->assertCreated();
});

test('when update comment, should return updated comment. (HTTP 200)', function() {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');
  $responseOne = postJson('api/users/k@k/stories/this-is-story/comments', ['comment' => 'This is my comment.']);
  $responseOne->dump();
  $responseOne->assertCreated();

  $responseTwo = patchJson('api/users/k@k/stories/this-is-story/comments/' . $responseOne->json('id'), ['comment' => 'This is my updated comment.']);
  $responseTwo->dump();
  $responseTwo->assertOk();
});