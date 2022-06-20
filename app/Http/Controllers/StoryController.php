<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStoryRequest;
use App\Http\Requests\UpdateStoryRequest;
use App\Models\Story;
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
      $result->getContent(),
      $result->getHttpStatus()
    );
  }

  public function userIndex(Request $request)
  {
    $result = $this->service->getUserStory($request);
    return response(
      $result->getContent(),
      $result->getHttpStatus()
    );
  }

  public function store(StoreStoryRequest $request)
  {
    $result = $this->service->createNewStory($request);

    return response(
      $result->getContent(),
      $result->getHttpStatus()
    );
  }

  public function show(Story $story)
  {
    //
  }

  public function update(UpdateStoryRequest $request, Story $story)
  {
    //
  }

  public function destroy(Story $story)
  {
    //
  }
}
