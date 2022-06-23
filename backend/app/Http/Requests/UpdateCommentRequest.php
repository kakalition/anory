<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCommentRequest extends FormRequest
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
      //
    ];
  }
}
