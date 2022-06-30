<?php

namespace App\Services\Category;

use App\Models\Category;
use App\Models\User;
use App\Services\BaseService;
use Illuminate\Database\Eloquent\Model;

class CreateCategory extends BaseService
{
  protected function validationRules(array $data): array
  {
    return [
      'name' => 'required|string|max:18|unique:categories,name'
    ];
  }

  protected function authorizationRules(User $user, ?Model $model = null): bool
  {
    return $user->is_admin == true;
  }

  public function handle(User $user, array $data)
  {
    $this->authorize($user, null);

    $validatedData = $this->getValidatedData($data);
    $category = Category::create($validatedData);

    return $category;
  }
}
