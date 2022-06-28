<?php

namespace App\Services\Story;

use App\Models\Story;
use App\Services\BaseService;

class UpdateStory extends BaseService
{

  protected function rules(array $data): array
  {
    return [
      'modified_category_id' => 'string|nullable',
      'modified_title' => 'string|nullable|max:255',
      'modified_body' => 'string|nullable',
    ];
  }

  public function handle(Story $story, array $data)
  {
    $validatedData = $this->getValidatedData($data);

    $story->category_id = $validatedData['modified_category_id'] ?? $story->category_id;
    $story->title = $validatedData['modified_title'] ?? $story->title;
    $story->body = $validatedData['modified_body'] ?? $story->body;
    $story->save();

    return $story;
  }
}
