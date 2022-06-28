<?php

namespace App\Services\Story;

use App\Models\Story;

class GetUserStories
{
  public function handle(int $authorId)
  {
    $stories = Story::where('author_id', $authorId)
      ->get();

    return $stories;
  }
}
