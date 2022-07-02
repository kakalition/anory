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
    $story = Story::find($data['story_id'])
      ->first()
      ->comments()
      ->orderBy('created_at', 'desc')
      ->get();

    return $story;
  }
}
