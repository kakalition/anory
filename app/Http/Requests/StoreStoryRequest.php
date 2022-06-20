<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStoryRequest extends FormRequest
{
  public function authorize()
  {
    $user = $this->user();
    if ($user == null) {
      return false;
    }

    return $user->email == $this->route('author_email');
  }

  public function rules()
  {
    return [
      'category_name' => 'required|string',
      'title' => 'required|string|max:255',
      'body' => 'required|string',
    ];
  }
}
