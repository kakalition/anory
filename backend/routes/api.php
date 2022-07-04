<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeDataController;
use App\Http\Controllers\StoryController;
use App\Http\Middleware\EnsureLoggedIn;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
// Route::get('/user', fn (Request $request) => response(Auth::user(), 200));

Route::controller(StoryController::class)
  ->group(function () {
    Route::get('/stories', 'index');
    Route::get('/users/{user}/stories', 'userIndex');
    Route::get('/stories/categories/{categoryName}', 'indexByCategory');
    Route::post('/stories', 'store');
    Route::get('/stories/{story}', 'show');
    Route::put('/stories/{story}', 'update');
    Route::patch('/stories/{story}', 'update');
    Route::delete('/stories/{story}', 'destroy');
  });

Route::controller(CommentController::class)
  ->middleware(EnsureLoggedIn::class)
  ->group(function () {
    Route::get('/stories/{story_id}/comments', 'indexByUser');
    Route::post('/stories/{story_id}/comments', 'store');
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

Route::apiResource('/categories', CategoryController::class)
  ->except('show')
  ->middleware(EnsureLoggedIn::class);
