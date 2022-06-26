<?php

namespace App\Services;

use Illuminate\Contracts\Validation\Factory;
use Illuminate\Support\Facades\Validator;

abstract class BaseService
{
  protected function rules()
  {
    return [];
  }

  protected function getValidatedData(array $data)
  {
    return Validator::make($data, $this->rules())
      ->validated();
  }
}
