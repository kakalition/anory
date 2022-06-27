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

  public function getStoriesByCategory(String $categoryName)
  {
    $data = ['source' => 'Cache'];

    $categoryId = Category::where('name', 'ilike', $categoryName)
      ->first()
      ->id;

    if (!$categoryId) {
      throw new CategoryNotFoundException();
    }

    $stories = Cache::remember(
      'stories_' . $categoryId,
      now()->addSeconds(2),
      function () use (&$data, $categoryId) {
        $data['source'] = 'DB';
        return Story::where('category_id', $categoryId)->get();
      }
    );

    $data['data'] = $stories;

    return $data;
  }

  public function getUserStory(String $authorEmail)
  {
    $author = User::where('email', $authorEmail)->first();
    if (!$author) {
      throw new UserNotFoundException();
    }

    $stories = Story::where('author_id', $author->id)
      ->get();

    return $stories;
  }

  public function createNewStory(String $authorEmail, String $categoryName, String $title, String $body)
  {
    $author = User::where('email', $authorEmail)->first();
    if (!$author) {
      throw new UserNotFoundException();
    }

    $category = Category::where('name', 'ilike', "%$categoryName%")->first();
    if (!$category) {
      throw new CategoryNotFoundException();
    }

    $story = Story::create([
      'author_id' => $author->id,
      'category_id' => $category->id,
      'views' => 0,
      'likes' => 0,
      'title' => $title,
      'body' => $body,
    ]);

    return $story;
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