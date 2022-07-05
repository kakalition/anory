<?php

namespace App\Services\Story;

use App\Models\Story;
use Illuminate\Support\Facades\DB;

class GetStories
{
  public function handle(int $count, ?string $rawQuery)
  {
    $query = str_replace('-', ' ', $rawQuery ?? '');
    $stories = Story::limit($count);

    if ($query != '') {
      $stories->where('title', 'ilike', $query);
    }

    $stories->orderByDesc('created_at');
    return $stories->get();
  }
}
