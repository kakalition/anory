<?php

namespace App\Services\Category;

use App\Models\Category;

class GetAllCategories
{
  public function handle()
  {
    $categories = Category::all(['id', 'name']);

    return $categories;
  }
}
