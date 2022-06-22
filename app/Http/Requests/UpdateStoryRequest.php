<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStoryRequest extends FormRequest
{
  public function authorize()
  {
    $user = $this->user();
    if ($user == null) {
      return false;
    }

    return $user->email == $this->route('authorEmail');
  }

  public function rules()
  {
    return [
      'categoryName' => 'string',
      'title' => 'string|max:255',
      'body' => 'string',
    ];
  }
}
