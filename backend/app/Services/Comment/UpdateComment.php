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
      'story_id' => 'required|integer',
      'commentee_id' => 'required|integer',
      'comment' => 'required|string'
    ];
  }

  public function handle(array $data)
  {
    $validatedData = $this->getValidatedData($data);

    $comment = Comment::where('story_id', $data['story_id'])
      ->where('commentee_id', $data['commentee_id'])
      ->first();
    
    if (!$comment) {
      throw new CommentNotFoundException();
    }

    $comment->comment = $data['comment'];
    $comment->save();

    return $comment;
  }
}
