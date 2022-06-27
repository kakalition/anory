<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LikeData extends Model
{
  use HasFactory;

  public function likeable()
  {
    return $this->morphTo();
  }
}
