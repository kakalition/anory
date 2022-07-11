<?php

namespace App\Services\Comment;

use App\Exceptions\CommentNotFoundException;
use App\Models\Comment;
use App\Services\BaseService;
use App\Services\BaseServiceValidation;

class UpdateComment extends BaseServiceValidation
{
  protected function validationRules(array $data): array
  {
    return [
      'comment_id' => 'required|integer',
      'comment' => 'required|string'
    ];
  }

  public function handle(array $data)
  {
    $validatedData = $this->getValidatedData($data);

    $comment = Comment::find($validatedData['comment_id']);

    if (!$comment) {
      throw new CommentNotFoundException();
    }

    $comment->comment = $validatedData['comment'];
    $comment->save();

    return $comment;
  }
}
