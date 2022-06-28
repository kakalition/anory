<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\LikeData;
use App\Services\LikeData\CreateLikeData;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class LikeDataController extends Controller
{
  public function indexByComment(Request $request, Comment $comment)
  {
    return response($comment->likeData()->get(), 200);
  }

  public function store(Request $request, CreateLikeData $createLikeData)
  {
    $likeable_id = $request->route('comment') ?? $request->route('story');
    $likeable_type = $request->route('comment') != null ? 'App\Models\Comment' : 'App\Models\Story';

    try {
      $likedata = $createLikeData->handle([
        'likee_id' => $request->user()->id,
        'status' => $request->input('status'),
        'likeable_id' => $likeable_id,
        'likeable_type' => $likeable_type
      ]);
    } catch (UnprocessableEntityHttpException $exception) {
      return response($exception->getMessage(), 422);
    } catch (Exception $exception) {
      return response($exception->getMessage(), 500);
    }

    return response($likedata, 201);
  }

  public function destroy(LikeData $likedata)
  {
    $likedata->delete();

    return response($likedata, 204);
  }
}
