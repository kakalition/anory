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

Route::get('/stories', [StoryController::class, 'index']);
Route::get('/stories/{category_name}', [StoryController::class, 'indexByCategory']);

Route::controller(StoryController::class)->prefix('users/{author_email}')->group(function () {
  Route::get('/stories', 'userIndex');
  Route::post('/stories', 'store');
  Route::get('/stories/{title}', 'show');
  Route::put('/stories/{title}', 'update');
  Route::patch('/stories/{title}', 'update');
  Route::delete('/stories/{title}', 'destroy');

  Route::get('/stories/{title}/like-dislikes/{id}', 'getLikeDislike');
  Route::post('/stories/{title}/like-dislikes', 'createlikeDislike');
  Route::delete('/stories/{title}/like-dislikes/{id}', 'removeLikeDislike');
});

Route::controller(CommentController::class)->prefix('/users/{author_email}/stories/{story_title}')->group(function () {
  Route::get('/comments', 'index');
  Route::post('/comments', 'store');
  Route::get('/comments/{comment_id}', 'show');
  Route::put('/comments/{comment_id}', 'update');
  Route::patch('/comments/{comment_id}', 'update');
  Route::delete('/comments/{comment_id}', 'delete');

  Route::get('/comments/{comment_id}', 'getLikeDislike');
  Route::post('/comments/{comment_id}', 'createLikeDislike');
  Route::delete('/comments/{comment_id}', 'removeLikeDislike');
});
