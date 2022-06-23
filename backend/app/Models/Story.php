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
    'title',
    'body'
  ];

  function categoryName()
  {
    return Category::where('id', $this->category_id)
      ->first()
      ->name;
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
