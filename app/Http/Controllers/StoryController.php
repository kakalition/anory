<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStoryRequest;
use App\Http\Requests\UpdateStoryRequest;
use App\Http\Resources\StoryResource;
use App\Service\StoryService;
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
    $result = $this->service->getAllStories();
    return response(
      StoryResource::collection($result->getContent()),
      $result->getHttpStatus()
    );
  }

  public function userIndex(Request $request)
  {
    $result = $this->service->getUserStory($request);
    return response(
      StoryResource::collection($result->getContent()),
      $result->getHttpStatus()
    );
  }

  public function store(StoreStoryRequest $request)
  {
    $result = $this->service->createNewStory($request);

    return response(
      new StoryResource($result->getContent()),
      $result->getHttpStatus()
    );
  }

  public function show(Request $request)
  {
    $result = $this->service->getStory($request);

    return response(
      new StoryResource($result->getContent()),
      $result->getHttpStatus()
    );
  }

  public function update(UpdateStoryRequest $request)
  {
    $result = $this->service->updateStory($request);

    return response(
      is_object($result->getContent())
        ? new StoryResource($result->getContent())
        : $result->getContent(),
      $result->getHttpStatus()
    );
  }

  public function destroy(Request $request)
  {
    $result = $this->service->deleteStory($request);

    return response(
      $result->getContent(),
      $result->getHttpStatus()
    );
  }
}
