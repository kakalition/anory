<?php

namespace App\Services;

use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

abstract class BaseServiceValidation
{
  abstract protected function validationRules(array $data): array;

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
