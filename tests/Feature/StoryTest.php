<?php

use function Pest\Laravel\getJson;
use function Pest\Laravel\postJson;

test('when get all stories, return all stories', function () {
  $response = getJson('api/stories');
  $response->assertOk();
  $response->assertJsonCount(0);
});
