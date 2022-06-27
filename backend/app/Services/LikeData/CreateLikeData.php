<?php

namespace App\Services\LikeData;

use App\Models\LikeData;
use App\Rules\LikeStatusRule;
use App\Services\BaseService;

class CreateLikeData extends BaseService
{
  protected function rules() {
    return [
      'likee_id' => 'required|integer',
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
