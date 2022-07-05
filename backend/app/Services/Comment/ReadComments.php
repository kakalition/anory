<?php

namespace App\Services\Comment;

use App\Exceptions\StoryNotFoundException;
use App\Exceptions\UserNotFoundException;
use App\Models\Story;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class ReadComments
{
  public function handle(array $data)
  {
    $story = Story::find($data['story_id'])
      ->comments()
      ->orderBy('created_at', 'desc')
      ->get();

    return $story;
  }
}
