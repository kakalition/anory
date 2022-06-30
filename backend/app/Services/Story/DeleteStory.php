<?php

namespace App\Services\Story;

use App\Models\Story;
use App\Models\User;
use App\Services\BaseServiceAuthorization;
use Illuminate\Database\Eloquent\Model;

class DeleteStory extends BaseServiceAuthorization
{
  protected function authorizationRules(User $user, ?Model $model): bool
  {
    return $user->id == $model->author_id;
  }

  public function handle(User $user, Story $story)
  {
    $this->authorize($user, $story);
    $story->delete();
  }
}
