<?php

namespace App\Helpers;

use App\Models\Category;

trait FindCategoryId
{
  public function findCategoryId($categoryName)
  {
    $id = Category::where('name', $categoryName)
      ->first()
      ?->id;

    return $id;
  }
}
