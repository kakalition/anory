<?php

namespace App\Http\Controllers;

use App\Exceptions\CategoryNotFoundException;
use App\Exceptions\ForbiddenException;
use App\Http\Resources\StoryResource;
use App\Models\Story;
use App\Services\Story\CreateNewStory;
use App\Services\Story\DeleteStory;
use App\Services\Story\GetStoriesByCategory;
use App\Services\Story\GetUserStories;
use App\Services\Story\UpdateStory;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class StoryController extends Controller
{
  public function index()
  {
    return response(StoryResource::collection(Story::all()), 200);
  }

  public function indexByCategory(Request $request, GetStoriesByCategory $getStoriesByCategory)
  {
    try {
      $stories = $getStoriesByCategory->handle($request->route('categoryName'));
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
      $stories = $getUserStories->handle(
        $request->route('user')
      );
    } catch (Exception $exception) {
      return response($exception->getMessage(), 500);
    }

    return response($stories, 200);
  }

  public function store(Request $request, CreateNewStory $createNewStory)
  {
    try {
      $story = $createNewStory->handle([
        'author_id' => $request->user()->id,
        'category_id' => $request->input('categoryId'),
        'title' => $request->input('title'),
        'body' => $request->input('body'),
      ]);
    } catch (UnprocessableEntityHttpException $exception) {
      return response($exception->getMessage(), 422);
    } catch (Exception $exception) {
      return response($exception->getMessage(), 500);
    }

    return response(new StoryResource($story), 201);
  }

  public function show(Request $request, Story $story)
  {
    $story->increment('views');
    $story->save();

    return response(new StoryResource($story), 200);
  }

  public function update(Request $request, Story $story, UpdateStory $updateStory)
  {
    try {
      $story = $updateStory->handle(auth()->user(), $story, [
        'modified_category_id' => $request->input('modified_category_id') ?? null,
        'modified_title' => $request->input('modified_title') ?? null,
        'modified_body' => $request->input('modified_body') ?? null,
      ]);
    } catch (UnprocessableEntityHttpException $exception) {
      return response($exception->getMessage(), 422);
    } catch (ForbiddenException $exception) {
      return response('You are forbidden to access this functionality!', 403);
    } catch (Exception $exception) {
      return response($exception->getMessage(), 500);
    }

    return response(new StoryResource($story), 200);
  }

  public function destroy(Story $story, DeleteStory $deleteStory)
  {
    try {
      $deleteStory->handle(auth()->user(), $story);
    } catch (ForbiddenException $exception) {
      return response('You are forbidden to access this functionality!', 403);
    } catch (Exception $exception) {
      return response($exception->getMessage(), 500);
    }

    return response('', 204);
  }
}
