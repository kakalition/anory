<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateStoryRequest extends FormRequest
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
    return [
      'categoryName' => 'string|nullable',
      'title' => 'string|nullable|max:255',
      'body' => 'string|nullable',
    ];
  }
}
