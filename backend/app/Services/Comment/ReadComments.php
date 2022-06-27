<?php

namespace App\Services\Comment;

use App\Exceptions\StoryNotFoundException;
use App\Exceptions\UserNotFoundException;
use App\Models\Story;
use App\Models\User;

class ReadComments
{
  public function handle(array $data)
  {
    $story = Story::where('id', $data['story_id'])
      ->first()
      ->comments()
      ->get();

    return $story;
  }
}
