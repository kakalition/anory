<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class DestroyStoryRequest extends FormRequest
{
  public function authorize()
  {
    return $this->user()->email == $this->route('authorEmail');
  }

  public function rules()
  {
    return [];
  }
}
