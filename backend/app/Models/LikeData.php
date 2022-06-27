<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use function PHPSTORM_META\map;

class LikeData extends Model
{
  use HasFactory;

  protected $fillable = [
    'likee_id',
    'status',
    'likeable_id',
    'likeable_type'
  ];

  public function likeable()
  {
    return $this->morphTo();
  }
}
