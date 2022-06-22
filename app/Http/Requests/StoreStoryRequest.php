<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreStoryRequest extends FormRequest
{
  public function authorize()
  {
    return $this->user()->email == $this->route('authorEmail');
  }

  public function rules()
  {
    return [
      'categoryName' => 'required|string',
      'title' => 'required|string|max:255',
      'body' => 'required|string',
    ];
  }
}
