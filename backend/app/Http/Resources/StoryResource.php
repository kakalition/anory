<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StoryResource extends JsonResource
{
  public function toArray($request)
  {
    return [
      'id' => $this->id,
      'author_id' => $this->author_id,
      'category' => $this->category(),
      'views' => $this->views,
      'likes' => $this->likeData()->get(),
      'comments_count' => $this->totalComments(),
      'title' => $this->title,
      'body' => $this->body,
      'created_at' => $this->created_at
    ];
  }
}
