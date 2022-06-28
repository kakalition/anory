<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeDataController;
use App\Http\Controllers\StoryController;
use App\Http\Middleware\EnsureLoggedIn;
use App\Models\Story;
use GuzzleHttp\Middleware;
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

// For testing purpose
Route::get('/user', function (Request $request) {
  return response($request->user(), 200);
});

Route::get('/stories', function () {
  return Story::all();
});
Route::get('/stories/{categoryName}', [StoryController::class, 'indexByCategory']);

Route::controller(StoryController::class)
  ->middleware(EnsureLoggedIn::class)
  ->group(function () {
    Route::get('/stories/{title}', 'show');
    Route::get('/stories', 'userIndex');
    Route::post('/stories', 'store');
    Route::put('/stories/{title}', 'update');
    Route::patch('/stories/{title}', 'update');
    Route::delete('/stories/{title}', 'destroy');
  });

Route::controller(CommentController::class)
  ->middleware(EnsureLoggedIn::class)
  ->prefix('/stories/{story_id}')
  ->group(function () {
    Route::get('/comments', 'indexByUser');
    Route::post('/comments', 'store');
  });

Route::controller(CommentController::class)
  ->middleware(EnsureLoggedIn::class)
  ->group(function () {
    Route::put('/comments/{comment}', 'update');
    Route::patch('/comments/{comment}', 'update');
    Route::delete('/comments/{comment}', 'destroy');
  });

Route::controller(LikeDataController::class)
  ->middleware(EnsureLoggedIn::class)
  ->group(function () {
    Route::get('/stories/{story}/likedata', 'indexByStory');
    Route::get('/comments/{comment}/likedata', 'indexByComment');
    Route::post('/stories/{story}/likedata', 'store');
    Route::post('/comments/{comment}/likedata', 'store');
    Route::delete('/likedata/{likedata}', 'destroy');
  });
