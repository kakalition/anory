<?php

namespace App\Services;

use App\Exceptions\ForbiddenException;
use Illuminate\Database\Eloquent\Model;

abstract class BaseServiceAuthorization
{
  abstract protected function authorizationRules(int $userId, ?Model $model): bool;

  protected function authorize(int $userId, ?Model $model)
  {
    if (!$this->authorizationRules($userId, $model)) {
      throw new ForbiddenException();
    }
  }
}
