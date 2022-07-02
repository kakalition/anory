<?php

namespace App\Services\Story;

use App\Models\Story;
use App\Services\BaseService;
use App\Services\BaseServiceValidation;

class CreateNewStory extends BaseServiceValidation
{
  protected function validationRules(array $data): array
  {
    return [
      'author_id' => 'required|integer',
      'category_id' => 'required|integer',
      'title' => 'required|string|max:255',
      'body' => 'required|string',
    ];
  }

  public function handle(array $data)
  {
    $validatedData = $this->getValidatedData($data);
    $validatedData['views'] = 0;

    $story = Story::create($validatedData);
    return $story;
  }
}
