<?php

namespace App\Services\Comment;

use App\Models\Comment;
use App\Services\BaseService;

class CreateComment extends BaseService
{
  protected function rules($data): array
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
