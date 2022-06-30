<?php

use Database\Seeders\AdminSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

use function Pest\Laravel\seed;

uses(RefreshDatabase::class);

/**********
 * CREATE *
 **********/

test('when create categories with invalid data, should returns error. (HTTP 422)', function () {
  seed(AdminSeeder::class);
  loginUser('admin@anory.com', '00000000');
  $response = createCategory(null);
  $response->assertUnprocessable();
});

test('when create categories with duplicated name, should returns error. (HTTP 422)', function () {
  seed(AdminSeeder::class);
  loginUser('admin@anory.com', '00000000');
  createCategory('Adventure');
  $response = createCategory('Adventure');
  $response->assertUnprocessable();
});

test('when create categories (not admin), should returns error. (HTTP 403)', function () {
  registerUser('Kaka', 'k@k', '00000000');
  $response = createCategory('Adventure');
  $response->assertForbidden();
});

test('when create categories (as admin), should returns created category data. (HTTP 201)', function () {
  seed(AdminSeeder::class);
  loginUser('admin@anory.com', '00000000');
  $response = createCategory('Adventure');
  $response->assertCreated();
  $response->assertJson(['name' => 'Adventure']);
});

/********
 * READ *
 ********/

test('when get all categories (unauthenticated), should returns error. (HTTP 401)', function () {
  $response = getCategories();
  $response->assertUnauthorized();
});

test('when get all categories, should returns correct data. (HTTP 200)', function () {
  registerUser('Kaka', 'k@k', '00000000');
  $response = getCategories();
  $response->assertOk();
  $response->assertJsonCount(0);
});

/**********
 * UPDATE *
 **********/

test('when update category with invalid data, should returns error. (HTTP 422)', function () {
  seed(AdminSeeder::class);
  loginUser('admin@anory.com', '00000000');
  $category = createCategory('Adventure');
  $category->assertCreated();

  $response = updateCategory($category['id'], 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
  $response->assertUnprocessable();
});

test('when update category with existing name, should returns error. (HTTP 422)', function () {
  seed(AdminSeeder::class);
  loginUser('admin@anory.com', '00000000');
  createCategory('Fun and Game');
  $category = createCategory('Adventure');
  $category->assertCreated();

  $response = updateCategory($category['id'], 'Fun and Game');
  $response->assertUnprocessable();
});

test('when update non-existing category, should returns error. (HTTP 404)', function() {
  seed(AdminSeeder::class);
  loginUser('admin@anory.com', '00000000');

  $response = updateCategory(0, 'Fun and Game');
  $response->assertNotFound();
});

test('when update category (not admin), should returns error. (HTTP 403)', function () {
  seed(AdminSeeder::class);
  loginUser('admin@anory.com', '00000000');
  $category = createCategory('Adventure');
  $category->assertCreated();
  logout();

  registerUser('Kaka', 'k@k', '00000000');
  $response = updateCategory($category['id'], ' Fun Adventure');
  $response->assertForbidden();
});

test('when successfully update category (as admin), should returns updated category data. (HTTP 201)', function () {
  seed(AdminSeeder::class);
  loginUser('admin@anory.com', '00000000');
  $category = createCategory('Adventure');

  $response = updateCategory($category['id'], 'Fun Adventure');
  $response->assertOk();
  $response->assertJson(['name' => 'Fun Adventure']);
});

/**********
 * DELETE *
 **********/

test('when delete non-existing category, should returns error. (HTTP 404)', function () {
  seed(AdminSeeder::class);
  loginUser('admin@anory.com', '00000000');

  $response = deleteCategory(0);
  $response->assertNotFound();
});

test('when delete category (not admin), should returns error. (HTTP 403)', function () {
  seed(AdminSeeder::class);
  loginUser('admin@anory.com', '00000000');
  $category = createCategory('Adventure');
  $category->assertCreated();
  logout();

  registerUser('Kaka', 'k@k', '00000000');
  $response = deleteCategory($category['id']);
  $response->assertForbidden();
});

test('when delete category (as admin), should returns no content. (HTTP 204)', function () {
  seed(AdminSeeder::class);
  loginUser('admin@anory.com', '00000000');
  $category = createCategory('Adventure');
  $category->assertCreated();

  $response = deleteCategory($category['id']);
  $response->assertNoContent();
});
