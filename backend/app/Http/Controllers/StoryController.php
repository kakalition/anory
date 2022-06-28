<?php

namespace App\Http\Controllers;

use App\Exceptions\CategoryNotFoundException;
use App\Exceptions\StoryNotFoundException;
use App\Exceptions\UserNotFoundException;
use App\Http\Requests\DestroyStoryRequest;
use App\Http\Requests\StoreStoryRequest;
use App\Http\Requests\UpdateStoryRequest;
use App\Http\Resources\StoryResource;
use App\Services\Story\GetUserStories;
use App\Services\StoryService;
use Exception;
use Illuminate\Http\Request;

class StoryController extends Controller
{
  private $service;

  public function __construct(StoryService $service)
  {
    $this->service = $service;
  }

  public function index()
  {
    $stories = $this->service->getAllStories();
    return response(StoryResource::collection($stories), 200);
  }

  public function indexByCategory(Request $request)
  {
    try {
      $stories = $this->service
        ->getStoriesByCategory($request->route('categoryName'));
    } catch (CategoryNotFoundException $exception) {
      return response('Category not found.' . 404);
    } catch (Exception $exception) {
      return response('Internal server error.' . 404);
    }

    return response($stories, 200);
  }

  public function userIndex(Request $request, GetUserStories $getUserStories)
  {
    try {
      $stories = $getUserStories->handle($request->user()->id);
    } catch (Exception $exception) {
      return response($exception->getMessage(), 500);
    }

    return response(StoryResource::collection($stories), 200);
  }

  public function store(StoreStoryRequest $request)
  {
    $validated = $request->validated();

    try {
      $story = $this->service->createNewStory(
        $request->user()->id,
        $validated['categoryName'],
        $validated['title'],
        $validated['body']
      );
    } catch (UserNotFoundException $exception) {
      return response('User not found.', 404);
    } catch (CategoryNotFoundException $exception) {
      return response('Category not found.', 404);
    } catch (Exception $exception) {
      return response($exception->getMessage(), 500);
    }

    return response(new StoryResource($story), 201);
  }

  public function show(Request $request)
  {
    $formattedTitle = str_replace('-', ' ', $request->route('title'));

    try {
      $story = $this->service->getStory(
        $request->route('authorEmail'),
        $formattedTitle
      );
    } catch (UserNotFoundException $exception) {
      return response('User not found.', 404);
    } catch (StoryNotFoundException $exception) {
      return response('Story not found.', 404);
    } catch (Exception $exception) {
      return response($exception->getMessage(), 500);
    }

    return response(new StoryResource($story), 200);
  }

  public function update(UpdateStoryRequest $request)
  {
    $validated = $request->validated();
    $formattedTitle = str_replace('-', ' ', $request->route('title'));

    try {
      $story = $this->service->updateStory(
        $request->route('authorEmail'),
        $formattedTitle,
        $validated['categoryName'] ?? null,
        $validated['title'] ?? null,
        $validated['body'] ?? null,
      );
    } catch (UserNotFoundException $exception) {
      return response('User not found.', 404);
    } catch (StoryNotFoundException $exception) {
      return response('Story not found.', 404);
    } catch (CategoryNotFoundException $exception) {
      return response('Category not found.', 404);
    } catch (Exception $exception) {
      return response($exception->getMessage(), 500);
    }

    return response(new StoryResource($story), 200);
  }

  public function destroy(DestroyStoryRequest $request)
  {
    $formattedTitle = str_replace('-', ' ', $request->route('title'));

    try {
      $result = $this->service->deleteStory(
        $request->route('authorEmail'),
        $formattedTitle,
      );
    } catch (UserNotFoundException $exception) {
      return response('User not found.', 404);
    } catch (StoryNotFoundException $exception) {
      return response('Story not found.', 404);
    } catch (Exception $exception) {
      return response($exception->getMessage(), 500);
    }

    return response('', 204);
  }
}
