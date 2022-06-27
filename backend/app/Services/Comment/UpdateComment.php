<?php

namespace App\Services\Comment;

use App\Exceptions\CommentNotFoundException;
use App\Models\Comment;
use App\Services\BaseService;

class UpdateComment extends BaseService
{
  protected function rules()
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
