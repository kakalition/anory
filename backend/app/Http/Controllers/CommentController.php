<?php

namespace App\Http\Controllers;

use App\Exceptions\CommentNotFoundException;
use App\Exceptions\StoryNotFoundException;
use App\Exceptions\UserNotFoundException;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Services\Comment\CreateComment;
use App\Services\Comment\ReadComments;
use App\Services\Comment\UpdateComment;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class CommentController extends Controller
{
  public function indexByUser(Request $request, ReadComments $readComments)
  {
    try {
      $comments = $readComments->handle([
        'story_id' => $request->route('story_id'),
      ]);
    } catch (Exception $exception) {
      return response($exception->getMessage(), 500);
    }

    return response(CommentResource::collection($comments));
  }

  public function store(Request $request, CreateComment $createComment)
  {
    try {
      $comment = $createComment->handle([
        'story_id' => $request->route('story_id'),
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

    return response(new CommentResource($comment), 201);
  }

  public function show(Comment $comment)
  {
  }

  public function update(Request $request, UpdateComment $updateComment)
  {
    try {
      $comment = $updateComment->handle([
        'comment_id' => $request->route('comment'),
        'comment' => $request->input('comment')
      ]);
    } catch (CommentNotFoundException $exception) {
      return response('Comment not found', 404);
    } catch (UnprocessableEntityHttpException $exception) {
      return response($exception->getMessage(), 422);
    } catch (Exception $exception) {
      return response($exception->getMessage(), 500);
    }


    return response($comment, 200);
  }

  public function destroy(Comment $comment)
  {
    $comment->delete();

    return response('', 204);
  }
}
