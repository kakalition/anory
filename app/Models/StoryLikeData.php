<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StoryLikeData extends Model
{
  use HasFactory;

  protected $fillable = [
    'story_id',
    'email',
    'status'
  ];
}
