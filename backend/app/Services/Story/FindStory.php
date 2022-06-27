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
    $story = Story::where('id', $data['story_id'])
      ->first();

    if (!$story) {
      throw new StoryNotFoundException();
    }

    return $story;
  }
}
