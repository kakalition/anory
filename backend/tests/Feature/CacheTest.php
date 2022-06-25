<?php

use function Pest\Laravel\getJson;
use function Pest\Laravel\postJson;

test('test', function() {
  postJson('/api/te');
  $response = getJson('/api/te');
  $response->dump();
  $response->assertOk();
});