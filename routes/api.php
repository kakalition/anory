<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\StoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});

Route::controller(StoryController::class)->group(function () {
  Route::get('/stories', 'index');
  Route::get('/stories/{category_name}', 'indexByCategory');
  Route::get('/users/{author_email}/stories', 'userIndex');
  Route::post('/users/{author_email}/stories', 'store');
  Route::get('/users/{author_email}/stories{story_title}', 'show');
  Route::post('/users/{author_email}/stories{story_title}', 'like');
  Route::post('/users/{author_email}/stories{story_title}', 'unlike');
  Route::post('/users/{author_email}/stories{story_title}', 'dislike');
  Route::post('/users/{author_email}/stories{story_title}', 'undislike');
  Route::put('/users/{author_email}/stories/{story_title}', 'update');
  Route::patch('/users/{author_email}/stories/{story_title}', 'update');
  Route::delete('/users/{author_email}/stories/{story_title}', 'delete');
});

Route::controller(CommentController::class)->group(function () {
  Route::get('/users/{author_email}/stories/{story_title}/comments', 'index');
  Route::post('/users/{author_email}/stories/{story_title}/comments', 'store');
  Route::get('/users/{author_email}/stories/{story_title}/comments/{comment_id}', 'show');
  Route::post('/users/{author_email}/stories/{story_title}/comments/{comment_id}', 'like');
  Route::post('/users/{author_email}/stories/{story_title}/comments/{comment_id}', 'unlike');
  Route::post('/users/{author_email}/stories/{story_title}/comments/{comment_id}', 'dislike');
  Route::post('/users/{author_email}/stories/{story_title}/comments/{comment_id}', 'undislike');
  Route::put('/users/{author_email}/stories/{story_title}/comments/{comment_id}', 'update');
  Route::patch('/users/{author_email}/stories/{story_title}/comments/{comment_id}', 'update');
  Route::delete('/users/{author_email}/stories/{story_title}/comments/{comment_id}', 'delete');
});
