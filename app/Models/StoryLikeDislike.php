<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StoryLikeDislike extends Model
{
  use HasFactory;

  protected $fillable = [
    'story_id',
    'email',
    'status'
  ];
}
