<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class DestroyStoryRequest extends FormRequest
{
  public function authorize()
  {
    $user = $this->user();
    if ($user == null) {
      throw new HttpResponseException(
        response('Unauthenticated.', 401)
      );
    }

    return $user->email == $this->route('authorEmail');
  }

  public function rules()
  {
    return [];
  }
}
