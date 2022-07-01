<?php

namespace App\Services\Story;

use App\Models\Story;

class GetStories
{
  public function handle(int $count, string $rawQuery)
  {
    $query = str_replace('-', ' ', $rawQuery);
    $stories = Story::where('title', 'ilike', $query)
      ->limit($count)
      ->get();

    return $stories;
  }
}
