<?php

namespace App\Http\Controllers;

use App\Exceptions\ForbiddenException;
use App\Models\Category;
use App\Services\Category\CreateCategory;
use App\Services\Category\GetAllCategories;
use App\Services\Category\UpdateCategory;
use App\Services\Comment\UpdateComment;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class CategoryController extends Controller
{
  public function index(Request $request, GetAllCategories $getAllCategories)
  {
    try {
      $categories = $getAllCategories->handle();
    } catch (Exception $exception) {
      return response($exception->getMessage(), 500);
    }

    return response($categories, 200);
  }

  public function store(Request $request, CreateCategory $createCategory)
  {
    try {
      $category = $createCategory->handle(auth()->user(), [
        'name' => $request->input('name')
      ]);
    } catch (UnprocessableEntityHttpException $exception) {
      return response($exception->getMessage(), 422);
    } catch (ForbiddenException $exception) {
      return response('You are forbidden to use this functionality!', 403);
    } catch (Exception $exception) {
      return response($exception->getMessage(), 500);
    }

    return response($category, 201);
  }

  public function update(Request $request, Category $category, UpdateCategory $updateCategory)
  {
    try {
      $category = $updateCategory->handle(auth()->user(), $category, [
        'name' => $request->input('name')
      ]);
    } catch (UnprocessableEntityHttpException $exception) {
      return response($exception->getMessage(), 422);
    } catch (ForbiddenException $exception) {
      return response('You are forbidden to use this functionality!', 403);
    } catch (Exception $exception) {
      return response($exception->getMessage(), 500);
    }

    return response($category, 200);
  }

  public function destroy(Category $category)
  {
    //
  }
}
