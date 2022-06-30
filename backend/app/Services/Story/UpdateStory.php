<?php

namespace App\Services\Story;

use App\Exceptions\ForbiddenException;
use App\Models\Story;
use App\Models\User;
use App\Services\BaseService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\UnauthorizedException;

class UpdateStory extends BaseService
{

  protected function authorizationRules(User $user, Model $model): bool
  {
    return $user->id == $model->author_id;
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

  public function handle(User $user, Story $story, array $data)
  {
    $this->authorize($user, $story);

    $validatedData = $this->getValidatedData($data);

    $story->category_id = $validatedData['modified_category_id'] ?? $story->category_id;
    $story->title = $validatedData['modified_title'] ?? $story->title;
    $story->body = $validatedData['modified_body'] ?? $story->body;
    $story->save();

    return $story;
  }
}
