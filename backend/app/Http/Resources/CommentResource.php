<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
  public function toArray($request)
  {
    return [
      'id' => $this->id,
      'comment' => $this->comment,
      'commentee_id' => $this->commentee_id,
      'created_at' => $this->created_at,
      'likeData' => $this->likeData()->get()
    ];
  }
}
