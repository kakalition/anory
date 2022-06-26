<?php

namespace App\Services\Story;

use App\Exceptions\StoryNotFoundException;
use App\Exceptions\UserNotFoundException;
use App\Models\Story;
use App\Models\User;

class FindStory
{
  public function handle(String $authorEmail, String $title)
  {
    $user = User::where('email', $authorEmail)->first();

    if (!$user) {
      throw new UserNotFoundException();
    }

    $story = Story::where('author_id', $user->id)
      ->where('title', $title)
      ->first();
    
    if (!$story) {
      throw new StoryNotFoundException();
    }

    return $story;
  }
}
