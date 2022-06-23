<?php

namespace App\Service;

use App\Exceptions\CategoryNotFoundException;
use App\Exceptions\StoryNotFoundException;
use App\Exceptions\UserNotFoundException;
use App\Models\Category;
use App\Models\Story;
use App\Models\User;

class StoryService
{
  public function getAllStories()
  {
    $stories = Story::all();

    return $stories;
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
