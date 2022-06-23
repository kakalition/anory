<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
  public function run()
  {
    Category::create([
      'name' => 'Accomplishment'
    ]);
    Category::create([
      'name' => 'Adventure'
    ]);
    Category::create([
      'name' => 'Education'
    ]);
    Category::create([
      'name' => 'Family'
    ]);
    Category::create([
      'name' => 'Friendship'
    ]);
    Category::create([
      'name' => 'Honor'
    ]);
    Category::create([
      'name' => 'Love'
    ]);
    Category::create([
      'name' => 'Productivity'
    ]);
  }
}
