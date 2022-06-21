<?php

namespace App\Service;

use App\Helpers\ResourceIdFinder;
use App\Models\StoryLikeDislike;
use App\Service\ServiceResult;
use Illuminate\Http\Request;

class StoryLikeDislikeService
{
  use ResourceIdFinder;

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
