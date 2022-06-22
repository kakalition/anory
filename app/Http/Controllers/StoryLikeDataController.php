<?php

namespace App\Http\Controllers;

use App\Exceptions\AlreadyDislikedException;
use App\Exceptions\AlreadyLikedException;
use App\Exceptions\InvalidLikeDataException;
use App\Exceptions\StoryLikeDataNotFoundException;
use App\Exceptions\StoryNotFoundException;
use App\Exceptions\UserNotFoundException;
use App\Service\StoryLikeDataService;
use Exception;
use Illuminate\Http\Request;

class StoryLikeDataController extends Controller
{
  private $service;

  public function __construct(StoryLikeDataService $service)
  {
    $this->service = $service;
  }

  public function show(Request $request)
  {
    $formattedTitle = str_replace('-', ' ', $request->route('title'));

    try {
      $like = $this->service->getLikeDislike(
        $request->route('authorEmail'),
        $formattedTitle,
        $request->query('email')
      );
    } catch (UserNotFoundException $exception) {
      return response('User not found.', 404);
    } catch (StoryNotFoundException $exception) {
      return response('Story not found.', 404);
    } catch (StoryLikeDataNotFoundException $exception) {
      return response('Story like data not found.', 404);
    } catch (Exception $exception) {
      return response("Internal server error.", 500);
    }

    return response($like, 200);
  }

  public function store(Request $request)
  {
    $formattedTitle = str_replace('-', ' ', $request->route('title'));

    try {
      $like = $this->service->createLikeDislike(
        $request->route('authorEmail'),
        $formattedTitle,
        $request->input('email'),
        $request->input('likeData'),
      );
    } catch (UserNotFoundException $exception) {
      return response('User not found.', 404);
    } catch (StoryNotFoundException $exception) {
      return response('Story not found.', 404);
    } catch (InvalidLikeDataException $exception) {
      return response('LikeData can only be 1 or -1.', 422);
    } catch (Exception $exception) {
      return response("Internal server error.", 500);
    }

    return response($like, 201);
  }

  public function destroy(Request $request)
  {
    $formattedTitle = str_replace('-', ' ', $request->route('title'));

    try {
      $this->service->removeLikeDislike(
        $request->route('authorEmail'),
        $formattedTitle,
        $request->query('email'),
      );
    } catch (StoryLikeDataNotFoundException $exception) {
      return response('Story like data not found.');
    } catch (UserNotFoundException $exception) {
      return response('User not found.', 404);
    } catch (StoryNotFoundException $exception) {
      return response('Story not found.', 404);
    } catch (Exception $exception) {
      return response("Internal server error.", 500);
    }

    return response('', 204);
  }
}
