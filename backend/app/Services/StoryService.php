<?php

namespace App\Services;

use App\Exceptions\CategoryNotFoundException;
use App\Exceptions\StoryNotFoundException;
use App\Exceptions\UserNotFoundException;
use App\Models\Category;
use App\Models\Story;
use App\Models\User;
use Illuminate\Support\Facades\Cache;

class StoryService
{
  public function __construct()
  {
  }

  public function getAllStories()
  {
    $stories = Story::all();

    return $stories;
  }

  public function getStory($authorEmail, $title)
  {
    $author = User::where('email', $authorEmail)
      ->first();

    if (!$author) {
      throw new UserNotFoundException();
    }

    $story = Story::where('author_id', $author->id)
      ->where('title', 'ilike', "%$title%")
      ->first();

    if (!$story) {
      throw new StoryNotFoundException();
    }

    $story->increment('views');

    return $story;
  }

  public function updateStory(String $authorEmail, String $title, ?String $modifiedCategoryName, ?String $modifiedTitle, ?String $modifiedBody)
  {
    $author = User::where('email', $authorEmail)
      ->first();

    if (!$author) {
      throw new UserNotFoundException();
    }

    $story = Story::where('author_id', $author->id)
      ->where('title', 'ilike', "%$title%")
      ->first();

    if (!$story) {
      throw new StoryNotFoundException();
    }

    $modifiedCategory = Category::where('name', $modifiedCategoryName)
      ->first();

    if (!$modifiedCategory) {
      throw new CategoryNotFoundException();
    }

    $story->category_id = $modifiedCategory->id;
    $story->title = $modifiedTitle ?? $story->title;
    $story->body = $modifiedBody ?? $story->body;
    $story->save();

    return $story;
  }

  public function deleteStory(String $authorEmail, String $title)
  {
    $author = User::where('email', $authorEmail)
      ->first();

    if (!$author) {
      throw new UserNotFoundException();
    }

    $story = Story::where('author_id', $author->id)
      ->where('title', 'ilike', "%$title%")
      ->first();

    if (!$story) {
      throw new StoryNotFoundException();
    }

    $story->delete();
  }
}
