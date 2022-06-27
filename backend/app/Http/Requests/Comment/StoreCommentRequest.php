<?php

namespace App\Http\Requests\Comment;

use Illuminate\Foundation\Http\FormRequest;

class StoreCommentRequest extends FormRequest
{
  public function authorize()
  {
    return false;
  }

  public function rules()
  {
    return [
      //
    ];
  }
}
