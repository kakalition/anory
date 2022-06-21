<?php

namespace App\Service;

use App\Helpers\ResourceIdFinder;
use App\Models\Story;
use App\Models\StoryLikeDislike;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class StoryService
{
  use ResourceIdFinder;

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

  public function getStory(Request $request)
  {
    $storyId = $this->findStoryId(
      $request->route('author_email'),
      $request->route('title'),
    );

    $story = Story::find($storyId);
    $story->increment('views');

    if ($story == null) {
      return new ServiceResult('Story not found.', 404);
    }

    return new ServiceResult($story, 200);
  }

  public function updateStory(FormRequest $request)
  {
    $validated = $request->validated();
    $categoryId = $this->findCategoryId($validated['category_name'] ?? '');
    $storyId = $this->findStoryId(
      $request->route('author_email'),
      $request->route('title'),
    );

    if ($storyId == null) {
      return new ServiceResult('Story not found.', 404);
    }

    $story = Story::find($storyId);

    $story->category_id = $categoryId ?? $story->category_id;
    $story->title = $validated['title'] ?? $story->title;
    $story->body = $validated['body'] ?? $story->body;
    $story->save();

    return new ServiceResult($story, 200);
  }

  public function deleteStory(Request $request)
  {
    $storyId = $this->findStoryId(
      $request->route('author_email'),
      $request->route('title'),
    );

    $story = Story::find($storyId);

    if ($story) {
      $story->delete();
      return new ServiceResult('', 204);
    }

    return new ServiceResult('Story not found.', 404);
  }
}
