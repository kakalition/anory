<?php

namespace App\Services\Story;

use App\Models\Story;
use Illuminate\Support\Facades\Log;

class GetUserStories
{
  public function handle(int $authorId, int $count = 3)
  {
    $stories = Story::where('author_id', $authorId)
      ->limit($count)
      ->get();

    Log::info('getuserstories');
    Log::info($stories);

    return $stories;
  }
}
