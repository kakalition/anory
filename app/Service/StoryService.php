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

  public function getLikeDislike(Request $request)
  {
    $like = StoryLikeDislike::find(
      $request->route('id')
    );

    if ($like) {
      return new ServiceResult($like, 200);
    }

    return new ServiceResult('Like data not found.', 404);
  }

  public function createLikeDislike(Request $request)
  {
    $likeeEmail = $request->input('email');
    $storyAuthorEmail = $request->route('author_email');
    $likeDislike = $request->input('status');

    $storyId = $this->findStoryId(
      $storyAuthorEmail,
      $request->route('title')
    );

    $like = StoryLikeDislike::where('story_id', $storyId)
      ->where('email', $likeeEmail)
      ->first();

    if ($like != null && $like->status != $likeDislike) {
      $like->status = $likeDislike;
      $like->save();

      return new ServiceResult($like, 200);
    }

    if ($like != null && $like->status == 1) {
      return new ServiceResult('You already liked this story.', 422);
    }

    if ($like != null && $like->status == -1) {
      return new ServiceResult('You already disliked this story.', 422);
    }

    $like = StoryLikeDislike::create([
      'story_id' => $storyId,
      'email' => $likeeEmail,
      'status' => $likeDislike
    ]);

    return new ServiceResult($like, 201);
  }

  public function removeLikeDislike(Request $request)
  {
    $like = StoryLikeDislike::find(
      $request->route('id')
    );

    if ($like) {
      $like->delete();
      return new ServiceResult('Like dislike removed.', 204);
    }

    return new ServiceResult('Like dislike data not found.', 404);
  }
}
