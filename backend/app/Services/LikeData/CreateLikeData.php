<?php

namespace App\Services\LikeData;

use App\Models\LikeData;
use App\Rules\LikeStatusRule;
use App\Services\BaseServiceValidation;
use Illuminate\Validation\Rule;

class CreateLikeData extends BaseServiceValidation
{
  protected function validationRules(array $data): array
  {
    return [
      'likee_id' => ['required', 'integer', Rule::unique('like_data')->where(function ($query) use ($data) {
        return $query->where('likee_id', $data['likee_id'])
          ->where('likeable_id', $data['likeable_id']);
      })],
      'status' => ['required', 'integer', new LikeStatusRule()],
      'likeable_id' => 'required|integer',
      'likeable_type' => 'required|string',
    ];
  }

  public function handle(array $data)
  {
    $validatedData = $this->getValidatedData($data);

    $likedata = LikeData::create($validatedData);
    return $likedata;
  }
}
