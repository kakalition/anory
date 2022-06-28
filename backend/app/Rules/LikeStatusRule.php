<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class LikeStatusRule implements Rule
{
  /**
   * Create a new rule instance.
   *
   * @return void
   */
  public function __construct()
  {
    //
  }

  /**
   * Determine if the validation rule passes.
   *
   * @param  string  $attribute
   * @param  mixed  $value
   * @return bool
   */
  public function passes($attribute, $value)
  {
    return $value == -1 || $value == 1;
  }

  /**
   * Get the validation error message.
   *
   * @return string
   */
  public function message()
  {
    return 'Status must be either -1 (dislike) or 1 (like).';
  }
}
