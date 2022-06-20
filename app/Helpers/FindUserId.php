<?php

namespace App\Helpers;

use App\Models\User;

trait FindUserId {
  public function findUserId($userEmail) {
    $id = User::where('email', $userEmail)
      ->first()
      ?->id;

    return $id;
  }
}