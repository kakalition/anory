<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Services\Category\GetAllCategories;
use Exception;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
  public function index(Request $request, GetAllCategories $getAllCategories)
  {
    try {
      $categories = $getAllCategories->handle();
    } catch (Exception $exception) {
      return response($exception->getMessage());
    }

    return response($categories, 200);
  }

  public function store(Request $request)
  {
    //
  }

  public function show(Category $category)
  {
    //
  }

  public function update(Request $request, Category $category)
  {
    //
  }

  public function destroy(Category $category)
  {
    //
  }
}
