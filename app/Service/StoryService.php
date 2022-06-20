<?php

namespace App\Service;

use App\Helpers\FindCategoryId;
use App\Helpers\FindUserId;
use App\Models\Category;
use App\Models\Story;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class StoryService
{
  use FindUserId;
  use FindCategoryId;

  public function getAllStories()
  {
    $stories = Story::all();

    return new ServiceResult($stories, 200);
  }

  public function getUserStory(Request $request)
  {
    $user_id = $this->findUserId($request->route('author_email'));
    if ($user_id == null) {
      return new ServiceResult('User not found', 404);
    }

    $stories = Story::where('author_id', $user_id)
      ->get();

    return new ServiceResult($stories, 200);
  }

  public function createNewStory(FormRequest $request)
  {
    $validated = $request->validated();
    $userId = $this->findUserId($request->route('author_email'));
    $categoryId = $this->findCategoryId($validated['category_name']);

    if ($userId == null) {
      return new ServiceResult('User not found.', 404);
    }

    if ($categoryId == null) {
      return new ServiceResult('Category not found.', 404);
    }

    $story = Story::create([
      'author_id' => $userId,
      'category_id' => $categoryId,
      'title' => $validated['title'],
      'body' => $validated['body'],
    ]);

    return new ServiceResult($story, 201);
  }
}
