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

  function category()
  {
    return $this->hasOne(Category::class, 'story_id', 'id');;
  }

  function categoryName()
  {
    return Category::where('id', $this->category_id)
      ->first()
      ->name;
  }

  public function comments()
  {
    return $this->hasMany(Comment::class, 'story_id', 'id');
  }

  function likes()
  {
    return $this
      ->hasMany(StoryLikeData::class, 'story_id')
      ->where('status', 1)
      ->count();
  }

  function dislikes()
  {
    return $this
      ->hasMany(StoryLikeData::class, 'story_id')
      ->where('status', -1)
      ->count();
  }
}
