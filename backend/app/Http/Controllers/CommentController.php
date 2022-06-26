<?php

namespace App\Http\Controllers;

use App\Exceptions\StoryNotFoundException;
use App\Exceptions\UserNotFoundException;
use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Models\Comment;
use App\Services\Comment\CreateComment;
use App\Services\Comment\ReadComments;
use App\Services\Story\FindStory;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class CommentController extends Controller
{
  public function index(Request $request, ReadComments $service)
  {
    try {
      $comments = $service->handle(
        $request->route('authorEmail'),
        $request->route('title'),
      );
    } catch (UserNotFoundException $exception) {
      return response('User not found.', 404);
    } catch (StoryNotFoundException $exception) {
      return response('Story not found.', 404);
    } catch (Exception $exception) {
      return response('General error found in CommentController.', 500);
    }

    return response($comments);
  }

  public function store(Request $request, FindStory $findStory, CreateComment $createComment)
  {
    try {
      $story = $findStory->handle(
        $request->route('authorEmail'),
        $request->route('title'),
      );
    } catch (UserNotFoundException $exception) {
      return response('User not found.', 404);
    } catch (StoryNotFoundException $exception) {
      return response('Story not found.', 404);
    }

    try {
      $comment = $createComment->handle([
        'story_id' => $story->id,
        'commentee_id' => $this->user()->id,
        'comment' => $request->input('comment')
      ]);
    } catch (UnprocessableEntityHttpException $exception) {
      return response($exception->getMessage(), 422);
    } catch (Exception $exception) {
      return response('General error in CommentController', 500);
    }

    return response($comment, 201);
  }

  public function show(Comment $comment)
  {
  }

  public function like(Request $request)
  {
  }

  public function unlike(Request $request)
  {
  }

  public function dislike(Request $request)
  {
  }

  public function undislike(Request $request)
  {
  }

  public function update(UpdateCommentRequest $request, Comment $comment)
  {
  }

  public function destroy(Comment $comment)
  {
  }
}
