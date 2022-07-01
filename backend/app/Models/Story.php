<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Story extends Model
{
  use HasFactory;

  protected $fillable = [
    'author_id',
    'category_id',
    'views',
    'likes',
    'title',
    'body'
  ];

  public function likeData() {
    return $this->morphMany(LikeData::class, 'likeable');
  }

  public function comments()
  {
    return $this->hasMany(Comment::class, 'story_id', 'id');
  }
}
