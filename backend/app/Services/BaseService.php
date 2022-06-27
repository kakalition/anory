<?php

namespace App\Services;

use Exception;
use Illuminate\Contracts\Validation\Factory;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

abstract class BaseService
{
  protected function rules()
  {
    return [];
  }

  protected function getValidatedData(array $data)
  {
    $validator = Validator::make($data, $this->rules());

    if ($validator->fails()) {
      throw new UnprocessableEntityHttpException(
        json_encode($validator->getMessageBag()->getMessages())
      );
    }

    return $validator->validated();
  }
}
