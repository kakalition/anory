<?php

use function Pest\Laravel\getJson;
use function Pest\Laravel\postJson;

use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Story;
use App\Models\User;

uses(RefreshDatabase::class);

test('when test, should test. (HTTP 204)', function() {
  registerUser('k@k', 'k@k', '00000000');
  logout();

  $response = loginUser('k@k', '00000000');
  $response->assertOk();
  $response->dump();
});
