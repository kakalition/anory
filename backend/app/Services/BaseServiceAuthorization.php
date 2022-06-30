<?php

namespace App\Services;

use App\Exceptions\ForbiddenException;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

abstract class BaseServiceAuthorization
{
  abstract protected function authorizationRules(User $user, ?Model $model): bool;

  protected function authorize(User $user, ?Model $model)
  {
    if (!$this->authorizationRules($user, $model)) {
      throw new ForbiddenException();
    }
  }
}
