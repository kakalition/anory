<?php

namespace App\Services;

use Exception;
use Illuminate\Contracts\Validation\Factory;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

abstract class BaseService
{
  abstract protected function rules(array $data): array;

  protected function getValidatedData(array $data)
  {
    $validator = Validator::make($data, $this->rules($data));

    if ($validator->fails()) {
      throw new UnprocessableEntityHttpException(
        json_encode($validator->getMessageBag()->getMessages())
      );
    }

    return $validator->validated();
  }
}
