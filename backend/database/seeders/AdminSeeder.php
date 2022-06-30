<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AdminSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    User::create([
      'name' => 'Admin',
      'email' => 'admin@anory.com',
      'email_verified_at' => now(),
      'password' => Hash::make('00000000'), // password
      'is_admin' => true,
      'remember_token' => Str::random(10),
    ]);
  }
}
