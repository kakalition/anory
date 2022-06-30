<?php

namespace App\Services\Category;

use App\Models\Category;
use App\Models\User;
use App\Services\BaseService;
use Illuminate\Database\Eloquent\Model;

class UpdateCategory extends BaseService
{
  protected function authorizationRules(User $user, Model $model): bool
  {
    return $user->is_admin == true;
  }

  protected function validationRules(array $data): array
  {
    return [
      'name' => 'string|max:18|unique:categories,name'
    ];
  }

  public function handle(User $user, Category $category, array $data)
  {
    $this->authorize($user, $category);

    $validatedData = $this->getValidatedData($data);
    $category->name = $validatedData['name'];
    $category->save();

    return $category;
  }
}
