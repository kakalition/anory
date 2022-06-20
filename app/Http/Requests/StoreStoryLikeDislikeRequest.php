<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStoryLikeDislikeRequest extends FormRequest
{
  public function authorize()
  {
    $user = $this->user();
    if ($user == null) {
      return false;
    }

    return $user->email == $this->input('email');
  }

  public function rules()
  {
    return [
      'email' => 'required|email'
    ];
  }
}
