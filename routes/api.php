<?php

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
  Route::get('/users/{author_email}/stories', 'userIndex');
  Route::post('/users/{author_email}/stories', 'store');
  Route::put('/users/{author_email}/stories/{story_title}', 'update');
  Route::patch('/users/{author_email}/stories/{story_title}', 'update');
  Route::delete('/users/{author_email}/stories/{story_title}', 'delete');
});
