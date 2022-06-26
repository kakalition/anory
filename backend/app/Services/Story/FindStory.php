<?php

namespace App\Services\Story;

use App\Exceptions\StoryNotFoundException;
use App\Exceptions\UserNotFoundException;
use App\Models\Story;
use App\Models\User;

class FindStory
{
  public function handle(array $data)
  {
    $user = User::where('email', $data['author_email'])->first();

    if (!$user) {
      throw new UserNotFoundException();
    }

    $story = Story::where('author_id', $user->id)
      ->where('title', 'ilike', $data['title'])
      ->first();
    
    if (!$story) {
      throw new StoryNotFoundException();
    }

    return $story;
  }
}
