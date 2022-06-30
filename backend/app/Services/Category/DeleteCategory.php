<?php

namespace App\Services\Category;

use App\Models\Category;
use App\Models\User;
use App\Services\BaseServiceAuthorization;
use Illuminate\Database\Eloquent\Model;

class DeleteCategory extends BaseServiceAuthorization
{
  protected function authorizationRules(User $user, ?Model $model): bool
  {
    return $user->is_admin == true;
  }

  public function handle(User $user, Category $category)
  {
    $this->authorize($user, $category);

    $category->delete();
  }
}
