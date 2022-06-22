<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateStoryRequest extends FormRequest
{
  public function authorize()
  {
    return $this->user()->email == $this->route('authorEmail');
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
