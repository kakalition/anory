<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
  use HasFactory;

  protected $fillable = ['name'];

  public function getCategoryId(String $name)
  {
    $id = $this
      ->where('name', $name)
      ->first();
    return $id;
  }
}
