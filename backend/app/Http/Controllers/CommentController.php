<?php

namespace App\Http\Controllers;

use App\Exceptions\StoryNotFoundException;
use App\Exceptions\UserNotFoundException;
use App\Helpers\RouteHelper;
use App\Http\Requests\UpdateCommentRequest;
use App\Models\Comment;
use App\Services\Comment\CreateComment;
use App\Services\Comment\ReadComments;
use App\Services\Comment\UpdateComment;
use App\Services\Story\FindStory;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class CommentController extends Controller
{
  public function index(Request $request, ReadComments $readComments)
  {
    try {
      $comments = $readComments->handle([
        'author_email' => $request->route('author_email'),
        'title' => RouteHelper::formatSlug($request->route('title')),
      ]);
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
      $story = $findStory->handle([
        'author_email' => $request->route('author_email'),
        'title' => RouteHelper::formatSlug($request->route('title')),
      ]);

      $comment = $createComment->handle([
        'story_id' => $story->id,
        'commentee_id' => $request->user()->id,
        'comment' => $request->input('comment')
      ]);

    } catch (UnprocessableEntityHttpException $exception) {
      return response($exception->getMessage(), 422);
    } catch (UserNotFoundException $exception) {
      return response('User not found.', 404);
    } catch (StoryNotFoundException $exception) {
      return response('Story not found.', 404);
    } catch (Exception $exception) {
      return response($exception->getMessage(), 500);
    }

    return response($comment, 201);
  }

  public function show(Comment $comment)
  {
  }

  public function update(Request $request, FindStory $findStory, UpdateComment $updateComment)
  {
    try {
      $story = $findStory->handle([
        'author_email' => $request->route('author_email'),
        'title' => RouteHelper::formatSlug($request->route('title')),
      ]);

      $comment = $updateComment->handle([
        'story_id' => $story->id,
        'commentee_id' => $request->user()->id,
        'comment' => $request->input('comment')
      ]);

    } catch (UnprocessableEntityHttpException $exception) {
      return response($exception->getMessage(), 422);
    } catch (UserNotFoundException $exception) {
      return response('User not found.', 404);
    } catch (StoryNotFoundException $exception) {
      return response('Story not found.', 404);
    } catch (Exception $exception) {
      return response($exception->getMessage(), 500);
    }

    return response($comment, 200);
  }

  public function destroy(Comment $comment)
  {
  }
}
