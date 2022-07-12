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

  public function likeData()
  {
    return $this->morphMany(LikeData::class, 'likeable');
  }

  function category()
  {
    return Category::where('id', $this->category_id)
      ->first(['id', 'name']);
  }

  function categoryName()
  {
    return Category::where('id', $this->category_id)
      ->first()
      ->name;
  }

  function totalComments()
  {
    return $this
      ->hasMany(Comment::class, 'story_id', 'id')
      ->count();
  }

  public function comments()
  {
    return $this->hasMany(Comment::class, 'story_id', 'id');
  }
}
