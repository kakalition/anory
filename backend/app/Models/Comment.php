<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
  use HasFactory;

  protected $fillable = [
    'story_id',
    'commentee_id',
    'comment'
  ];

  public function likeData()
  {
    return $this->morphMany(LikeData::class, 'likeable');
  }
}
