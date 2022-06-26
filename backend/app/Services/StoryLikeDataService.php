<?php

namespace App\Services;

use App\Exceptions\InvalidLikeDataException;
use App\Exceptions\StoryLikeDataNotFoundException;
use App\Exceptions\StoryNotFoundException;
use App\Exceptions\UserNotFoundException;
use App\Models\Story;
use App\Models\StoryLikeData;
use App\Models\User;

class StoryLikeDataService
{
  public function getLikeDislike(String $authorEmail, String $title, String $likeeEmail)
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

    $like = StoryLikeData::where('story_id', $story->id)
      ->where('email', $likeeEmail)
      ->first();

    if (!$like) {
      throw new StoryLikeDataNotFoundException();
    }

    return $like;
  }

  public function createLikeDislike(String $authorEmail, String $title, String $likeeEmail, int $likeData)
  {
    $author = user::where('email', $authorEmail)
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

    if ($likeData != 1 && $likeData != -1) {
      throw new InvalidLikeDataException();
    }

    $like = StoryLikeData::where('story_id', $story->id)
      ->where('email', $likeeEmail)
      ->first();

    if ($like != null && $like->status == 1 && $likeData == 1) {
      return null;
    }

    if ($like != null && $like->status == -1 && $likeData == -1) {
      return null;
    }

    if ($like != null && $like->status != $likeData) {
      $like->delete();
    }

    $like = StoryLikeData::create([
      'story_id' => $story->id,
      'email' => $likeeEmail,
      'status' => $likeData
    ]);

    return $like;
  }

  public function removeLikeDislike(String $authorEmail, String $title, String $likeeEmail)
  {
    $author = user::where('email', $authorEmail)
      ->first();

    if (!$author) {
      throw new UserNotFoundException();
    }

    $story = Story::where('author_id', $author->id)
      ->where('title', 'ilike', $title)
      ->first();

    if (!$story) {
      throw new StoryNotFoundException();
    }

    $like = StoryLikeData::where('story_id', $story->id)
      ->where('email', $likeeEmail)
      ->first();

    if (!$like) {
      throw new StoryLikeDataNotFoundException();
    }

    $like->delete();
  }
}
