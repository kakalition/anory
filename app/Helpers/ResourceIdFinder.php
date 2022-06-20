<?php

namespace App\Helpers;

use App\Models\Category;
use App\Models\Story;
use App\Models\User;

trait ResourceIdFinder
{
  public function findUserId($userEmail)
  {
    $id = User::where('email', $userEmail)
      ->first()
      ?->id;

    return $id;
  }

  public function findCategoryId($categoryName)
  {
    $id = Category::where('name', $categoryName)
      ->first()
      ?->id;

    return $id;
  }

  public function findStoryId($userEmail, $title)
  {
    $formattedTitle = str_replace('-', ' ', $title);
    $userId = findUserId($userEmail);
    $id = Story::where('author_id', $userId)
      ->where('title', 'ilike', "%$formattedTitle%")
      ->first()
      ?->id;

    return $id;
  }
}
