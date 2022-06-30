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

/**********
 * DELETE *
 **********/
