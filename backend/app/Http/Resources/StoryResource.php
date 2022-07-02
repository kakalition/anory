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
      'category' => $this->categoryName(),
      'views' => $this->views,
      'likes' => $this->likeData()->where('status', 1)->get(),
      'dislikes' => $this->likeData()->where('status', -1)->count(),
      'comments_count' => $this->totalComments(),
      'title' => $this->title,
      'body' => $this->body,
      'created_at' => $this->created_at
    ];
  }
}
