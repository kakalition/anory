<?php

/*
|--------------------------------------------------------------------------
| Test Case
|--------------------------------------------------------------------------
|
| The closure you provide to your test functions is always bound to a specific PHPUnit test
| case class. By default, that class is "PHPUnit\Framework\TestCase". Of course, you may
| need to change it using the "uses()" function to bind a different classes or traits.
|
*/

use App\Models\Category;
use App\Models\User;

use function Pest\Laravel\postJson;

uses(Tests\TestCase::class)->in('Feature');

/*
|--------------------------------------------------------------------------
| Expectations
|--------------------------------------------------------------------------
|
| When you're writing tests, you often need to check that values meet certain conditions. The
| "expect()" function gives you access to a set of "expectations" methods that you can use
| to assert different things. Of course, you may extend the Expectation API at any time.
|
*/

expect()->extend('toBeOne', function () {
  return $this->toBe(1);
});

/*
|--------------------------------------------------------------------------
| Functions
|--------------------------------------------------------------------------
|
| While Pest is very powerful out-of-the-box, you may have some testing code specific to your
| project that you don't want to repeat in every file. Here you can also expose helpers as
| global functions to help you to reduce the number of lines of code in your test files.
|
*/

function registerUser($name, $email, $password)
{
  $user = postJson('register', [
    'name' => $name,
    'email' => $email,
    'password' => $password,
    'password_confirmation' => $password,
  ]);

  return $user;
}

function loginUser($email, $password)
{
  $user = postJson('login', [
    'email' => $email,
    'password' => $password,
  ]);

  return $user;
}

function createStory($email, $categoryName, $title, $body)
{
  $story = postJson('api/users/' . $email . '/stories', [
    'category_name' => $categoryName,
    'title' => $title,
    'body' => $body,
  ]);

  return $story;
}

function likeDislikeStory($emailSlug, $titleSlug, $likeeEmail, $status)
{
  return postJson('api/users/' . $emailSlug . '/stories/' . $titleSlug . '/like-dislikes', [
    'email' => $likeeEmail,
    'status' => $status
  ]);
}

function findUserId($userEmail)
{
  $id = User::where('email', $userEmail)
    ->first()
    ?->id;

  return $id;
}

function findCategoryId($categoryName)
{
  $id = Category::where('name', $categoryName)
    ->first()
    ?->id;

  return $id;
}
