<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

/**********
 * CREATE *
 **********/

/********
 * READ *
 ********/

test('when get all categories (unauthenticated), should returns error. (HTTP 401)', function() {
  $response = getCategories();
  $response->assertUnauthorized();
});

test('when get all categories, should returns correct data. (HTTP 200)', function() {
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