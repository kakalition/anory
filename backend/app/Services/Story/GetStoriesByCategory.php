<?php

namespace App\Services\Story;

use App\Exceptions\CategoryNotFoundException;
use App\Models\Category;
use App\Models\Story;

class GetStoriesByCategory
{
  public function handle(String $categoryName)
  {
    $category = Category::where('name', 'ilike', $categoryName)
      ->first();

    if (!$category) {
      throw new CategoryNotFoundException();
    }

    $stories = Story::where('category_id', $category->id)
      ->get();

    return $stories;
  }
}
