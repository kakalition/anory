<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StoryLikeDislikeController extends Controller
{
  public function getLikeDislike(Request $request)
  {
    $result = $this->service->getLikeDislike($request);

    return response(
      $result->getContent(),
      $result->getHttpStatus()
    );
  }

  public function createLikeDislike(Request $request)
  {
    $result = $this->service->createLikeDislike($request);

    return response(
      $result->getContent(),
      $result->getHttpStatus()
    );
  }

  public function removeLikeDislike(Request $request)
  {
    $result = $this->service->removeLikeDislike($request);

    return response(
      $result->getContent(),
      $result->getHttpStatus()
    );
  }
}
