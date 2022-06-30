<?php

namespace App\Services;

use App\Exceptions\ForbiddenException;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

abstract class BaseService
{
  abstract protected function validationRules(array $data): array;
  abstract protected function authorizationRules(User $user, Model $model): bool;

  protected function authorize(User $user, ?Model $model = null)
  {
    if (!$this->authorizationRules($user, $model)) {
      throw new ForbiddenException();
    }
  }

  protected function getValidatedData(array $data)
  {
    $validator = Validator::make($data, $this->validationRules($data));

    if ($validator->fails()) {
      throw new UnprocessableEntityHttpException(
        json_encode($validator->getMessageBag()->getMessages())
      );
    }

    return $validator->validated();
  }
}
