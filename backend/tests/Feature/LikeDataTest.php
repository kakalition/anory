<?php

use App\Models\Comment;
use Illuminate\Foundation\Testing\RefreshDatabase;

use function Pest\Laravel\seed;

uses(RefreshDatabase::class);

test('when get comment like data, should returns correct like data. (HTTP 200)', function () {
  seed();
  registerUser('Kaka', 'k@k', '00000000');
  $story = createStory('k@k', 'Honor', 'This is Story', 'This is the body of story.');
  $comment = commentStory($story['id'], 'This is a comment.');
  $response = likeDislikeComment($comment['id'], 1);
  $response->assertCreated();

  $te = Comment::find($comment['id'])->likeData;
  echo $te;
});
