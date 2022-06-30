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

use function Pest\Laravel\deleteJson;
use function Pest\Laravel\getJson;
use function Pest\Laravel\patchJson;
use function Pest\Laravel\postJson;
use function Pest\Laravel\putJson;

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

function getUser()
{
  return getJson('api/user');
}

function getCategories()
{
  return getJson('api/categories');
}

function loginUser($email, $password)
{
  $user = postJson('login', [
    'email' => $email,
    'password' => $password,
  ]);

  return $user;
}

function logout()
{
  postJson('logout');
}

function createStory(?int $categoryId = null, ?String $title = null, ?String $body = null)
{
  $story = postJson('api/stories', [
    'categoryId' => $categoryId,
    'title' => $title,
    'body' => $body,
  ]);

  return $story;
}

function updateStory(int $storyId, ?int $modifiedCategoryId = null, ?String $modifiedTitle = null, ?String $modifiedBody = null)
{
  $story = patchJson("api/stories/$storyId", [
    'modified_category_id' => $modifiedCategoryId,
    'modified_title' => $modifiedTitle,
    'modified_body' => $modifiedBody,
  ]);

  return $story;
}

function deleteStory(int $storyId)
{
  $response = deleteJson("api/stories/$storyId");
  return $response;
}

function commentStory($storyId, $comment)
{
  return postJson("api/stories/$storyId/comments", ['comment' => $comment]);
}

function likeDislikeStory($storyId, $status)
{
  return postJson("api/stories/$storyId/likedata", ['status' => $status]);
}

function likeDislikeComment($commentId, $status)
{
  return postJson("api/comments/$commentId/likedata", ['status' => $status]);
}

function createCategory(?String $categoryName)
{
  return postJson('api/categories', ['name' => $categoryName]);
}

function updateCategory(int $categoryId, ?String $categoryName = null)
{
  return putJson("api/categories/$categoryId", ['name' => $categoryName]);
}

function deleteCategory(int $categoryId)
{
  return deleteJson("api/categories/$categoryId");
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
