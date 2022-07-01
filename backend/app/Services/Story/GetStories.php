<?php

namespace App\Services\Story;

use App\Models\Story;
use Illuminate\Support\Facades\DB;

class GetStories
{
  public function handle(int $count, ?string $rawQuery)
  {
    $query = str_replace('-', ' ', $rawQuery ?? '');
    $stories = Story::limit(5);

    if ($query != '') {
      $stories->where('title', 'ilike', $query);
    }

    return $stories->get();
  }
}
