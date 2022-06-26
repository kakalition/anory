<?php

namespace App\Services\Comment;

use App\Exceptions\StoryNotFoundException;
use App\Exceptions\UserNotFoundException;
use App\Models\Story;
use App\Models\User;

class ReadComments
{
  public function handle(String $authorEmail, String $title)
  {
    $user = User::where('email', 'ilike', $authorEmail)->first();
    if (!$user) {
      throw new UserNotFoundException();
    }

    $story = Story::where('author_id', $user->id)
      ->where('title', 'ilike', $title)
      ->first();

    if (!$story) {
      throw new StoryNotFoundException();
    }

    return $story->comments();
  }
}
