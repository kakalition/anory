<?php

namespace App\Services\Story;

use App\Exceptions\ForbiddenException;
use App\Models\Story;
use App\Services\BaseService;
use Illuminate\Validation\UnauthorizedException;

class UpdateStory extends BaseService
{

  protected function authorizationRules($userId, $model): bool
  {
    return $userId == $model->author_id;
  }

  protected function validationRules(array $data): array
  {
    return [
      'requester_id' => 'integer',
      'modified_category_id' => 'integer|nullable',
      'modified_title' => 'string|nullable|max:255',
      'modified_body' => 'string|nullable',
    ];
  }

  public function handle(Story $story, int $requesterId, array $data)
  {
    $this->authorize($requesterId, $story);

    $validatedData = $this->getValidatedData($data);

    $story->category_id = $validatedData['modified_category_id'] ?? $story->category_id;
    $story->title = $validatedData['modified_title'] ?? $story->title;
    $story->body = $validatedData['modified_body'] ?? $story->body;
    $story->save();

    return $story;
  }
}
