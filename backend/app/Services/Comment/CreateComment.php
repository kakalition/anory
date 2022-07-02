<?php

namespace App\Services\Comment;

use App\Models\Comment;
use App\Services\BaseService;
use App\Services\BaseServiceValidation;

class CreateComment extends BaseServiceValidation
{
  protected function validationRules($data): array
  {
    return [
      'story_id' => 'required|integer',
      'commentee_id' => 'required|integer',
      'comment' => 'required|string'
    ];
  }

  public function handle(array $data)
  {
    $validatedData = $this->getValidatedData($data);

    $comment = Comment::create($validatedData);
    return $comment;
  }
}
